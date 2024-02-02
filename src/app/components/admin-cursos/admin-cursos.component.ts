import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursedataService } from 'src/app/services/materiadata.service';
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog/index.js';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component';
import { EliminarDialogComponent } from '../eliminar-dialog/eliminar-dialog.component';

@Component({
  selector: 'app-admin-cursos',
  templateUrl: './admin-cursos.component.html',
  styleUrls: ['./admin-cursos.component.css']
})
export class AdminCursosComponent {

  total_courses: any;
  courses: any;
  private dialogRef: MatDialogRef<EliminarDialogComponent> | undefined;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;
  

  constructor(
    private courseService: CoursedataService,
    private dialogService: DialogService,
    private router: Router,
    private coursedataservice: CoursedataService
  ) {}

  ngOnInit() {
    this.courseService.getAllCourses().subscribe({
      next: courses => {
        this.total_courses = courses.data
        this.courses = this.total_courses
        console.log('Cursos obtenidos:', this.total_courses);
      },
      error: error => {
        this.dialogRef1 = this.dialogService.openFailureDialog('Error al cargar los datos, intente nuevamente');
        this.dialogRef1.afterClosed().subscribe(() => {
          this.router.navigate(['/cursos']);
        });
        return;
      }
    });
  }

  deleteInsdialog(course_id: string) {
    this.dialogRef = this.dialogService.openDeleteDialog('¿Desea eliminar el curso?');
    this.dialogRef.afterClosed().subscribe({
      next: result => {
        if (result === 'confirm') {
          this.coursedataservice.deleteCourseById(course_id).subscribe({
            next: (response) => {
              window.location.reload();
            },
            error: (error) => {
              console.error('Error al eliminar el curso:', error);
            }
          });
        } else {
          console.log('Eliminación cancelada por el usuario');
        }
      },
      error: (error) => {
        console.error('Error al cerrar el diálogo:', error);
      }
    });
  }

  editCurso() {
    this.router.navigate(['/']);
  }


  newCourse() {
    this.router.navigate(['/alta-curso']);
  }
}