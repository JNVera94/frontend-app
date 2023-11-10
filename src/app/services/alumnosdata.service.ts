import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosdataService {
  private apiUrl = 'http://localhost:3000/api/alumnos'; 

  constructor(private http: HttpClient) { }

  addAlumno(alumnoData: any): Observable<any> {
    return this.http.post(this.apiUrl, alumnoData);
  }
}