import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { StudentdataService } from './alumnosdata.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  private apiUrl = environment.apiUrl + '/user';

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


  getStudentData(email: string): Observable<any> {
    const url = environment.apiUrl +`/alumnos/email/${email}`;
      return this.http.get(url);
  }
  getStudentDataId(Alumnoid: string): Observable<any> {
    const url = environment.apiUrl +`/alumnos/${Alumnoid}`;
    return this.http.get(url);
  }

}