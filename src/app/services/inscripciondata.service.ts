import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionDataService {
  private apiUrl = 'http://localhost:3000/api/inscripcion/'; 

  materiaData:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  alumnoData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  addInscripcion(alumnoId: String,materiaId: String,fechaHoraInscripcion: string): Observable<any> {
    
    const inscripcionData = { alumnoId, materiaId, fechaHoraInscripcion };
    console.log('Enviando solicitud de inscripción:', inscripcionData);
    
    return this.http.post(this.apiUrl, {alumnoId, materiaId, fechaHoraInscripcion})
    .pipe(
      catchError(error => {
        console.error('Error en la solicitud POST:', error);
        throw error; 
      })
    );

}}