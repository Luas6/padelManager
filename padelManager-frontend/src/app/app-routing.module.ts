import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { ActualizarEmpleadoComponent } from './actualizar-empleado/actualizar-empleado.component';
import { VisualizarEmpleadoComponent } from './visualizar-empleado/visualizar-empleado.component';

const routes: Routes = [
  {path: 'empleados', component: ListaEmpleadosComponent},
  {path: 'crear-empleado', component: CrearEmpleadoComponent},
  {path: 'actualizar-empleado/:id', component: ActualizarEmpleadoComponent},
  {path: 'visualizar-empleado/:id', component: VisualizarEmpleadoComponent},
  {path: '', redirectTo: 'empleados', pathMatch: 'full'} //Home
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
