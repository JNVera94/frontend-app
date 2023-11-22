import { Component, OnInit } from '@angular/core';
import { AlumnosdataService } from 'src/app/services/alumnosdata.service';
import { AuthService } from 'src/app/services/auth.service';
import { EliminarDialogComponent } from '../eliminar-dialog/eliminar-dialog.component';
import { DialogService } from 'src/app/services/dialog.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.css']
})
export class MisdatosComponent implements OnInit {
  alumnoData: any;
  isLoggedIn: boolean = false;
  private dialogRef: MatDialogRef<EliminarDialogComponent> | undefined;



  constructor(private dialog: MatDialog,private router: Router,private alumnosDataService: AlumnosdataService, private authService: AuthService, private dialogService: DialogService) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;

      if (this.isLoggedIn) {

        const storedAlumnoData = localStorage.getItem('alumnoData');
        console.log(storedAlumnoData)
        if (storedAlumnoData) {
          this.alumnoData = JSON.parse(storedAlumnoData);


        }
      }
    });
  }
  eliminardialog(event: any) {
    // Abre el diálogo y guarda una referencia al dialogRef
    this.dialogRef = this.dialogService.openEliminarDialog('Desea eliminar su cuenta?');

    // Maneja el resultado del diálogo cuando se cierra
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        // Realiza la acción de eliminación
        this.onDeleteAlumno();
      } else {
        // El usuario canceló la eliminación
        console.log('Eliminación cancelada por el usuario');
      }
    });
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
          console.error('Error al eliminar el alumno:', error);
          // Maneja el error según tus necesidades
        }
      );
    }
  }}