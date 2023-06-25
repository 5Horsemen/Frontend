import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay, filter } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogSignOffComponent } from 'src/app/components/dialog-sign-off/dialog-sign-off.component';
import { DialogChangePasswordComponent } from 'src/app/components/dialog-change-password/dialog-change-password.component';
import { DialogChangeEmailComponent } from 'src/app/components/dialog-change-email/dialog-change-email.component';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';
@UntilDestroy()
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('rightSidenav') rightSidenav!: MatSidenav;




  email?: string;
  password?: string;
  newPassword?: string;
  rePassword?: string;
  userName: string = '';

  constructor(private observer: BreakpointObserver, private router: Router, public dialog: MatDialog,private userService: UserService,private authService: AuthService) { }

  ngOnInit(): void {

    const userId = this.authService.getUserIdFromToken(); // Obtener el ID del usuario autenticado
    console.log(userId);
    if (userId) {
      this.getUserDetails(userId);

    }
  }

  getUserDetails(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      user => {
        this.userName = `${user.name} ${user.lastName}`;
      },
      error => {
        console.error(error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe(res => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }



  openDialogChangePassword(){
    const dialogRef = this.dialog.open(DialogChangePasswordComponent, {
      width: '400px',
      data: {
        password: this.password,
        newPassword: this.newPassword,
        rePassword: this.rePassword
      }
    })
  }

  openDialogSignOff(){
    this.authService.logout();
    const dialogRef = this.dialog.open(DialogSignOffComponent, {
      width: '400px'
    })
  }


  openDialogChangeEmail(){
    const dialogRef = this.dialog.open(DialogChangeEmailComponent, {
      width: '400px'
    })
  }


}
