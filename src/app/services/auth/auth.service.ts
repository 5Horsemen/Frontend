import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StudentRegistrationRequest } from 'src/app/models/registration/student-registration-request.model';
import { AuthenticationResponseDto } from 'src/app/models/auth/authentication-response-dto.model';
import { AuthenticationRequestDto } from 'src/app/models/auth/authentication-request-dto.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://localhost:8080/api/v1/account';
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  public isAuthenticated = this._isAuthenticated.asObservable();

  setAuthenticated(value: boolean) {
    this._isAuthenticated.next(value);
  }

  registerStudent(request: StudentRegistrationRequest): Observable<AuthenticationResponseDto> {
    const url = `${this.apiUrl}/register/student`;
    return this.http.post<AuthenticationResponseDto>(url, request).pipe(
      tap(response => {
        this.saveTokens(response);
      })
    );
  }

  login(request: AuthenticationRequestDto): Observable<AuthenticationResponseDto> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<AuthenticationResponseDto>(url, request).pipe(
      tap(response => {
        this.saveTokens(response);
        this.setAuthenticated(true);
      })
    );
  }

  private saveTokens(response: AuthenticationResponseDto): void {
    localStorage.setItem(this.accessTokenKey, response.access_token);
    localStorage.setItem(this.refreshTokenKey, response.refresh_token);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  private removeTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  isLoggedIn(): boolean {
    const accessToken = this.getAccessToken();
    return accessToken !== null && !this.jwtHelper.isTokenExpired(accessToken);
  }

  logout(): void {
    this.removeTokens();
  }

  getEmailFromToken(): string | null {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      try {
        const decodedToken: any = this.jwtHelper.decodeToken(accessToken);
        return decodedToken ? decodedToken.sub : null;
      } catch (error) {
        console.log('Error al decodificar el token', error);
      }
    }
    return null;
  }
  getUserIdFromToken(): number | null {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      try {
        const decodedToken: any = this.jwtHelper.decodeToken(accessToken);
        return decodedToken ? decodedToken.userId : null;
      } catch (error) {
        console.log('Error al decodificar el token', error);
      }
    }
    return null;
  }

}
