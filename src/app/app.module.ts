import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './views/login/login.component';
import {RegisterStudentComponent} from "./views/registers/register-student/register-student.component";
import {RegisterEmployerComponent} from "./views/registers/register-employer/register-employer.component";
import { LayoutComponent } from './layout/layout/layout.component';
import { DialogChangeEmailComponent } from './components/dialog-change-email/dialog-change-email.component';
import { DialogChangePasswordComponent } from './components/dialog-change-password/dialog-change-password.component';
import { DialogSignOffComponent } from './components/dialog-sign-off/dialog-sign-off.component';
import {MaterialModule} from "./shared/material.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterStudentComponent,
    RegisterEmployerComponent
    ProfileComponent,
    LoginComponent,
    LayoutComponent,
    DialogChangeEmailComponent,
    DialogChangePasswordComponent,
    DialogSignOffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
