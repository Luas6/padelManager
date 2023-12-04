import { Component, ViewChild } from '@angular/core';
import { Reserva } from '../../reserva';
import { ReservasService } from '../../reservas.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-formulario-reservas',
  templateUrl: './formulario-reservas.component.html',
  styleUrls: ['./formulario-reservas.component.css']
})
export class FormularioReservasComponent {
  reserva: Reserva = new Reserva();

  horasDisponibles: string[] = [];
  pistasDisponibles: number[] = [];
  
  reservasForm: FormGroup;
  errorMensaje: string = '';

  private modalRef: any;
  @ViewChild('exitoModal') exitoModal: any;


  constructor(private reservasService: ReservasService,
    private router: Router,
    private modalService: NgbModal,
    ) {
      this.reservasForm = new FormGroup({
        hora: new FormControl({value: '', disabled: true}, [Validators.required]),
        pista: new FormControl({value: '', disabled: true}, [Validators.required]),
        fecha: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
        idUsuario: new FormControl(null)
      });
      this.loadHorasDisponibles();
    }

  ngOnInit(): void {
  }

  onFechaChange(increment: number) {
    const currentDate = this.reservasForm.get('fecha')?.value;
    if (currentDate) {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + increment);
        this.reservasForm.get('fecha')?.setValue(newDate.toISOString().split('T')[0]);
        this.loadHorasDisponibles();
    }
}

  loadHorasDisponibles() {
    const fechaSeleccionada = this.reservasForm.get('fecha')?.value;

    if (fechaSeleccionada) {
      this.reservasService.getHorasDisponibles(fechaSeleccionada).subscribe((horas: string[]) => {
        console.log("Horas"+horas);        
        this.horasDisponibles = horas;
        this.reservasForm.get('hora')?.enable();
      });
    }
  }

  loadPistasDisponibles() {
    const fechaSeleccionada = this.reservasForm.get('fecha')?.value;
    const horaSeleccionada = this.reservasForm.get('hora')?.value;

    if (fechaSeleccionada && horaSeleccionada) {
      this.reservasService.getPistasDisponibles(fechaSeleccionada, horaSeleccionada).subscribe((pistas: number[]) => {
        this.pistasDisponibles = pistas;
        this.reservasForm.get('pista')?.enable();
      });
    }
  }

  saveReserva() {
    console.log(this.reservasForm.value);
    this.reservasService.crearReserva(this.reservasForm.value).subscribe(data => {
    },
      error => console.log(error));
  }

  private comprobarIdSesion() {
    const idSesion = localStorage.getItem('idSesion');
    if (idSesion) {
      console.log(idSesion)
      this.reservasForm.controls['idUsuario'].setValue(parseInt(idSesion, 10));
      return true;
    }
    return false;
  }

  goToHome() {
    this.router.navigate(['']);
  }

  open(content: any) {
    this.modalRef = this.modalService.open(content);
  }

  close() {
    this.modalRef.close();
    this.goToHome();
  }
  
  onSubmit() {
    if (this.reservasForm.valid) {
      if(this.comprobarIdSesion()){
        this.saveReserva();
        this.open(this.exitoModal);
      }else{
        this.errorMensaje = "Asegurese de iniciar sesión";
      }
    } else {
      this.errorMensaje = "Revisa los campos del formulario";
    }

  }

  
}
