import { Component, Output, EventEmitter } from '@angular/core';
import { UserSearchDialogComponent } from '../user-search-dialog/user-search-dialog.component';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { CreatePrivateChatDto } from 'src/app/models/chat/create-private-chat-dto';
import { PrivateChatDto } from 'src/app/models/chat/private-chat-dto.model';
import { PrivateChatService } from 'src/app/service/private-chat/private-chat.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-chat-list-header',
  templateUrl: './chat-list-header.component.html',
  styleUrls: ['./chat-list-header.component.css']
})
export class ChatListHeaderComponent {
  @Output() chatCreated = new EventEmitter<PrivateChatDto>(); // Renombrado a chatCreated

  constructor(private privateChatService: PrivateChatService, private dialog: MatDialog, private authService: AuthService) { }

  openSettings() {
    // Lógica para abrir la configuración
  }

  createNewMessage(): void {
    const dialogRef = this.dialog.open(UserSearchDialogComponent);

    dialogRef.afterClosed().subscribe((selectedUser: User) => {
      const userId = this.authService.getUserIdFromToken();

      if (selectedUser && userId) {
        const createChatRequest: CreatePrivateChatDto = {
          user1Id: userId,
          user2Id: selectedUser.id
        };

        this.privateChatService.createPrivateChat(createChatRequest).subscribe(
          (newChat: PrivateChatDto) => {
            this.chatCreated.emit(newChat); // Emitir el evento chatCreated con el nuevo chat
          },
          (error) => {
            console.error('Error al crear el chat: ', error);
          }
        );
      } else if (userId === null) {
        console.error('Usuario no autenticado');
      }
    });
  }
}
