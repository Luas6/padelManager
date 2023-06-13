import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { ActualizarUsuarioComponent } from './actualizar-usuario/actualizar-usuario.component';
import { VisualizarUsuarioComponent } from './visualizar-usuario/visualizar-usuario.component';

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
