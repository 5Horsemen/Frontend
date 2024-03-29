import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InboxComponent } from './views/inbox/inbox.component';
import { PublicationsComponent } from './components/post/publications/publications.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterEmployerComponent } from './views/registers/register-employer/register-employer.component';
import { SelectRoleComponent } from "./views/select-role/select-role.component";
import { RegisterStudentComponent } from "./views/registers/register-student/register-student.component";
import { SettingsComponent } from "./views/settings/settings.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'accounts/login',
  },
  {
    path: 'accounts/login',
    component: LoginComponent,
  },
  {
    path: 'accounts/register/student',
    component: RegisterStudentComponent,
  },
  {
    path: 'accounts/selectRole',
    component: SelectRoleComponent,
  },
  {
    path: 'accounts/register/employee',
    component: RegisterEmployerComponent,
  },
  {
    path: 'home',
    component: LayoutComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'publications',
    component: PublicationsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'messages',
    component: InboxComponent,
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
