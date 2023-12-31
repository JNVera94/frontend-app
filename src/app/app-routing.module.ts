import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { EnseniaComponent } from './components/ensenia/ensenia.component';
import { FuncionamientoComponent } from './components/funcionamiento/funcionamiento.component';
import { Form } from '@angular/forms';
import { authGuard } from './components/shared/auth.guard';


import { RegistroComponent } from './components/registro/registro.component';
import { CursoDetalleComponent } from './components/curso-detalle/curso-detalle.component';
import { LoginComponent } from './components/login/login.component';
import { MisdatosComponent } from './components/misdatos/misdatos.component';
import { EditarusuarioComponent } from './components/editarusuario/editarusuario.component';



const routes: Routes = [

  { path: '', component: InicioComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'ensenia', component: EnseniaComponent },
  {path: 'funcionamiento', component: FuncionamientoComponent},
  {path: 'login',component: LoginComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'cursos/:id', component:CursoDetalleComponent },
  {path: 'misdatos',component:MisdatosComponent,canActivate:[authGuard]},
  {path: 'misdatos/editar', component: EditarusuarioComponent,canActivate:[authGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
