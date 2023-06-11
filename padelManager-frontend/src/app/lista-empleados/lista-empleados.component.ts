import { Component } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent {
  empleados!: Empleado[];

constructor(private empleadosService: EmpleadoService){}

private getEmpleados(){
  this.empleadosService.getListaEmpleados().subscribe(data =>{
    this.empleados = data;
  });
}

ngOnInit(): void{
this.getEmpleados();
  /*
  this.empleados=  [{
    id: 1,
    nombre: "Juan",
    apellidos: "Pérez",
    correo: "juan.perez@example.com"
  }*/
}
}
