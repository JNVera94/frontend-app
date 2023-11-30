import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosdataService {
  private apiUrl = 'http://localhost:3000/api/alumnos'; 

  alumnoData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  addAlumno(alumnoData: any): Observable<any> {
    return this.http.post(this.apiUrl, alumnoData);
  }

  checkEmailExists(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    console.log(params)
    return this.http.get(this.apiUrl, { params });
  }

  updateAlumnoData(data: any): void {
    console.log('actualizando data:',data);
    this.alumnoData.next(data);
  }

  deleteAlumno(alumnoId: string): Observable<any> {
    const url = `${this.apiUrl}/${alumnoId}`; 
    return this.http.delete(url);
  }

  updateAlumno(alumnoId: string,alumno: any):Observable<any>{
    
    const url=`${this.apiUrl}/${alumnoId}`; 
    return this.http.patch(url, alumno);
  }

  
}


