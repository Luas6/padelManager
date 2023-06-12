import { Component } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-visualizar-empleado',
  templateUrl: './visualizar-empleado.component.html',
  styleUrls: ['./visualizar-empleado.component.css']
})
export class VisualizarEmpleadoComponent {
  id!: number;
  empleado: Empleado = new Empleado();
  constructor(private empleadoService: EmpleadoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.empleadoService.getEmpleadoById(this.id).subscribe(data => {
      this.empleado = data;
    }, error => console.log(error));
  }
}
