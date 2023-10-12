import { Component } from '@angular/core';
import { Reserva } from '../../reserva';
import { ReservasService } from '../../reservas.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-reservas',
  templateUrl: './formulario-reservas.component.html',
  styleUrls: ['./formulario-reservas.component.css']
})
export class FormularioReservasComponent {
  reserva: Reserva = new Reserva();
  listaDeReservasExistente: Reserva[] = [];
  reservasForm: FormGroup;
  errorMensaje: string = '';

  constructor(private reservasService: ReservasService,
    private router: Router) {
      this.reservasForm = new FormGroup({
        hora: new FormControl('', [Validators.required]),
        pista: new FormControl('', [Validators.required]),
        fecha: new FormControl('', [Validators.required]),
      });
    }

  ngOnInit(): void {
    this.getReservasExistente();
  }

  saveReserva() {
    this.reservasService.crearReserva(this.reservasForm.value).subscribe(data => {
    },
      error => console.log(error));
  }

  goToHome() {
    this.router.navigate(['']);
  }

  onSubmit() {
    if (this.reservasForm.valid) {
      this.saveReserva();
      this.goToHome();
    } else {
      this.errorMensaje = "La fecha y hora seleccionadas ya están reservadas.";
    }

  }

  getReservasExistente() {
    this.reservasService.getListaReservas().subscribe((reservas: Reserva[]) => {
      this.listaDeReservasExistente = reservas;
    });
  }
}
