import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { ActualizarUsuarioComponent } from './usuarios/actualizar-usuario/actualizar-usuario.component';
import { VisualizarUsuarioComponent } from './usuarios/visualizar-usuario/visualizar-usuario.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './estaticos/home/home.component';
import { PaginaNoAutorizadoComponent } from './utiles/pagina-no-autorizado/pagina-no-autorizado.component';
import { guardAuthGuard } from './guard-auth.guard';
import { BlogComponent } from './estaticos/blog/blog.component';

const routes: Routes = [
  {path: 'usuarios', component: ListaUsuariosComponent, canActivate: [guardAuthGuard]},
  {path: 'crear-usuario', component: CrearUsuarioComponent},
  {path: 'actualizar-usuario/:id', component: ActualizarUsuarioComponent, canActivate: [guardAuthGuard]},
  {path: 'visualizar-usuario/:id', component: VisualizarUsuarioComponent, canActivate: [guardAuthGuard]},
  {path: 'login-usuario', component: LoginComponent},
  {path: 'no-autorizado', component: PaginaNoAutorizadoComponent},

  {path: '', component: HomeComponent}, //Home

  {path: 'blog', component: BlogComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
