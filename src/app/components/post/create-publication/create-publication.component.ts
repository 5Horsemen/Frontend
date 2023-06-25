import { Component, ElementRef } from '@angular/core';
import { PostDto } from 'src/app/models/post/post-dto.model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-create-publication',
  templateUrl: './create-publication.component.html',
  styleUrls: ['./create-publication.component.css']
})
export class CreatePublicationComponent {
  showPublicationCard = false;
  userId: number = 1; // Reemplaza 1 con el id del usuario logueado
  userName: string = "John Doe"; // Reemplaza "John Doe" con el nombre del usuario logueado
  profilePicture: string = "https://i.pravatar.cc/300"; // Reemplaza "https://i.pravatar.cc/300" con la URL de la imagen de perfil del usuario logueado
  publicationText: string = '';
  selectedFiles: File[] = [];

  constructor(private elementRef: ElementRef, private postService: PostService) { }

  openPublicationCard() {
    this.showPublicationCard = true;
  }

  closePublicationCard() {
    this.showPublicationCard = false;
    this.publicationText = '';
    this.selectedFiles = [];
  }

  addImage() {
    const fileInput = this.elementRef.nativeElement.querySelector('#file-input');
    fileInput.click();
  }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      for (let i = 0; i < inputElement.files.length; i++) {
        const file = inputElement.files[i];
        this.selectedFiles.push(file);
      }
    }
  }

  getFileUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  removeFile(file: File) {
    const index = this.selectedFiles.indexOf(file);
    if (index !== -1) {
      this.selectedFiles.splice(index, 1);
    }
  }

  publish() {
    // Lógica para publicar la publicación
    const post: PostDto = {
      content: this.publicationText,
      userId: this.userId,
      // Asegúrate de ajustar los siguientes campos según sea necesario
      id: 0,
      likes: [],
      shares: [],
      comments: [],
      image: [], // Inicializamos el arreglo de bytes vacío
      createdDate: new Date(),
      imageUrl: '',
    };

    // Verificar si se seleccionó un archivo
    if (this.selectedFiles.length > 0) {
      const file = this.selectedFiles[0];

      // Leer el archivo como un arreglo de bytes
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const arrayBuffer = event.target.result;
        const uintArray = new Uint8Array(arrayBuffer);

        // Asignar el arreglo de bytes a la propiedad image del objeto post
        post.image = Array.from(uintArray);

        // Enviar la publicación al backend
        this.postService.addPost(post).subscribe(response => {
          // Realiza cualquier acción necesaria después de publicar exitosamente
          console.log('Post publicado con éxito!');
          this.publicationText = '';
          this.selectedFiles = [];
          this.showPublicationCard = false;
        }, error => {
          console.log('Error al publicar el post: ', error);
        });
      };
      reader.readAsArrayBuffer(file);
    } else {
      // Enviar la publicación al backend sin imagen
      this.postService.addPost(post).subscribe(response => {
        // Realiza cualquier acción necesaria después de publicar exitosamente
        console.log('Post publicado con éxito!');
        this.publicationText = '';
        this.selectedFiles = [];
        this.showPublicationCard = false;
      }, error => {
        console.log('Error al publicar el post: ', error);
      });
    }
  }

  onOverlayClick(event: MouseEvent) {
    const cardElement = this.elementRef.nativeElement.querySelector('.publication-card');
    if (!cardElement.contains(event.target)) {
      this.closePublicationCard();
    }
  }

  isImageFile(file: File): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = file.name.split('.').pop()?.toLowerCase();
    return !!extension && imageExtensions.includes(extension);
  }

}
