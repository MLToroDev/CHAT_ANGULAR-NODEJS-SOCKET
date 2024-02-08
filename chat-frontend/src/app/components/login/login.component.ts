import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService, AuthService } from '@mean/services';
import { BaseComponent } from '@mean/shared';
import { Router } from '@angular/router';
import { UriConstants,sessionStorageConstants } from '@mean/utils';



type Get = {}
type Post = {
  token: string,
  refresh: string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends BaseComponent<Get, Post>{
  constructor(
    protected readonly api: ApiService<Get, Post>,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly auth: AuthService
  ) {
    super(api)

    this.formGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    })
  }


  handleLogin() {
    if (this.isFormValid()) {
      const { email, password } = this.formGroup.value;
      this.createService({ url: `${UriConstants.USER}/login`, data: { email, password } }).subscribe({
        next: data => {
          const { token, refresh } = data.response
          this.auth.saveToSession(sessionStorageConstants.USER_TOKEN, token);
          this.auth.saveToSession(sessionStorageConstants.USER_REFRESH_TOKEN, refresh);
            this.router.navigate(['']) 
        },
        error: error => {
          this.alertConfiguration('ERROR', error);
          this.openAlert();
          this.loading = false;
        }
      });


    }

  }
}
