import { Component, OnInit } from '@angular/core';
import { AlumnosdataService } from 'src/app/services/alumnosdata.service';
import { AuthService } from 'src/app/services/auth.service';
import { EliminarDialogComponent } from '../eliminar-dialog/eliminar-dialog.component';
import { DialogService } from 'src/app/services/dialog.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InscripcionDataService, InscripcionData } from 'src/app/services/inscripciondata.service';
import { MateriadataService, MateriaData } from 'src/app/services/materiadata.service';
import { CookieService } from 'ngx-cookie-service';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component';

interface InscripcionDetalle {
  materiaNombre: string;
  horasTotales: number;
  fechaInscripcion: string;
  inscripcionId: string;
}
@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.css']
})
export class MisdatosComponent implements OnInit {
  alumnoData: any;
  isLoggedIn: boolean = false;
  private dialogRef: MatDialogRef<EliminarDialogComponent> | undefined;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;
  inscripcion!: any;
  detalles: InscripcionDetalle[] = [];
  cursoId!: string;
  materiadata!: MateriaData;


  constructor(private dialog: MatDialog,
    private router: Router,
    private alumnosDataService: AlumnosdataService,
    private authService: AuthService,
    private dialogService: DialogService,
    private inscripcionDataService: InscripcionDataService,
    private cookiesService: CookieService,
    private materiadataservice: MateriadataService) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;

      if (this.isLoggedIn) {
        const storedAlumnoData = localStorage.getItem('alumnoData');
        if (storedAlumnoData) {
          this.alumnoData = JSON.parse(storedAlumnoData);
        }
        const alumnoId = this.alumnoData.data.id
        

        this.inscripcionDataService.getInscripcionesByAlumnoId(alumnoId).subscribe((inscripciones) => {
          for (const inscripcion of inscripciones.data) {
            this.cursoId = inscripcion.materia; 
            this.materiadataservice.getMateriaPorId(this.cursoId).subscribe((materiadata) => {
              const inscripcionDetalle: InscripcionDetalle = {
                materiaNombre: materiadata.data.name,
                horasTotales: materiadata.data.totalhours,
                fechaInscripcion:this.formatFecha(inscripcion.fechaInscripcion),
                inscripcionId: inscripcion.id
              };
              this.detalles.push(inscripcionDetalle);
            });
          }
        },error=>{
          this.dialogRef1=this.dialogService.openFailureDialog('Error al cargar sus datos, intente nuevamente');
        });
      }
    });
  }
  private formatFecha(fecha: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(fecha).toLocaleDateString('es-ES', options);
  }
  eliminardialog(event: any) {

    this.dialogRef = this.dialogService.openEliminarDialog('¿Desea eliminar su cuenta?');
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {

        this.onDeleteAlumno();
      } else {

        console.log('Eliminación cancelada por el usuario');
      }
    });
  }

  eliminarInsdialog(inscripcionId: string) {

    this.dialogRef = this.dialogService.openEliminarDialog('¿Desea eliminar su Inscripcion?');

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {

        this.EliminarIns(inscripcionId);
      } else {

        console.log('Eliminación cancelada por el usuario');
      }
    });
  }

  EliminarIns(inscripcionId: string) {
    this.dialogService.openEliminarDialog
    const inscID = inscripcionId
    this.inscripcionDataService.deleteInscripcionById(inscID).subscribe(
      (response) => {

        console.log('inscripcion eliminada con éxito:', response);
        location.reload();
      },
      (error) => {
        console.error('Error al eliminar la inscripcion:', error);

      }
    );
  }

  onDeleteAlumno() {
    this.dialogService.openEliminarDialog
    const storedAlumnoData = localStorage.getItem('alumnoData');
    if (storedAlumnoData) {
      this.alumnoData = JSON.parse(storedAlumnoData);
      const alumnoId = this.alumnoData.data.id;
      this.alumnosDataService.deleteAlumno(alumnoId).subscribe(
        (response) => {

          console.log('Alumno eliminado con éxito:', response);
          this.authService.logout()
          this.router.navigate(['/']);
        },
        (error) => {
          this.dialogRef1=this.dialogService.openFailureDialog('Error al eliminar, intente nuevamente');
        }
      );
    }
  }
  editarDatos() {
    this.router.navigate(['/misdatos/editar']);
  }
}
