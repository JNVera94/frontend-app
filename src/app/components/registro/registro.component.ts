import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnosdataService } from 'src/app/services/alumnosdata.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  alumno: any = {};
  private readonly notifier: NotifierService;

  constructor(
    private alumnosService: AlumnosdataService,
    private router: Router,
    notifier: NotifierService
  ) {
    this.notifier = notifier;
  }

  crearAlumno() {
    this.alumnosService.addAlumno(this.alumno).subscribe(
      (response) => {
        this.notifier.notify('success', 'Alumno creado exitosamente.');
        this.alumno = {}; // Clear form fields
        this.router.navigate(['/login']); // Redirect to the login screen
      },
      (error) => {
        console.error('Error al crear el alumno', error);
      }
    );
  }
}