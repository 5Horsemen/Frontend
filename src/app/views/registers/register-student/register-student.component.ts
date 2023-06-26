import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/users/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {
  registerForm!: FormGroup;
  colleges!: any[]; // Arreglo para almacenar la lista de colleges obtenidos de la API
  careers!: any[]; // Arreglo para almacenar la lista de careers obtenidos de la API

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private http: HttpClient // Inyectar HttpClient en el constructor
    , private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      universityEmail: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      college: ['', Validators.required],
      career: ['', Validators.required],


    });

    // Obtener datos de la API para los dropdowns de College y Career
    this.apiService.getColleges().subscribe(colleges => {
      this.colleges = colleges;
    });

    this.apiService.getCareers().subscribe(careers => {
      this.careers = careers;
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const registerUrl = environment.baseURL + '/api/v1/account/register/student';

    const requestData = {
      student: {
        name: this.registerForm.value.name,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        universityEmail: this.registerForm.value.universityEmail,
        dni: this.registerForm.value.dni
      },
      collegeId: this.registerForm.value.college,
      careerId: this.registerForm.value.career
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

    this.router.navigate(['/publications']);
  }

}
