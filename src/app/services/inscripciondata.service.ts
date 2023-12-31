import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface InscripcionData {
  alumnoId: string;
  materiaId: string;
  fechaHoraInscripcion: string;
}
@Injectable({
  providedIn: 'root'
})
export class InscripcionDataService {
  private apiUrl = environment.apiUrl + '/inscripcion/';

  constructor(private http: HttpClient) { }

  addInscripcion(alumnoId: string, materiaId: string, fechaHoraInscripcion: string): Observable<any> {
    const requestBody = { alumnoId, materiaId, fechaHoraInscripcion };

    return this.http.post(this.apiUrl, requestBody)
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud POST de inscripción:', error);
          throw error;
        })
      );
  }

  getInscripcionesByAlumnoId(alumnoId: string): Observable<any> {
    const url = `${this.apiUrl}alumno/${alumnoId}`;
   
    return this.http.get(url).pipe(
      catchError(error => {
        console.error('Error en la solicitud GET de inscripciones por alumno:', error);
        throw error;
      })
    );
  }
  deleteInscripcionById(inscID:string): Observable<any>{
    const url = `${this.apiUrl}/${inscID}`;
    return this.http.delete(url).pipe(
      catchError(error => {
        console.error('Error en la solicitud delete de inscripcion:', error);
        throw error;
      })
    );
  }
  
}
