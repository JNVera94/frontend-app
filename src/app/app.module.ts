import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { CursosComponent } from './components/cursos/cursos.component';
import { FuncionamientoComponent } from './components/funcionamiento/funcionamiento.component';
import { EnseniaComponent } from './components/ensenia/ensenia.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { FormComponent } from './components/form/form.component';
import { RegistroComponent } from './registro/registro.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import {MatButtonModule} from '@angular/material/button';


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
  
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormComponent,
    GridListComponent,
    MatButtonModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }