import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnosdataService } from 'src/app/services/alumnosdata.service';
import { NotifierService } from 'angular-notifier';
import { DialogService } from 'src/app/services/dialog.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component.js';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component';
import { EMPTY, switchMap } from 'rxjs';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  alumno: any = {};
  private readonly notifier: NotifierService;
  private dialogRef: MatDialogRef<SuccessDialogComponent> | undefined;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;

  constructor(
    private alumnosService: AlumnosdataService,
    private router: Router,
    notifier: NotifierService,
    private dialogService: DialogService,
  ) {
    this.notifier = notifier;
  }

  crearAlumno() {
    this.alumnosService.checkEmailExists(this.alumno.email).pipe(
      switchMap((response) => {
        if (response && response.exists) {
          this.dialogRef1 = this.dialogService.openFailureDialog('El email ya está registrado');
          return EMPTY;
        } else {
          return this.alumnosService.addAlumno(this.alumno);
        }
      })
    ).subscribe(
      (response) => {
        if (response) {
          this.alumno = {}; // Clear form fields
          this.dialogRef = this.dialogService.openSuccessDialog('Registro exitoso');
          this.dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/login']);
          });
        }
      },
      (error) => {
        if (error && error.error && error.error.message === 'El email ya está registrado') {
          this.dialogRef1 = this.dialogService.openFailureDialog('El email ya está registrado');
        } else {
          this.dialogRef1 = this.dialogService.openFailureDialog('Verifique sus credenciales');
        }
        this.dialogRef1.afterClosed().subscribe(() => {
          location.reload();
        });
        console.error('Error al crear el alumno', error);
      }
    );
  }}