import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { UserdataService } from './userdata.service';
import { AlumnosdataService } from './alumnosdata.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private tokenStorageService: TokenStorageService, private alumnosDataService: AlumnosdataService) {
    this.checkToken();
  }

  login(token: string) {
    this.tokenStorageService.saveToken(token);

    this.loggedIn.next(true);
  }

  logout() {
    this.tokenStorageService.removeToken();
    localStorage.removeItem('alumnoData');
    this.loggedIn.next(false);
  }

  private checkToken() {
    const token = this.tokenStorageService.getToken();
    if (token) {
      this.loggedIn.next(true);
    }
  }
}