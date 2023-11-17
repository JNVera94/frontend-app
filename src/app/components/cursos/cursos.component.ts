import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
 
})
export class CursosComponent {
  cursos=[
  { nombre: 'Desarrollo Web', categoria: 'principiante',
   descripcion:'Aprende HMTL, CSS y JavaScript para Construir el Futuro Exploraremos potentes frameworks como Angular y Node.js Cada línea de código será una nueva experiencia sorprendente', 
   icono:'.src/assets/motherboard.svg'},
  { nombre: 'Base de DatoOS', categoria: 'principiante',descripcion:'probandoooo22' },
  { nombre: 'Diseño de Sistemas', categoria: 'avanzado',descripcion:'probandoooo333' },
];

categoriaSeleccionada = 'all';

  filtrarPorCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
  }

  mostrarTodos() {
    this.categoriaSeleccionada = 'all';
  }
}