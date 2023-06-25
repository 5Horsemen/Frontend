import { Component, Input, ElementRef, ViewChild, HostListener } from '@angular/core';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { PrivateChatDto } from 'src/app/models/chat/private-chat-dto.model';
import { CreatePrivateMessageDto } from 'src/app/models/messages/create-private-message-dto';
import { PrivateMessageService } from 'src/app/service/private-message/private-message.service';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent {
  @Input() selectedChat: PrivateChatDto | null = null;
  @Input() currentUserId!: number;
  newMessage: string = '';
  showEmojiPicker = false;
  showSendButton = false;

  @ViewChild('inputContainer') inputContainer!: ElementRef;

  constructor(private privateMessageService: PrivateMessageService) { }

  sendMessage(): void {
    if (this.selectedChat && this.newMessage.trim() !== '') {
      const createMessageDto: CreatePrivateMessageDto = {
        content: this.newMessage,
        senderId: this.currentUserId,
        recipientId: this.selectedChat.user1.id === this.currentUserId ? this.selectedChat.user2.id : this.selectedChat.user1.id
      };

      this.privateMessageService.sendMessage(this.selectedChat.id, createMessageDto);
      this.newMessage = '';
      this.showSendButton = false;
    } else {
      this.sendLike();
    }
  }

  addEmoji(event: EmojiEvent): void {
    this.newMessage += event.emoji.native;
    this.showSendButton = true;
  }

  toggleEmojiPicker(): void {
    this.showEmojiPicker = !this.showEmojiPicker;

    if (this.showEmojiPicker) {
      setTimeout(() => {
        this.registerOutsideClickHandler();
      }, 0);
    } else {
      this.unregisterOutsideClickHandler();
    }
  }

  toggleSendButton(): void {
    this.showSendButton = this.newMessage.trim() !== '';
  }

  sendLike(): void {
    if (this.selectedChat) {
      const createMessageDto: CreatePrivateMessageDto = {
        content: '👍',
        senderId: this.currentUserId,
        recipientId: this.selectedChat.user1.id === this.currentUserId ? this.selectedChat.user2.id : this.selectedChat.user1.id
      };

      this.privateMessageService.sendMessage(this.selectedChat.id, createMessageDto);
    }
  }

  private registerOutsideClickHandler(): void {
    document.addEventListener('click', this.handleOutsideClick);
  }

  private unregisterOutsideClickHandler(): void {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  private handleOutsideClick = (event: MouseEvent) => {
    const emojiPicker = document.querySelector('.emoji-picker');
    if (emojiPicker && !emojiPicker.contains(event.target as Node)) {
      this.showEmojiPicker = false;
      this.unregisterOutsideClickHandler();
    }
  }
}
