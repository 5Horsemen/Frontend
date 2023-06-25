import { Component, Input } from '@angular/core';
import { UserDto } from 'src/app/models/users/user-dto.model';


@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.css']
})
export class ChatHeaderComponent {
  @Input() displayedUser!: UserDto | null;

  getProfilePicture(): string {
    return this.displayedUser ? this.displayedUser.profileImage : '';
  }

  getChatUsername(): string {
    return this.displayedUser ? this.displayedUser.name + ' ' + this.displayedUser.lastName : '';
  }
}
