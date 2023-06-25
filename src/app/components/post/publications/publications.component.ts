import { Component, Input, AfterViewInit } from '@angular/core';
import { CommentDto } from 'src/app/models/post/comment-dto.model';
import { PostDto } from 'src/app/models/post/post-dto.model';
import { UserDto } from 'src/app/models/users/user-dto.model';
import { CommentService } from 'src/app/services/comment/comment.service';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})

export class PublicationsComponent implements AfterViewInit {

  currentUserName: string = "";
  selectedPhoto: string = '';
  postCreators!: UserDto;
  commentAreaVisibility: { [postId: number]: boolean } = {};

  @Input() user!: UserDto;

  postDtos: PostDto[] = [];

  newComment: CommentDto = {
    id: 0,
    content: '',
    user: this.user,
    postId: 0,
    likes: []
  };

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private userService: UserService,
  ) { }

  ngAfterViewInit(): void {
    this.loadPostDtos();
  }

  loadPostDtos(): void {
    this.postService.getAllPosts().subscribe(
      (postDtos: PostDto[]) => {
        console.log(postDtos);
        this.postDtos = postDtos;
        for (let postDto of this.postDtos) {
          this.getPostCreator(postDto);
        }
      },
      (error: any) => {
        console.error('Error loading postDtos:', error);
      }
    );
  }

  toggleLike(postDto: PostDto): void {
    const likedByCurrentUser = postDto.likes.some((user) => user.id === this.user.id);
    if (!likedByCurrentUser) {
      this.postService.likePost(postDto.id, this.user.id).subscribe(
        () => {
          postDto.likes.push(this.user);
        },
        (error: any) => {
          console.error('Error liking post:', error);
        }
      );
    } else {
      // TODO: Realizar la lógica para deshacer el like en el backend y actualiza postDto.likes si es necesario
      const updatedLikes = postDto.likes.filter((user) => user.id !== this.user.id);
      postDto.likes = updatedLikes;
    }
  }

  isLiked(postDto: PostDto): boolean {
    return postDto.likes.some((user) => user.id === this.user.id);
  }

  toggleCommentArea(postDto: PostDto): void {
    this.commentAreaVisibility[postDto.id] = !this.commentAreaVisibility[postDto.id];
  }

  addComment(postDto: PostDto, messageText: string): void {
    this.newComment.postId = postDto.id;
    this.newComment.content = messageText; // Use the passed message text as the content of the comment

    if (this.newComment.content.trim() !== '') {
      this.commentService.createComment(this.newComment).subscribe(
        (comment: CommentDto) => {
          postDto.comments.push(comment);
          this.newComment.content = ''; // You might also want to reset the input field here.
        },
        (error: any) => {
          console.error('Error adding comment:', error);
        }
      );
    }
  }

  selectPhoto() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', (event: Event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const selectedFile = files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedPhoto = e.target.result;
        };
        reader.readAsDataURL(selectedFile);
      }
    });
    fileInput.click();
    fileInput.addEventListener('change', (event: Event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const selectedFile = files[0];
        this.readSelectedPhoto(selectedFile);
      }
    });
  }

  clearSelectedPhoto(): void {
    this.selectedPhoto = '';
  }

  readSelectedPhoto(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedPhoto = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  getPostCreator(postDto: PostDto): void {
    this.userService.getUserById(postDto.userId).subscribe(
      (user: UserDto) => {
        this.postCreators = user;
        console.log(this.postCreators);
      },
      (error: any) => {
        console.error('Error getting post creator:', error);
      }
    );
  }
  getImageDataUrl(imageData: any): string {
    if (typeof imageData === 'string' && imageData.startsWith('data:image')) {
      return imageData; // La cadena ya es una URL de imagen válida
    } else if (Array.isArray(imageData)) {
      const base64String = String.fromCharCode.apply(null, imageData);
      return `data:image/jpeg;base64,${base64String}`;
    } else {
      return '';
    }
  }

}
