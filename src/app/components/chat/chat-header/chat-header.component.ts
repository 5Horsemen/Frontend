import { Component, Input } from '@angular/core';
import { PrivateChatDto } from 'src/app/models/chat/private-chat-dto.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.css']
})
export class ChatHeaderComponent {
  @Input() displayedUser!: User | null;

  getProfilePicture(): string {
    return this.displayedUser ? this.displayedUser.profileImage : '';
  }

  getChatUsername(): string {
    return this.displayedUser ? this.displayedUser.name + ' ' + this.displayedUser.lastName : '';
  }
}
