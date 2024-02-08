import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sessionStorageConstants } from '@mean/utils';
@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem(sessionStorageConstants.USER_TOKEN);
    if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token
          },
        });
    }

    return next.handle(req);
  }
}
