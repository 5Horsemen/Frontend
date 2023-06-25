import {Component, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/users/students.service';
import { StudentDto } from 'src/app/models/users/student-dto.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;
  selectedPhoto: string = '';
  profilePic: string = "";
  
  student: StudentDto | undefined ;
  constructor(private studentservice: StudentService,private authService: AuthService) { }
  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken(); // Obtener el ID del usuario autenticado
    console.log(userId);
    if (userId) {
      this.getUserDetails(userId);
    }
  }

  getUserDetails(studentId: number): void {
    this.studentservice.getStudentById(studentId).subscribe(
      (response: any) => {
        this.student = response;
        console.log(this.student);
      },
      (error: any) => {
        console.log(error);
      }
    );
    
  }

  openFileInput() {
    // Este método se encarga de abrir el cuadro de diálogo de selección de archivos
    // cuando se hace clic en el botón
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event: any) {
    // Este método se ejecuta cuando se selecciona un archivo en el cuadro de diálogo
    const file = event.target.files[0];
    if (file) {
      // Cargar y mostrar la nueva foto de perfil
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedPhoto = e.target.result;
        this.profilePic = this.selectedPhoto; // Actualizar la foto de perfil con la nueva imagen
      };
      reader.readAsDataURL(file);
    }
  }

}
