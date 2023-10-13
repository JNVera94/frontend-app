import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { EnseniaComponent } from './components/ensenia/ensenia.component';
import { FuncionamientoComponent } from './components/funcionamiento/funcionamiento.component';
import { Form } from '@angular/forms';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [

  { path: '', component: InicioComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'ensenia', component: EnseniaComponent },
  {path: 'funcionamiento', component: FuncionamientoComponent},
  {path: 'form', component: FormComponent}
  // Otras rutas

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
