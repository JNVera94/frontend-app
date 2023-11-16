import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnosdataService } from 'src/app/services/alumnosdata.service';
import { NotifierService } from 'angular-notifier';
import { DialogService } from 'src/app/services/dialog.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component.js';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  alumno: any = {};
  private readonly notifier: NotifierService;
  private dialogRef: MatDialogRef<SuccessDialogComponent> | undefined;

  constructor(
    private alumnosService: AlumnosdataService,
    private router: Router,
    notifier: NotifierService,
    private dialogService: DialogService,
  ) {
    this.notifier = notifier;
  }

  crearAlumno() {
    this.alumnosService.addAlumno(this.alumno).subscribe(
      (response) => {
        this.notifier.notify('success', 'Alumno creado exitosamente.');
        this.alumno = {}; // Clear form fields
        this.dialogRef = this.dialogService.openSuccessDialog('Registro exitoso');
        this.dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        console.error('Error al crear el alumno', error);
      }
    );
  }
}