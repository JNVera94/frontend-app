import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriadataService,MateriaData } from 'src/app/services/materiadata.service';

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.css']
})
export class CursoDetalleComponent implements OnInit {

   cursoId!: string;
  
   curso!: MateriaData; 

  constructor(private route: ActivatedRoute, private materiaService: MateriadataService) { }

  ngOnInit() :void{
    this.route.params.subscribe(params => {
      this.cursoId = params['id']; 
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
}