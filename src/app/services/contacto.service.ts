import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrl = environment.apiUrl + '/contacto';

  mensajeData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  addMensaje(mensajeData: any): Observable<any> {
    return this.http.post(this.apiUrl, mensajeData);
  }
}
