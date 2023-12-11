import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnosdataService } from 'src/app/services/alumnosdata.service';
import { NotifierService } from 'angular-notifier';
import { DialogService } from 'src/app/services/dialog.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent implements OnInit {
  alumnoData: any;
  alumno: any = {};
  alumnoId!: string;
  private readonly notifier: NotifierService;
  private dialogRef: MatDialogRef<SuccessDialogComponent> | undefined;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;

  constructor(
    private alumnosService: AlumnosdataService,
    private router: Router,
    notifier: NotifierService,
    private dialogService: DialogService,
    private userdata: UserdataService,
  ) {
    this.notifier = notifier;
  }

  ngOnInit(): void {
    const storedAlumnoData = localStorage.getItem('alumnoData');
    if (storedAlumnoData) {
      this.alumnoData = JSON.parse(storedAlumnoData);
      this.alumno.name = this.alumnoData.data.name;
      this.alumno.lastname = this.alumnoData.data.lastname;
      this.alumno.age = this.alumnoData.data.age;
      this.alumno.email = this.alumnoData.data.email;
      this.alumno.password = this.alumnoData.data.password;
      this.alumnoId = this.alumnoData.data.id;
    }
  }

  editarAlumno() {

    this.alumnosService.updateAlumno(this.alumnoId, this.alumno).subscribe(
      (response) => {

        this.dialogRef = this.dialogService.openSuccessDialog('Perfil Editado');

        this.dialogRef.afterClosed().subscribe(() => {

          this.userdata.getAlumnoDataId(this.alumnoId).subscribe((alumnoData) => {
            this.alumno = alumnoData
            this.alumnosService.enviarAlumno(alumnoData);
            localStorage.setItem('alumnoData', JSON.stringify(this.alumno))
            this.router.navigate(['/misdatos']);
          },
            (error) => {
              console.error('Error al obtener datos del alumno', error);
            }
          );
        })
      });
    (error: any) => {
      this.dialogRef1 = this.dialogService.openFailureDialog('Verifique sus credenciales');
      this.dialogRef1.afterClosed().subscribe(() => {
        location.reload();
      });

    }

  }
}
