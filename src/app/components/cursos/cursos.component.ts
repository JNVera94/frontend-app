import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MateriadataService } from 'src/app/services/materiadata.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],

})


export class CursosComponent {
  cursos_originales: any;
  cursos: any;


  categoriaSeleccionada = 'all';

  constructor(private materiaService: MateriadataService) {

  }

  ngOnInit() {
    this.materiaService.getAllMaterias().subscribe(materias => {
      console.log(materias)
      this.cursos_originales = materias.data
      this.cursos = this.cursos_originales
    })

  }
  filtrarPorCategoria(categoria: string) {
    this.cursos = this.cursos_originales.filter((curso: any) => curso.nivel === categoria); 
  }
  
  mostrarTodos() {
    this.categoriaSeleccionada = 'all';
    this.reiniciar();
  }
  
  reiniciar() {
    this.cursos = this.cursos_originales;
  }}