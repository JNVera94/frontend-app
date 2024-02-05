import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentdataService } from 'src/app/services/alumnosdata.service';
import { NotifierService } from 'angular-notifier';
import { DialogService } from 'src/app/services/dialog.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component.js';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component';
import { EMPTY, switchMap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CoursedataService } from 'src/app/services/materiadata.service';
import { MatSelectModule } from '@angular/material/select/';
import { MatFormField } from '@angular/material/form-field/index'


interface Icon {
  name: string;
  path: string;
}
@Component({
  selector: 'app-alta-curso',
  templateUrl: './alta-curso.component.html',
  styleUrls: ['./alta-curso.component.css']
})
export class AltaCursoComponent {
  icons: Icon[] = [];
  course: any = {};
  private readonly notifier: NotifierService;
  private dialogRef: MatDialogRef<SuccessDialogComponent> | undefined;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;

  constructor(
    private courseService: CoursedataService,
    private router: Router,
    notifier: NotifierService,
    private dialogService: DialogService,
  ) {
    this.notifier = notifier;
  }

  ngOnInit() {
    this.loadIcons();
  }

  loadIcons() {
    console.log('loadIcons')
    const iconNames = ['code-square', 'file-zip', 'google','cloud-upload','folder2-open','file-lock',
    'display','device-ssd','credit-card-2','calculator','android2',
    'bank','broadcast-pin','clipboard2-data','database-add','diagram-3',
    'motherboard','person-bounding-box','robot']; 
    this.icons = iconNames.map(name => ({ name, path: `assets/cursos/${name}.svg` }));
    console.log(this.icons);
  }


  createCourse() {
    this.courseService.addCourse(this.course).subscribe({
      next: (data: any) => {
          this.course = {};
          this.dialogRef = this.dialogService.openSuccessDialog('Curso registrado');
          this.dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/admin-cursos']);
          });
      },
      error: (error: any) => {
        if (error instanceof HttpErrorResponse) {
          const status = error.status;
  
          if (status === 400) {
            this.dialogRef1 = this.dialogService.openFailureDialog('El email ya está registrado');
          } else {
            this.dialogRef1 = this.dialogService.openFailureDialog('Error al registrarse, intente nuevamente');
          }
          this.dialogRef1.afterClosed().subscribe(() => {
            location.reload();
          });
        } 
        else {
          console.log('Error no es una instancia de HttpErrorResponse');
        }
      }
    });
  }

  setDifficulty(difficulty: string): void {
    this.course.level = difficulty;
  }

  selectIcon(selectedIcon: Icon): void {
    this.course.icon = selectedIcon.path;
  }

}