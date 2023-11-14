import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosdataService {
  private apiUrl = 'http://localhost:3000/api/alumnos'; 
  private authUrl = 'http://localhost:3000/api/alumnos/login';

  constructor(private http: HttpClient) { }

  addAlumno(alumnoData: any): Observable<any> {
    return this.http.post(this.apiUrl, alumnoData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.authUrl, credentials);
  }
}