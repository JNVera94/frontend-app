import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriadataService, MateriaData } from 'src/app/services/materiadata.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlumnosdataService, } from 'src/app/services/alumnosdata.service';
import { InscripcionDataService, InscripcionData } from 'src/app/services/inscripciondata.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { DialogService } from 'src/app/services/dialog.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component.js';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.css']
})
export class CursoDetalleComponent implements OnInit {
  isLoggedIn: boolean = false;
  cursoId!: string;
  AlumnoId!: string;
  curso!: MateriaData;
  alumnoData!: any;
  private readonly notifier: NotifierService;
  private dialogRef: MatDialogRef<SuccessDialogComponent> | undefined;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;


  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private materiaService: MateriadataService,
    private alumnosDataService: AlumnosdataService,
    private inscripciondataService: InscripcionDataService,
    private router: Router,
    notifier: NotifierService,
    private dialogService: DialogService,
    private cookiesServices: CookieService) {
    this.notifier = notifier;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cursoId = params['id'];
      const storedAlumnoData = localStorage.getItem('alumnoData');
      this.alumnoData = storedAlumnoData ? JSON.parse(storedAlumnoData) : null;
      this.obtenerDetalleCurso();

    });
  }

  obtenerDetalleCurso(): void {
    this.materiaService.getMateriaPorId(this.cursoId).subscribe(
      curso => {
        this.curso = curso.data;
      },
      error => {
        /*console.error('Error al obtener el curso:', error);*/
        this.dialogRef1 = this.dialogService.openFailureDialog('Error al cargar los datos, intente nuevamente');
        this.dialogRef1.afterClosed().subscribe(() => {
          this.router.navigate(['/cursos']);
        });

        return;
      }
    );
  }
  inscribirse(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;

      if (!this.isLoggedIn) {
        this.dialogRef1 = this.dialogService.openFailureDialog('Inicie sesion para continuar');
        this.router.navigate(['/login'])
        return;
      }
    });

    this.AlumnoId = this.alumnoData.data.id;
    const fechaHoraInscripcion = new Date().toISOString();

    this.inscripciondataService.getInscripcionesByAlumnoId(this.AlumnoId).subscribe((inscripciones) => {
      for (const inscripcion of inscripciones.data) {
        if (this.cursoId === inscripcion.materia) {
          this.dialogRef1 = this.dialogService.openFailureDialog('Ya se encuentra inscripto');
          return;
        }
      }

      this.inscripciondataService.addInscripcion(this.AlumnoId, this.cursoId, fechaHoraInscripcion)
        .subscribe(
          response => {
            this.dialogRef = this.dialogService.openSuccessDialog('Inscripción registrada');
            this.dialogRef.afterClosed().subscribe(() => {
              this.router.navigate(['/cursos']);
            });
          },
          error => {
            this.dialogRef1 = this.dialogService.openFailureDialog('Error al realizar la inscripción, intente nuevamente');
            console.error('Error al realizar la inscripción:', error);
          }
        );
    }, error => {
      this.dialogRef1 = this.dialogService.openFailureDialog('Error al realizar la inscripcion, intente nuevamente');
      console.error('Error al obtener las inscripciones:', error);
    });
  }
}