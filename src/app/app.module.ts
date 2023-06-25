import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterStudentComponent } from "./views/registers/register-student/register-student.component";
import { DialogChangeEmailComponent } from './components/dialog-change-email/dialog-change-email.component';
import { DialogChangePasswordComponent } from './components/dialog-change-password/dialog-change-password.component';
import { DialogSignOffComponent } from './components/dialog-sign-off/dialog-sign-off.component';
import { ChatHeaderComponent } from './components/chat/chat-header/chat-header.component';
import { ChatListComponent } from './components/chat/chat-list/chat-list.component';
import { ChatListHeaderComponent } from './components/chat/chat-list-header/chat-list-header.component';
import { ChatWindowComponent } from './components/chat/chat-window/chat-window.component';
import { EmojiPickerComponent } from './components/chat/emoji-picker/emoji-picker.component';
import { MessageBubbleComponent } from './components/chat/message-bubble/message-bubble.component';
import { MessageInputComponent } from './components/chat/message-input/message-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { JwtModule } from '@auth0/angular-jwt';
import { UserSearchDialogComponent } from './components/chat/user-search-dialog/user-search-dialog.component';
import { CreatePublicationComponent } from './components/post/create-publication/create-publication.component'
import { DisplayDatePipe } from './pipes/display-date.pipe';
import { LayoutComponent } from './layout/layout.component';
import { PublicationsComponent } from './components/post/publications/publications.component';
import { InboxComponent } from './views/inbox/inbox.component';
import { RegisterEmployerComponent } from './views/registers/register-employer/register-employer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterStudentComponent,
    ProfileComponent,
    LoginComponent,
    LayoutComponent,
    DialogChangeEmailComponent,
    DialogChangePasswordComponent,
    DialogSignOffComponent,
    ChatHeaderComponent,
    ChatListComponent,
    ChatListHeaderComponent,
    ChatWindowComponent,
    EmojiPickerComponent,
    MessageBubbleComponent,
    MessageInputComponent,
    UserSearchDialogComponent,
    PublicationsComponent,
    CreatePublicationComponent,
    DisplayDatePipe,
    InboxComponent,
    RegisterEmployerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    MatMenuModule,
    HttpClientModule,
    PickerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['localhost:8080'], // Reemplaza con tu dominio
        disallowedRoutes: ['http://localhost:8080/api/v1/account/login',
          'http://localhost:8080/api/v1/account/register/student'] // Reemplaza con tus rutas
      }
    }),
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
