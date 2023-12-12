import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { AlumnosdataService } from './alumnosdata.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  private apiUrl = environment.apiUrl + '/user';

  constructor(private alumnosDataService: AlumnosdataService,
              private http: HttpClient, 
              private cookies: CookieService, 
              private authService: AuthService) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials)
      .pipe(
        catchError((error) => {
          console.error('Error during login:', error);
          throw error;
        })
      );
  }

  setToken(token: string, credentials: { email: string; password: string }): void {
    this.cookies.set("token", token);
    this.authService.login(token);
  
  }

  getToken(): string {
    return this.cookies.get("token");
  }

  getAlumnoData(email: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
 
    const url = environment.apiUrl +`/alumnos/email/${email}`;
  
    return this.http.get(url, { headers });

  }
  getAlumnoDataId(Alumnoid: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = environment.apiUrl +`/alumnos/${Alumnoid}`;
    return this.http.get(url, { headers });
  }

}