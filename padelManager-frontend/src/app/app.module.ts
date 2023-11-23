import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActualizarUsuarioComponent } from './usuarios/actualizar-usuario/actualizar-usuario.component';
import { VisualizarUsuarioComponent } from './usuarios/visualizar-usuario/visualizar-usuario.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './estaticos/home/home.component';
import { JwtInterceptorInterceptor } from './jwt-interceptor.interceptor';
import { PaginaNoAutorizadoComponent } from './utiles/pagina-no-autorizado/pagina-no-autorizado.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlogComponent } from './estaticos/blog/blog.component';
import { FormularioReservasComponent } from './reservas/form-reservar/formulario-reservas/formulario-reservas.component';
import { FaqsComponent } from './estaticos/faqs/faqs.component';
import { PerfilUsuarioComponent } from './usuarios/perfil-usuario/perfil-usuario.component';
import { ListarReservasUsuarioComponent } from './reservas/listar-reservas-usuario/listar-reservas-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    CrearUsuarioComponent,
    ActualizarUsuarioComponent,
    VisualizarUsuarioComponent,
    LoginComponent,
    HomeComponent,
    PaginaNoAutorizadoComponent,
    BlogComponent,
    FormularioReservasComponent,
    FaqsComponent,
    PerfilUsuarioComponent,
    ListarReservasUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatExpansionModule,
    BrowserAnimationsModule
  ],
  providers: [
    JwtInterceptorInterceptor,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
