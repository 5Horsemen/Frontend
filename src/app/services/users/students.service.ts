import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentDto } from 'src/app/models/users/student-dto.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = environment.baseURL + '/student';

  constructor(private http: HttpClient) { }

  getStudentById(studentId: number): Observable<StudentDto> {
    const url = `${this.apiUrl}/${studentId}`;
    return this.http.get<StudentDto>(url, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);

    return headers;
  }
}
