import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MateriadataService } from 'src/app/services/materiadata.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component.js';
import { MatDialogRef } from '@angular/material/dialog/index.js';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],

})


export class CursosComponent {
  cursos_originales: any;
  cursos: any;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;

  categoriaSeleccionada = 'all';

  constructor(private materiaService: MateriadataService,
              private dialogService: DialogService,
              private router: Router,) {

  }

  ngOnInit() {
    this.materiaService.getAllMaterias().subscribe(materias => {
      console.log(materias)
      this.cursos_originales = materias.data
      this.cursos = this.cursos_originales
    },
    error => {
      this.dialogRef1 = this.dialogService.openFailureDialog('Error al cargar los datos, intente nuevamente');
      this.dialogRef1.afterClosed().subscribe(() => {
        this.router.navigate(['/cursos']);
      });
      return;
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