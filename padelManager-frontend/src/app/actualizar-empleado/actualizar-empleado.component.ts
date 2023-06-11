import { Component } from '@angular/core';
import { EmpleadoService } from '../empleado.service';
import { Empleado } from '../empleado';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-empleado',
  templateUrl: './actualizar-empleado.component.html',
  styleUrls: ['./actualizar-empleado.component.css']
})
export class ActualizarEmpleadoComponent {
  
  id!: number;
  empleado: Empleado = new Empleado();
  constructor(private empleadoService: EmpleadoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.empleadoService.getEmpleadoById(this.id).subscribe(data => {
      this.empleado = data;
    }, error => console.log(error));
  }
  onSubmit(){
    this.empleadoService.actualizarEmpleado(this.id, this.empleado).subscribe( data =>{
      this.goToEmpleadoList();
    }
    , error => console.log(error));
  }

  goToEmpleadoList(){
    this.router.navigate(['/empleados']);
  }

}
