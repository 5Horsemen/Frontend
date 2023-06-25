import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InboxComponent } from './views/inbox/inbox.component';
import { PublicationsComponent } from './components/post/publications/publications.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterEmployerComponent } from './views/registers/register-employer/register-employer.component';


const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
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
    path: 'publications',
    component: PublicationsComponent,
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
