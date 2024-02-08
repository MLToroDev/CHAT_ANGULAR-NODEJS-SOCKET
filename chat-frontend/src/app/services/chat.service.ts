import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { AuthModel } from '../models/core/auth.model';

export type Message = {
  id: number,
  userid: number,
  content: string,
  date: string,
  firstName: string,
  lastName: string
}
@Injectable({
  providedIn: 'root'
})

export class ChatService {

  constructor(


    private readonly socket: Socket

  ) { }

  sendTyping(msg: AuthModel.User | false) {

    this.socket.emit('typing', msg)
  }

  getmessage() {
    return this.socket.fromEvent<Message[]>('message').pipe(map((data) => data));
  }

  userListening() {
    return this.socket.fromEvent<AuthModel.User | false>('listening').pipe(map((data) => data));
  }



}
