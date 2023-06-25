import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth/auth.service";
import { AuthenticationRequestDto } from "../../models/auth/authentication-request-dto.model";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    const request: AuthenticationRequestDto = {
      email: this.email,
      password: this.password
    };

    this.authService.login(request).subscribe(
      () => {
        // El inicio de sesión fue exitoso, redirigir a "/messages"
        this.router.navigate(['/publications']);
      },
      (error) => {
        // El inicio de sesión falló, puedes mostrar un mensaje de error al usuario
        console.log('Error al iniciar sesión', error);
      }
    );
  }
}

