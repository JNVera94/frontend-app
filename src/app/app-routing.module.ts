import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { EnseniaComponent } from './components/ensenia/ensenia.component';

const routes: Routes = [

  { path: '', component: InicioComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'ensenia', component: EnseniaComponent },
  // Otras rutas

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
