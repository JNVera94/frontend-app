import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface MateriaData {
  name: string;
  totalhours: number;
  email: string;
  nivel: string;
  desc: string;
  icono: string
}

@Injectable({
  providedIn: 'root'
})
export class MateriadataService {
  private apiUrl = environment.apiUrl + '/materia';

  constructor(private http: HttpClient) { }

  getMateria(materiaData: MateriaData): Observable<any> {

    const params = new HttpParams()
      .set('name', materiaData.name)
      .set('totalhours', materiaData.totalhours.toString())
      .set('email', materiaData.email)
      .set('nivel', materiaData.nivel.toString())
      .set('descripcion', materiaData.desc)
      .set('icono', materiaData.icono);

    return this.http.get(this.apiUrl, { params });
  }

  getMateriaPorId(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  getAllMaterias(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError((error: any) => {
        return throwError(error);
      })

    )
  }

}


