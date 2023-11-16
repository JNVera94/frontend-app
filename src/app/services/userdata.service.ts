import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  private apiUrl = 'http://localhost:3000/api/user'; 

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials)
      .pipe(
        catchError((error) => {
          
          console.error('Error during login:', error);
          throw error;
        })
      );
  }
}