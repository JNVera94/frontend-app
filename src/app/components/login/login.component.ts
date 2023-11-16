import { Component } from '@angular/core';
import { UserdataService } from 'src/app/services/userdata.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: any = {}; 
  private readonly notifier: NotifierService

  constructor(private userService: UserdataService, notifier: NotifierService) {
    
      this.notifier = notifier;
    
  }
  userlog() {
    this.userService.login(this.user).subscribe(
      (response) => {
        this.notifier.notify('success', 'Sesion iniciada, bienvenido.');
      },
      (error) => {
        console.error('Error during login', error);
        this.notifier.notify('error', 'Error al iniciar sesión. Verifica tus credenciales.');
      }
    );
  }

}


