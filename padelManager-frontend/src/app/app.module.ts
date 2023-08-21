import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { FormsModule } from '@angular/forms';
import { ActualizarUsuarioComponent } from './usuarios/actualizar-usuario/actualizar-usuario.component';
import { VisualizarUsuarioComponent } from './usuarios/visualizar-usuario/visualizar-usuario.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './estaticos/home/home.component';
import { JwtInterceptorInterceptor } from './jwt-interceptor.interceptor';
import { PaginaNoAutorizadoComponent } from './utiles/pagina-no-autorizado/pagina-no-autorizado.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    CrearUsuarioComponent,
    ActualizarUsuarioComponent,
    VisualizarUsuarioComponent,
    LoginComponent,
    HomeComponent,
    PaginaNoAutorizadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
