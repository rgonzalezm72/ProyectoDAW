import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { DesarrolloPersonalComponent } from './components/desarrollo-personal/desarrollo-personal.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ArticuloComponent } from './components/articulo/articulo.component';

import { RouterModule } from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { InicioComponent } from './components/inicio/inicio.component';
import { PreviewArticuloComponent } from './components/preview-articulo/preview-articulo.component';
import {CargarArticulosService} from "./services/cargar-articulos.service";
import { ContenidoArticuloComponent } from './components/contenido-articulo/contenido-articulo.component';
import { RedactarComponent } from './components/redactar/redactar.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import {DataService} from "./services/data.service";
import {CookieService} from "ngx-cookie-service";
import {CargarUsuariosService} from "./services/cargar-usuarios.service";


@NgModule({
  declarations: [
    AppComponent,
    DesarrolloPersonalComponent,
    ContactoComponent,
    SobreNosotrosComponent,
    IniciarSesionComponent,
    RegistroComponent,
    ArticuloComponent,
    InicioComponent,
    PreviewArticuloComponent,
    ContenidoArticuloComponent,
    RedactarComponent,
    ConfiguracionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'inicio', component: InicioComponent},
      {path: 'desarrollo-personal', component: DesarrolloPersonalComponent},
      {path: 'desarrollo-personal/:id', component: ArticuloComponent},
      {path: 'contacto', component: ContactoComponent},
      {path: 'sobre-nosotros', component: SobreNosotrosComponent},
      {path: 'login', component: IniciarSesionComponent},
      {path: 'registro', component: RegistroComponent},
      {path: 'redactar', component: RedactarComponent},
      {path: 'configuracion', component: ConfiguracionComponent},
      {path: '', redirectTo: '/inicio', pathMatch:'full'},
      {path: '**', redirectTo: '/inicio', pathMatch:'full'},
    ])
  ],
  providers: [CargarArticulosService,CargarUsuariosService,DataService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
