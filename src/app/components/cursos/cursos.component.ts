import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
 
})
export class CursosComponent {
  cursos_originales=[
  { nombre: 'Desarrollo Web', categoria: 'principiante', descripcion:'Aprende HMTL, CSS y JavaScript para Construir el Futuro Exploraremos potentes frameworks como Angular y Node.js Cada línea de código será una nueva experiencia sorprendente', icono:'/assets/cursos/motherboard.svg', id:'654bd4d101fbcb278b490d87'},
  { nombre: 'Base de Datos', categoria: 'principiante',descripcion:'SQL Server y Workbench 8.0 Dominaras bases de datos relacionales y sistemas de gestion. Desde estructura y diseño hasta manejo de datos en entornos empresariales',icono:'/assets/cursos/database-add.svg',id:'654bd4d101fbcb278b490d87'},
  { nombre: 'Diseño de Sistemas', categoria: 'principiante',descripcion:'Comprenderas arquitectura y modelado de sistemas. Utilizaremos softwares de IBM y .NET Adquiriras habilidades en gestion y planificacion de proyectos',icono:'/assets/cursos/person-bounding-box.svg',id:'654bd4d101fbcb278b490d87'},
  { nombre: 'Comunicacion de Datos DESC', categoria: 'intermedio',descripcion:'Comprenderas arquitectura y modelado de sistemas. Utilizaremos softwares de IBM y .NET Adquiriras habilidades en gestion y planificacion de proyectos',icono:'/assets/cursos/broadcast-pin.svg',id:'654bd4d101fbcb278b490d87'},
  { nombre: 'Inteligencia Artificial', categoria: 'intermedio',descripcion:'Uso de Python y RapidMiner. Fundamentos de IA, aprendizaje automatico y Redes neuronales. Aprende el futuro de la tecnologia',icono:'/assets/cursos/robot.svg'},
  { nombre: 'Paradigmas de la Programacion', categoria: 'intermedio',descripcion:'Programacion orienta a objetos, Funcional e Imperativa. Utilizaras Dolphin SmallTalk 6.0  Seras capaz de adaptarte a los diferentes contextos y problemas de la programacion',icono:'/assets/cursos/diagram-3.svg',id:'654bd4d101fbcb278b490d87'},
  { nombre: 'Sistemas Operativos', categoria: 'avanzado',descripcion:'Uso de windows y Unix. Conoceras las bases de los sistemas operativos Android e iOS. Aprenderaz gestion de aplicaciones, interfaces de usuario y APIs de desarrollo',icono:'/assets/cursos/android2.svg',id:'654bd4d101fbcb278b490d87'},
  { nombre: 'Ciencia de Datos', categoria: 'avanzado',descripcion:'Estadistica, Programacion, Analisis de Datos y mas. Utilizaras SQL, Hadoop, Azure y Python. Aprenderas analisis y reconomiento de patrones, imagenes y datose',icono:'/assets/cursos/clipboard2-data.svg',id:'654bd4d101fbcb278b490d87'},
  { nombre: 'Informatica juridica DESC', categoria: 'avanzado',descripcion:'Comprenderas arquitectura y modelado de sistemas. Utilizaremos softwares de IBM y .NET Adquiriras habilidades en gestion y planificacion de proyectos',icono:'/assets/cursos/bank.svg',id:'654bd4d101fbcb278b490d87'},

];
cursos:any;

categoriaSeleccionada = 'all';

  filtrarPorCategoria(categoria: string) {
    this.cursos = this.cursos_originales.filter((curso) => curso.categoria === categoria);
    /*this.categoriaSeleccionada = categoria;*/
  }
  mostrarTodos() {
    this.categoriaSeleccionada = 'all';
  }
  ngOnInit(){
    this.cursos=this.cursos_originales;
  }
  reiniciar(){
    this.cursos=this.cursos_originales;
  }
}