import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NotifierModule } from 'angular-notifier';



import { HttpClientModule} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';


import { CursosComponent } from './components/cursos/cursos.component';
import { FuncionamientoComponent } from './components/funcionamiento/funcionamiento.component';
import { EnseniaComponent } from './components/ensenia/ensenia.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { FormComponent } from './components/form/form.component';
import { RegistroComponent } from './components/registro/registro.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { CursoDetalleComponent } from './components/curso-detalle/curso-detalle.component';
import { NotifierComponent } from './components/notifier/notifier.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SingoutComponent } from './components/auth/singout/singout.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CursosComponent,
    FuncionamientoComponent,
    EnseniaComponent,
    InicioComponent,
    RegistroComponent,
    PruebaComponent,
    CursoDetalleComponent,
    NotifierComponent,
    SigninComponent,
    SingoutComponent,
  
  
 
  
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormComponent,
    GridListComponent,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    RouterModule,
    NotifierModule,
    ReactiveFormsModule
    
    ],
  providers: [importProvidersFrom(HttpClientModule),],
  bootstrap: [AppComponent]
})
export class AppModule { }

