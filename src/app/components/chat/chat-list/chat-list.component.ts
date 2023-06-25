import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PrivateChatDto } from 'src/app/models/chat/private-chat-dto.model';
import { UserDto } from 'src/app/models/users/user-dto.model';
import { formatDistanceToNow, isYesterday, isToday } from 'date-fns';
import { PrivateMessageService } from 'src/app/services/private-message/private-message.service';
import { PrivateMessageDto } from 'src/app/models/messages/private-message-dto';



@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  @Input() chats!: PrivateChatDto[];
  @Input() currentUserId!: number;
  @Output() chatSelected = new EventEmitter<PrivateChatDto>();

  constructor(private privateMessageService: PrivateMessageService) { }

  ngOnInit(): void {
    console.log(this.chats);
    this.privateMessageService.getIncomingMessages().subscribe((newMessage: PrivateMessageDto) => {
      const chatIndex = this.chats.findIndex(chat => chat.id === newMessage.chatId);
      if (chatIndex !== -1) {
        const chat = this.chats[chatIndex];
        chat.messages.push(newMessage); // Agregar el nuevo mensaje al chat correspondiente
        this.chats.splice(chatIndex, 1); // Eliminar el chat de su posición actual
        this.chats.unshift(chat); // Agregar el chat al principio de la lista para que aparezca arriba
      }
    });
  }

  selectChat(chat: PrivateChatDto): void {
    this.chatSelected.emit(chat);
  }

  getUserDisplayName(chat: PrivateChatDto): string {
    if (chat.user1.id !== this.currentUserId) {
      return chat.user1.name + ' ' + chat.user1.lastName;
    } else {
      return chat.user2.name + ' ' + chat.user2.lastName;
    }
  }

  getOtherUserProfileImage(chat: PrivateChatDto): string {
    let otherUser: UserDto;
    if (chat.user1.id !== this.currentUserId) {
      otherUser = chat.user1;
    } else {
      otherUser = chat.user2;
    }
    return otherUser.profileImage;
  }

  getLastMessageContent(chat: PrivateChatDto): string {
    if (chat.messages.length > 0) {
      return chat.messages[chat.messages.length - 1].content;
    }
    return '';
  }

  getLastMessageTime(chat: PrivateChatDto): string {
    if (chat.messages.length > 0) {
      const lastMessageTime = new Date(chat.messages[chat.messages.length - 1].sentDateTime);

      if (isToday(lastMessageTime)) {
        return formatDistanceToNow(lastMessageTime, { addSuffix: true });
      } else if (isYesterday(lastMessageTime)) {
        return 'Yesterday';
      } else {
        return lastMessageTime.toLocaleDateString();
      }
    }
    return '';
  }


}
