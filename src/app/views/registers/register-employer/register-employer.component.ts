import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../service/api.service";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployerComponent {
  registerForm!: FormGroup;

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private formBuilder: FormBuilder,
              private apiService: ApiService,
              private http: HttpClient ) {}


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      ruc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      companyName: ['', Validators.required],
      position: ['', Validators.required],

    });


  }

  get formControls() {
    return this.registerForm.controls;
  }


  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const registerUrl = 'http://localhost:8080/api/v1/account/register/student';

    const requestData = {
      employer: {

        name: this.registerForm.value.name,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        dni: this.registerForm.value.dni,
        ruc: this.registerForm.value.ruc,
        companyName: this.registerForm.value.companyName,
        position: this.registerForm.value.position,
      },
    };

    this.http.post(registerUrl, requestData).subscribe(
      response => {
        // Registro exitoso, manejar la respuesta del API según sea necesario
        console.log('Registro exitoso', response);
      },
      error => {
        // Error en el registro, manejar el error según sea necesario
        console.error('Error en el registro', error);
      }
    );

    this.router.navigate(['/home']);
  }
}
