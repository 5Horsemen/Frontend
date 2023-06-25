import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { PrivateMessageDto } from 'src/app/models/messages/private-message-dto';
import { AuthService } from '../auth/auth.service';

import { CreatePrivateMessageDto } from 'src/app/models/messages/create-private-message-dto';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrivateMessageService {
  private client!: Client;
  private connected: boolean;
  public messages: Subject<PrivateMessageDto>;
  public baseURL = environment.chatURL;
  private subscription: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.connected = false;
    this.messages = new Subject<PrivateMessageDto>();

    this.authService.isAuthenticated.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.initializeWebSocketConnection();
      }
    });
  }

  initializeWebSocketConnection(): void {
    const token = localStorage.getItem('access_token');
    const socket = new SockJS(this.baseURL + `/ws?token=${token}`);
    this.client = new Client({
      webSocketFactory: () => socket,
      onConnect: (frame) => {
        this.connected = true;
        console.log('onConnect triggered:', frame);
        this.subscription?.unsubscribe();
        this.client?.subscribe(`/topic/chats/*/messages`, (message: IMessage) => {
          console.log('Received:', message);
          this.messages.next(JSON.parse(message.body));
          console.log('Subscription done.');
        });
      },
      onDisconnect: (frame) => {
        this.connected = false;
        console.log('onDisconnect triggered:', frame);
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
      },
      onWebSocketClose: (event) => {
        console.log('WebSocket closed:', event);
      },
      onWebSocketError: (event) => {
        console.error('WebSocket error:', event);
      }
    });
    this.client.activate();
  }

  getMessagesByChatId(chatId: number): Observable<PrivateMessageDto[]> {
    const headers = new HttpHeaders().set('withCredentials', 'true');
    return this.http.get<PrivateMessageDto[]>(`${this.baseURL}/${chatId}`, { headers });
  }

  getIncomingMessages(): Observable<PrivateMessageDto> {
    return this.messages.asObservable();
  }

  deleteMessage(messageId: number): Observable<any> {
    const headers = new HttpHeaders().set('withCredentials', 'true');
    return this.http.delete(`${this.baseURL}/${messageId}`, { headers });
  }

  sendMessage(chatId: number, message: CreatePrivateMessageDto): void {
    this.client.publish({
      destination: `/app/chats/${chatId}/messages`,
      body: JSON.stringify(message)

    });
  }
}
