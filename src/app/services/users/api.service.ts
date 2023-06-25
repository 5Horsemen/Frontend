import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  // Ejemplo de método para obtener una lista de colleges desde la API
  getColleges(): Observable<any[]> {
    const url = `${this.apiUrl}/college`;
    return this.http.get<any[]>(url);
  }

  // Ejemplo de método para obtener una lista de careers desde la API
  getCareers(): Observable<any[]> {
    const url = `${this.apiUrl}/career`;
    return this.http.get<any[]>(url);
  }


}
