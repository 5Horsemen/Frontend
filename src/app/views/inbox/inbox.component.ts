import { Component, OnInit } from '@angular/core';
import { CreatePrivateChatDto } from 'src/app/models/chat/create-private-chat-dto';
import { PrivateChatDto } from 'src/app/models/chat/private-chat-dto.model';
import { CreatePrivateMessageDto } from 'src/app/models/messages/create-private-message-dto';
import { PrivateMessageDto } from 'src/app/models/messages/private-message-dto';
import { UserDto } from 'src/app/models/users/user-dto.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PrivateChatService } from 'src/app/services/private-chat/private-chat.service';
import { PrivateMessageService } from 'src/app/services/private-message/private-message.service';
import { UserService } from 'src/app/services/users/user.service';



@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  searchEmail: string = '';
  chats: PrivateChatDto[] = [];
  selectedChat: PrivateChatDto | null = null;
  chatMessages: PrivateMessageDto[] = [];
  newMessage: string = '';
  displayedUser: UserDto | null = null;
  allChats: PrivateChatDto[] = [];

  currentUserId!: number;

  constructor(
    private privateChatService: PrivateChatService,
    private privateMessageService: PrivateMessageService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //  this.authService.isAuthenticated.subscribe((isAuthenticated) => {
    // if (isAuthenticated) {
    this.currentUserId = this.authService.getUserIdFromToken() || 0;
    this.initializeWebSocketConnection();
    this.loadChats();
    this.privateMessageService.getIncomingMessages().subscribe((message: PrivateMessageDto) => {
      if (this.selectedChat && this.selectedChat.id === message.chatId) {
        this.chatMessages.push(message);
      }
    });
    //  }
    // });
  }

  initializeWebSocketConnection(): void {
    this.privateMessageService.initializeWebSocketConnection();
  }

  loadChats(): void {
    this.privateChatService.getChatsByUserId(this.currentUserId).subscribe((chats: PrivateChatDto[]) => {
      const uniqueChats: PrivateChatDto[] = [];

      chats.forEach((chat: PrivateChatDto) => {
        const duplicateChatIndex = uniqueChats.findIndex((uniqueChat: PrivateChatDto) =>
          (uniqueChat.user1.id === chat.user1.id && uniqueChat.user2.id === chat.user2.id) ||
          (uniqueChat.user1.id === chat.user2.id && uniqueChat.user2.id === chat.user1.id)
        );

        if (duplicateChatIndex === -1) {
          uniqueChats.push(chat);
        }
      });

      const sortedChats = uniqueChats.filter(chat => chat.messages.length > 0); // Filtrar los chats sin mensajes

      sortedChats.sort((a, b) => {
        const lastMessageTimeA = new Date(a.messages[a.messages.length - 1].sentDateTime);
        const lastMessageTimeB = new Date(b.messages[b.messages.length - 1].sentDateTime);
        return lastMessageTimeB.getTime() - lastMessageTimeA.getTime();
      });

      this.chats = sortedChats;
    });
  }


  selectChat(chat: PrivateChatDto): void {
    this.selectedChat = chat;
    this.displayedUser = chat.user1.id === this.currentUserId ? chat.user2 : chat.user1;
    this.loadChatMessages(chat.id);
  }

  loadChatMessages(chatId: number): void {
    this.privateMessageService.getMessagesByChatId(chatId).subscribe((messages: PrivateMessageDto[]) => {
      this.chatMessages = messages;
    });
  }

  getUserFromMessage(message: PrivateMessageDto): UserDto {
    return message.sender.id === this.currentUserId ? message.recipient : message.sender;
  }

  sendMessage(): void {
    if (this.selectedChat && this.newMessage.trim() !== '') {
      const createMessageDto: CreatePrivateMessageDto = {
        content: this.newMessage,
        senderId: this.currentUserId,
        recipientId: this.selectedChat.user1.id === this.currentUserId ? this.selectedChat.user2.id : this.selectedChat.user1.id
      };

      this.privateMessageService.sendMessage(this.selectedChat.id, createMessageDto);
      this.newMessage = '';
    }
  }

  searchUser(): void {
    if (this.searchEmail.trim() !== '') {
      this.userService.getUserByEmail(this.searchEmail).subscribe((user: UserDto) => {
        const chat = this.chats.find(
          (c) => c.user1.id === user.id || c.user2.id === user.id
        );

        if (chat) {
          this.selectChat(chat);
        } else {
          this.createPrivateChat(user);
        }
      });
    }
  }

  createPrivateChat(user: UserDto): void {
    const createChatRequest: CreatePrivateChatDto = {
      user1Id: this.currentUserId,
      user2Id: user.id
    };

    this.privateChatService.createPrivateChat(createChatRequest).subscribe((chat: PrivateChatDto) => {
      this.selectChat(chat); // Seleccionar el chat recién creado
      this.loadChats(); // Actualizar la lista de chats después de crear uno nuevo
    });
  }

  handleChatCreated(newChat: PrivateChatDto): void {
    this.selectChat(newChat); // Seleccionar el chat recién creado
  }
}
