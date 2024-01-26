import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentdataService } from 'src/app/services/alumnosdata.service';
import { NotifierService } from 'angular-notifier';
import { DialogService } from 'src/app/services/dialog.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component.js';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component';
import { EMPTY, switchMap, throwError } from 'rxjs';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  student: any = {};
  private readonly notifier: NotifierService;
  private dialogRef: MatDialogRef<SuccessDialogComponent> | undefined;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;

  constructor(
    private studentService: StudentdataService,
    private router: Router,
    notifier: NotifierService,
    private dialogService: DialogService,
  ) {
    this.notifier = notifier;
  }

  createStudent() {
    this.studentService.checkEmailExists(this.student.email).subscribe({
      next: (response) => {
        if (response.data) {
          this.dialogRef1 = this.dialogService.openFailureDialog('El email ya está registrado');
          this.dialogRef1.afterClosed().subscribe(() => {
            location.reload();
          });
        } else {
          this.studentService.addStudent(this.student).subscribe(() => {
            this.student = {};
            this.dialogRef = this.dialogService.openSuccessDialog('Registro exitoso');
            this.dialogRef.afterClosed().subscribe(() => {
              this.router.navigate(['/login']);
            });
          });
        }
      },
      error: (error) => {
        this.dialogRef1 = this.dialogService.openFailureDialog('Error al registrarse, intente nuevamente');
        this.dialogRef1.afterClosed().subscribe(() => {
          location.reload();
        });
      }
    });
  }

}