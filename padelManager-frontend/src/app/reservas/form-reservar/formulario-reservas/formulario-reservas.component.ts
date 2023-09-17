import { Component } from '@angular/core';
import { Reserva } from '../../reserva';
import { ReservasService } from '../../reservas.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-formulario-reservas',
  templateUrl: './formulario-reservas.component.html',
  styleUrls: ['./formulario-reservas.component.css']
})
export class FormularioReservasComponent {
  reserva: Reserva= new Reserva();
  constructor(private reservasService: ReservasService,
    private router: Router){}

    ngOnInit(): void {
    }

    saveReserva(){
      this.reservasService.crearReserva(this.reserva).subscribe( data =>{
        console.log(data);
        this.goToHome();
      },
      error => console.log(error));
    }

    goToHome(){
      this.router.navigate(['']);
    }

    onSubmit(reservaForm: NgForm) {
      if (reservaForm.valid) {
          // El formulario es válido, realiza la acción
          console.log(this.reserva);
          this.saveReserva();
      }
  }
}
