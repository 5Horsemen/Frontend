import {Component, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';
import { UserDto } from 'src/app/models/users/user-dto.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;

  user!: UserDto;

  constructor(private userService: UserService,private authService: AuthService, private route:ActivatedRoute) { }

  loadUserProfile(userId: number){
    this.userService.getUserById(userId).subscribe(
      (response: any) => {
        this.user = response;
        console.log(this.user);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    console.log(userId);
    if (userId) {
      this.loadUserProfile(userId);
    }
    else{
      const currentuserId = this.authService.getUserIdFromToken()
      if(currentuserId)
      this.loadUserProfile(currentuserId);
    }
  }


  openFileInput() {
    // Este método se encarga de abrir el cuadro de diálogo de selección de archivos
    // cuando se hace clic en el botón
    this.fileInput.nativeElement.click();
  }


}
