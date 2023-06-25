import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePrivateChatDto } from 'src/app/models/chat/create-private-chat-dto';
import { PrivateChatDto } from 'src/app/models/chat/private-chat-dto.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PrivateChatService {
  private readonly baseUrl = environment.baseURL + '/chats';

  constructor(private http: HttpClient) { }

  createPrivateChat(createChatRequest: CreatePrivateChatDto): Observable<PrivateChatDto> {
    return this.http.post<PrivateChatDto>(
      `${this.baseUrl}`, createChatRequest);
  }
  getPrivateChatByUsersId(user1Id: number, user2Id: number): Observable<PrivateChatDto> {
    return this.http.get<PrivateChatDto>(`${this.baseUrl}/${user1Id}/${user2Id}`);
  }

  getPrivateChatByUser1orUser2(user1Id: number, user2Id: number): Observable<PrivateChatDto[]> {
    return this.http.get<PrivateChatDto[]>(`${this.baseUrl}/${user1Id}/or/${user2Id}`);
  }

  getChatsByUserId(userId: number): Observable<PrivateChatDto[]> {
    return this.http.get<PrivateChatDto[]>(`${this.baseUrl}/user/${userId}`);
  }

}