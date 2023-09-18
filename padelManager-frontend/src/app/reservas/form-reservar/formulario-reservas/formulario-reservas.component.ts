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
  reserva: Reserva = new Reserva();
  listaDeReservasExistente: Reserva[] = [];
  errorMensaje: string = '';

  constructor(private reservasService: ReservasService,
    private router: Router) { }

  ngOnInit(): void {
    this.getReservasExistente();
  }

  saveReserva() {
    this.reservasService.crearReserva(this.reserva).subscribe(data => {
      console.log(data);
      this.goToHome();
    },
      error => console.log(error));
  }

  goToHome() {
    this.router.navigate(['']);
  }

  onSubmit(reservaForm: NgForm) {
    if (reservaForm.valid) {
      if (this.isFechaHoraDisponible(this.reserva.fecha, this.reserva.hora, this.reserva.pista, this.listaDeReservasExistente)) {
        // La fecha y hora están disponibles, realiza la reserva
        console.log(this.reserva);
        this.saveReserva();
      } else {
        // La fecha y hora ya están reservadas, muestra un mensaje de error
        this.errorMensaje = "La fecha y hora seleccionadas ya están reservadas.";
        console.log("La fecha y hora seleccionadas ya están reservadas.");
        // También puedes desactivar el botón de reserva o mostrar una alerta al usuario.
      }
    }
  }

  isFechaHoraDisponible(fecha: string | undefined, hora: string | undefined, pista: string | undefined, reservas: Reserva[]): boolean {
    // Verifica si hay alguna reserva con la misma fecha y hora
    return !reservas.some(reserva => reserva.fecha === fecha && reserva.hora === hora && reserva.pista === pista);
  }

  getReservasExistente() {
    this.reservasService.getListaReservas().subscribe((reservas: Reserva[]) => {
      this.listaDeReservasExistente = reservas;
    });
  }
}
