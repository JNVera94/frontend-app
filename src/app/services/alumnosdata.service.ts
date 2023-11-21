import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosdataService {
  private apiUrl = 'http://localhost:3000/api/alumnos'; 
  private authUrl = 'http://localhost:3000/api/alumnos/login';

  alumnoData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  addAlumno(alumnoData: any): Observable<any> {
    return this.http.post(this.apiUrl, alumnoData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.authUrl, credentials);
  }

  updateAlumnoData(data: any): void {
    console.log('actualizando data:',data);
    this.alumnoData.next(data);
  }
}