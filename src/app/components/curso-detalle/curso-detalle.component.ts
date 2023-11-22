import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriadataService, MateriaData } from 'src/app/services/materiadata.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlumnosdataService, } from 'src/app/services/alumnosdata.service';
import { InscripcionDataService } from 'src/app/services/inscripciondata.service';

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.css']
})
export class CursoDetalleComponent implements OnInit {

  cursoId!: string;
  AlumnoId!: string;
  curso!: MateriaData;
  alumnoData!: any;

  constructor(private authService: AuthService,
     private route: ActivatedRoute,
      private materiaService: MateriadataService,
      private alumnosDataService: AlumnosdataService,
      private inscripciondataService: InscripcionDataService ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cursoId = params['id'];
      const storedAlumnoData = localStorage.getItem('alumnoData');
      this.alumnoData = storedAlumnoData ? JSON.parse(storedAlumnoData) : null;
      this.obtenerDetalleCurso();

    });
  }

  obtenerDetalleCurso(): void {
    this.materiaService.getMateriaPorId(this.cursoId).subscribe(curso => {
      this.curso = curso.data;

      console.log(this.curso)
      console.log(this.curso.desc)

    });
  }
 inscribirse():void{
  
    this.AlumnoId=this.alumnoData.data.id
    const fechaHoraInscripcion = new Date().toISOString();

    
    this.inscripciondataService.addInscripcion(this.AlumnoId, this.cursoId, fechaHoraInscripcion)
   
    }

 }
