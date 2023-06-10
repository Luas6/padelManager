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
console.log("Datos: "+ this.empleados);
  /*
  this.empleados=  [{
    id: 1,
    nombre: "Juan",
    apellidos: "Pérez",
    correo: "juan.perez@example.com"
  },
  {
    id: 2,
    nombre: "María",
    apellidos: "Gómez",
    correo: "maria.gomez@example.com"
  },
  {
    id: 3,
    nombre: "Carlos",
    apellidos: "López",
    correo: "carlos.lopez@example.com"
  }
];*/
}
}
