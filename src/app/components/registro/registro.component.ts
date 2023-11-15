import { Component } from '@angular/core';
import { AlumnosdataService } from 'src/app/services/alumnosdata.service';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  alumno: any = {}; 
  private readonly notifier: NotifierService

  constructor(private alumnosService: AlumnosdataService, notifier: NotifierService) {
    
      this.notifier = notifier;
    
  }

  crearAlumno() {
    
    this.alumnosService.addAlumno(this.alumno).subscribe(
      (response) => {
        this.notifier.notify('success', 'Alumno creado exitosamente.');

        
      },
      (error) => {
        console.error('Error al crear el alumno', error);
        
      }
    );
  }
}