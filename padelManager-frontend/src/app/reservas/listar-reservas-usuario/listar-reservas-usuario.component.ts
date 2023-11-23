import { Component } from '@angular/core';
import { ReservasService } from '../reservas.service';
import { Reserva } from '../reserva';

@Component({
  selector: 'app-listar-reservas-usuario',
  templateUrl: './listar-reservas-usuario.component.html',
  styleUrls: ['./listar-reservas-usuario.component.css']
})
export class ListarReservasUsuarioComponent {
  reservas: Reserva[] = [];

  constructor(private reservasService: ReservasService) { }

  ngOnInit() {
    // Llama a la función para cargar las reservas del usuario
    this.cargarReservasUsuario();
  }


  private cargarReservasUsuario() {
    const idSesion = localStorage.getItem('idSesion');
    if (idSesion) {
      // Parse a numero
      const idUsuario = +idSesion;
      this.reservasService.getReservaUsuario(idUsuario).subscribe(
        (reservas: Reserva[]) => {
          this.reservas = reservas;
        },
        (error) => {
          console.error('Error al obtener las reservas del usuario', error);
        }
      );
    }
  }
}
