import { Component } from '@angular/core';
import { AuthModel } from '@mean/models';
import { ApiService, AuthService, ChatService, Message } from '@mean/services';
import { BaseComponent } from '@mean/shared';
import { UriConstants, sessionStorageConstants } from '@mean/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent<Message> {
  messageFiletemp: File | null = null;
  fileName = '';
  showTyping = false;
  messages: Message[] = []
  userData: AuthModel.User
  inputValue = '';
  conter = 0;
  constructor(
    protected readonly api: ApiService<Message>,
    private readonly chatServices: ChatService,
    private readonly auth: AuthService


  ) {
    super(api);
    this.userData = this.auth.readFromSession(sessionStorageConstants.USER_TOKEN).user;

    this.getMessages();
    this.chatServices.getmessage().subscribe(val => {
      this.messages = val
    })
    this.chatServices.userListening().subscribe(val => {
      if (typeof val === 'boolean') {
        this.showTyping = false
      } else {
        this.showTyping = this.userData.id !== val.id

      }

    })
  }
  private async getMessages() {

    this.messages = (await this.searchArrAsync({ url: UriConstants.MESSAGES })).response;


  }
  saveMessage() {

    if (this.inputValue) {
      const payload = { userid: this.userData.id, content: this.inputValue, messageType: 'text' }
      this.create({ url: `${UriConstants.MESSAGES}/create`, data: payload })
      this.inputValue = ""
    }
  }
  
  handleMessage(id: number) {

    this.delete({ url: `${UriConstants.MESSAGES}/${id}` })


  }
  startTyping() {
    this.conter++;
    if (this.conter === 1) this.chatServices.sendTyping(this.userData)

  }
  stopTyping() {
    this.conter = 0;
    this.chatServices.sendTyping(false)
  }
  adjuntarDocumento(fileInput: any) {


    this.fileName = fileInput.target.files[0].name;
    console.log(fileInput.target.files[0])
    this.messageFiletemp = fileInput.target.files[0]
  }
 
}
