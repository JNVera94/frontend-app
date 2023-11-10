import { Component } from '@angular/core';
import { AlumnosdataService } from 'src/app/services/alumnosdata.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  alumno: any = {}; // Objeto que almacena los datos del alumno
  private readonly notifier: NotifierService

  constructor(private alumnosService: AlumnosdataService, notifier: NotifierService) {
    
      this.notifier = notifier;
    
  }

  crearAlumno() {
    console.log('funciona')
    this.alumnosService.addAlumno(this.alumno).subscribe(
      (response) => {
        this.notifier.notify('success', 'You are awesome! I mean it!');
        console.log('adsada')
        // Aquí puedes redirigir a otra página o realizar acciones adicionales después de la creación del alumno
      },
      (error) => {
        console.error('Error al crear el alumno', error);
        // Manejo de errores
      }
    );
  }
}