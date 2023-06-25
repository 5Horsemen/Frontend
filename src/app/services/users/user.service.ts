import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/models/users/user-dto.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/v1/user';

  constructor(private http: HttpClient) { }

  getUserById(userId: number): Observable<UserDto> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<UserDto>(url, { headers: this.getHeaders() });
  }

  getUserByEmail(email: string): Observable<UserDto> {
    const url = `${this.apiUrl}/filterByEmail`;
    const params = new HttpParams().set('email', email);
    return this.http.get<UserDto>(url, { params, headers: this.getHeaders() });
  }

  uploadProfileImage(userId: number, imageFile: File): Observable<UserDto> {
    const url = `${this.apiUrl}/${userId}/profileImage`;
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    return this.http.post<UserDto>(url, formData, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);

    return headers;
  }
  searchUsers(term: string): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/search?term=${term}`, { headers: this.getHeaders() });
  }
}