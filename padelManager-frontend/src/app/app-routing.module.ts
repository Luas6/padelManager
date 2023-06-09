import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { ActualizarUsuarioComponent } from './usuarios/actualizar-usuario/actualizar-usuario.component';
import { VisualizarUsuarioComponent } from './usuarios/visualizar-usuario/visualizar-usuario.component';

const routes: Routes = [
  {path: 'usuarios', component: ListaUsuariosComponent},
  {path: 'crear-usuario', component: CrearUsuarioComponent},
  {path: 'actualizar-usuario/:id', component: ActualizarUsuarioComponent},
  {path: 'visualizar-usuario/:id', component: VisualizarUsuarioComponent},
  {path: '', redirectTo: 'usuarios', pathMatch: 'full'} //Home
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
