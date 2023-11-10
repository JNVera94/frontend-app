import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface MateriaData {
  name: string;
  totalhours: number;
  email: string;
  nivel: number;
  desc: string;
}

@Injectable({
  providedIn: 'root'
})
export class MateriadataService {
  private apiUrl = 'http://localhost:3000/api/materia';

  constructor(private http: HttpClient) {}

  getMateria(materiaData: MateriaData): Observable<any> {
   
    const params = new HttpParams()
      .set('name', materiaData.name)
      .set('totalhours', materiaData.totalhours.toString())
      .set('email', materiaData.email)
      .set('nivel', materiaData.nivel.toString())
      .set('descripcion', materiaData.desc);

    return this.http.get(this.apiUrl, { params });
  }

  getMateriaPorId(id: string): Observable<any> {
    
    
    const url = `${this.apiUrl}/${id}`; 
    return this.http.get(url);
  }
}