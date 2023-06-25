import { Component, Input, OnInit } from '@angular/core';
import { PrivateMessageDto } from 'src/app/models/messages/private-message-dto';
import { UserDto } from 'src/app/models/users/user-dto.model';


@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.css']
})
export class MessageBubbleComponent implements OnInit {
  @Input() message!: PrivateMessageDto;
  @Input() isSent!: boolean;
  @Input() user!: UserDto | null;

  constructor() { }

  ngOnInit(): void {
  }
}