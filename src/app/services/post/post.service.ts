import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = environment.baseURL + '/posts';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);

    return headers;
  }

  getPosts(): Observable<any> {
    return this.http.get<any>(this.postsUrl, { headers: this.getHeaders() });
  }

  getPost(id: number): Observable<any> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  addPost(post: any): Observable<any> {
    return this.http.post<any>(this.postsUrl, post, { headers: this.getHeaders() });
  }

  deletePost(id: number): Observable<any> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() });
  }

  updatePost(post: any): Observable<any> {
    return this.http.put<any>(this.postsUrl, post, { headers: this.getHeaders() });
  }

  likePost(postId: number, userId: number): Observable<any> {
    const url = `${this.postsUrl}/${postId}/like/${userId}`;
    return this.http.post<any>(url, null, { headers: this.getHeaders() });
  }

  sharePost(postId: number, userId: number): Observable<any> {
    const url = `${this.postsUrl}/${postId}/share/${userId}`;
    return this.http.post<any>(url, null, { headers: this.getHeaders() });
  }

  getAllPosts(): Observable<any> {
    const url = `${this.postsUrl}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }
}
