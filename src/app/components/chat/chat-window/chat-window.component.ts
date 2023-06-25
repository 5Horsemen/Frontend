import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { PrivateChatDto } from 'src/app/models/chat/private-chat-dto.model';
import { GroupedMessages } from 'src/app/models/messages/grouped-messages.model';
import { PrivateMessageDto } from 'src/app/models/messages/private-message-dto';
import { User } from 'src/app/models/user.model';
import { PrivateMessageService } from 'src/app/service/private-message/private-message.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit, OnChanges {

  @Input() selectedChat: PrivateChatDto | null = null;
  @Input() currentUserId!: number;
  chatMessages: PrivateMessageDto[] = [];
  @Input() displayedUser!: User | null;
  @ViewChild('scrollMe', { static: false }) public myScrollContainer!: ElementRef;
  scrollToBottomEnabled: boolean = false;
  groupedChatMessages: GroupedMessages[] = [];

  constructor(
    private privateMessageService: PrivateMessageService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.selectedChat) {
      this.loadChatMessages(this.selectedChat.id);
      this.privateMessageService.getIncomingMessages().subscribe((message: PrivateMessageDto) => {
        if (this.selectedChat && this.selectedChat.id === message.chatId) {
          this.chatMessages.push(message);
          const messageDate = new Date(message.sentDateTime);
          const dateKey = messageDate.toISOString().split('T')[0];
          let groupedMessage = this.groupedChatMessages.find(group => group.date.toISOString().split('T')[0] === dateKey);
          if (!groupedMessage) {
            groupedMessage = { date: messageDate, messages: [] };
            this.groupedChatMessages.push(groupedMessage);
          }
          groupedMessage.messages.push(message);

          this.scrollToBottom();
        }
      });
      this.scrollToBottomEnabled = true;
    }
  }

  ngOnChanges(): void {
    if (this.selectedChat) {
      this.loadChatMessages(this.selectedChat.id);
    }
  }


  loadChatMessages(chatId: number): void {
    this.scrollToBottomEnabled = false;
    this.privateMessageService.getMessagesByChatId(chatId).subscribe((messages: PrivateMessageDto[]) => {
      this.chatMessages = messages;

      // Agrupar mensajes por fecha
      const tempGroupedMessages: { [key: string]: PrivateMessageDto[] } = {};
      for (const message of this.chatMessages) {
        const messageDate = new Date(message.sentDateTime);
        const dateKey = messageDate.toISOString().split('T')[0]; // puedes usar tu pipe DisplayDatePipe aquí
        if (!tempGroupedMessages[dateKey]) {
          tempGroupedMessages[dateKey] = [message];
        } else {
          tempGroupedMessages[dateKey].push(message);
        }
      }

      this.groupedChatMessages = Object.entries(tempGroupedMessages).map(([date, messages]) => ({
        date: new Date(date),
        messages
      }));

      this.changeDetector.detectChanges();
      this.scrollToBottomEnabled = true;
      this.scrollToBottom();
    });
  }


  getUserFromMessage(message: PrivateMessageDto): User {
    return message.sender.id === this.currentUserId ? message.recipient : message.sender;
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.scrollToBottomEnabled) {
        const chatContainer = this.myScrollContainer.nativeElement;
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);

  }

  showScrollbar(): void {
    const chatContainer = this.myScrollContainer.nativeElement;
    chatContainer.classList.add('show-scrollbar');
  }

  hideScrollbar(): void {
    const chatContainer = this.myScrollContainer.nativeElement;
    chatContainer.classList.remove('show-scrollbar');
  }
}
