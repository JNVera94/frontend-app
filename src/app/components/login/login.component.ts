import { Component } from '@angular/core';
import { UserdataService } from 'src/app/services/userdata.service';
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/services/auth.service'; // Update the path based on your actual file structure
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialogRef } from '@angular/material/dialog/index.js';
import { DialogService } from 'src/app/services/dialog.service';
import { Router } from '@angular/router';
import { AlumnosdataService } from 'src/app/services/alumnosdata.service';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: any = {};
  private readonly notifier: NotifierService;
  private dialogRef: MatDialogRef<SuccessDialogComponent> | undefined;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;
  alumnoLogueado: any;

  constructor(
    private userService: UserdataService,
    private authService: AuthService, 
    notifier: NotifierService,
    private dialogService: DialogService,
    private router: Router,
    private alumnosDataService: AlumnosdataService,
  ) {
    this.notifier = notifier;
  }

  userlog() {
    this.userService.login(this.user).subscribe(
      (response) => {
        this.userService.setToken(response.token, { email: this.user.email, password: this.user.password });

        this.authService.login(response.token);

        this.userService.getAlumnoData(this.user.email).subscribe(
          (alumnoData) => {
            this.alumnoLogueado= alumnoData
            this.alumnosDataService.updateAlumnoData(alumnoData);
          },
          (error) => {
            console.error('Error al obtener datos del alumno', error);
          }
        );

        this.dialogRef = this.dialogService.openSuccessDialog('Bienvenido');
        this.dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/']);
          localStorage.setItem('alumnoData',JSON.stringify(this.alumnoLogueado)); 
        });
      },
      (error) => {
        this.dialogRef1=this.dialogService.openFailureDialog('Verifique sus credenciales');
        this.dialogRef1.afterClosed().subscribe(() => {
          location.reload();
        });
      }
    );

  }
}