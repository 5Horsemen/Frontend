import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentDto } from 'src/app/models/post/comment-dto.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'http://localhost:8080/api/v1/comments';

  constructor(private http: HttpClient) { }

  createComment(comment: CommentDto): Observable<any> {
    return this.http.post(`${this.baseUrl}`, comment);
  }

  getCommentById(id: number): Observable<CommentDto> {
    return this.http.get<CommentDto>(`${this.baseUrl}/${id}`);
  }

  updateComment(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  likeComment(commentId: number, userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${commentId}/like/${userId}`, {});
  }

  getCommentsByPostId(postId: number): Observable<CommentDto[]> {
    return this.http.get<CommentDto[]>(`${this.baseUrl}/post/${postId}`);
  }
}
