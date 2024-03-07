import { Component, ViewChild } from '@angular/core';
import { Reserva } from '../../reserva';
import { ReservasService } from '../../reservas.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PistaDetallada } from './PistaDetallada';
import { PistaAbierta } from './PistaAbierta';

@Component({
  selector: 'app-formulario-reservas',
  templateUrl: './formulario-reservas.component.html',
  styleUrls: ['./formulario-reservas.component.css']
})
export class FormularioReservasComponent {
  reserva: Reserva = new Reserva();

  horasDisponibles: string[] = [];
  pistasDetalladas: PistaDetallada[] = [];
  pistaSeleccionada: number | null = null;
  pistaAbierta: PistaAbierta = new PistaAbierta();
  reservasForm: FormGroup;
  errorMensaje: string = '';

  private modalRef: any;
  @ViewChild('exitoModal') exitoModal: any;
  @ViewChild('reservaModal') reservaModal: any;
  @ViewChild('abiertaModal') abiertaModal: any;


  constructor(private reservasService: ReservasService,
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.reservasForm = new FormGroup({
      hora: new FormControl({ value: '', disabled: true }, [Validators.required]),
      pista: new FormControl({ value: '', disabled: true }, [Validators.required]),
      fecha: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
      usuarios: new FormControl(null),
      abierta: new FormControl(false)
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
        console.log("Horas" + horas);
        this.horasDisponibles = horas;
        this.reservasForm.get('hora')?.enable();
      });
    }

    if(this.reservasForm.get('hora')?.value){
      this.loadPistasDetalladas();
    }
  }

  loadPistasDetalladas() {
    const fechaSeleccionada = this.reservasForm.get('fecha')?.value;
    const horaSeleccionada = this.reservasForm.get('hora')?.value;

    if (fechaSeleccionada && horaSeleccionada) {
      this.reservasService.getPistasDetalladas(fechaSeleccionada, horaSeleccionada).subscribe(
        (pistas: PistaDetallada[]) => {
          this.pistasDetalladas = pistas;
          this.reservasForm.get('pista')?.enable();
          // Obtener el ID del usuario de la sesión
          const idSesion = localStorage.getItem('idSesion');
          if (idSesion) {
            const idUsuario = parseInt(idSesion, 10);

            // Iterar sobre las pistas y establecer la propiedad pista_propia
            this.pistasDetalladas.forEach(pista => {
              pista.pista_propia = pista.usuarios.some(usuario => usuario.id === idUsuario);
            });
          }
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  seleccionarPista(numeroPista: number) {
    this.reservasForm.get('pista')?.setValue(numeroPista);
    this.pistaSeleccionada = numeroPista;
    this.open(this.reservaModal);
  }
  
  seleccionarPistaAbierta(numeroPista: number) {
    this.pistaSeleccionada = numeroPista;
    this.open(this.abiertaModal);
  }

  unirseAPista(){
    const idSesion = localStorage.getItem('idSesion');
    if(idSesion!=null && this.pistaSeleccionada!=null){
    this.pistaAbierta.idReserva = this.pistaSeleccionada;
    
      this.pistaAbierta.idUsuario = +idSesion;
      this.reservasService.unirseAReserva(this.pistaAbierta).subscribe(data => {
      },
        error => console.log(error));
    }else{
      this.errorMensaje = "Asegurese de iniciar sesión";
    }
  }

  abrirPista() {
    this.reservasForm.get('abierta')?.setValue(true);
    this.onSubmit();
  }
  reservarPistaCompleta() {
    this.reservasForm.get('abierta')?.setValue(false);
    this.onSubmit();
  }

  saveReserva() {
    console.log(this.reservasForm.value);
    this.reservasService.crearReserva(this.reservasForm.value).subscribe(data => {
    },
      error => console.log(error));
  }

//Recuperar JWT
  private comprobarIdSesion() {
    const idSesion = localStorage.getItem('idSesion');
    if (idSesion) {
      console.log(idSesion);
      const usuario = { "id": parseInt(idSesion, 10) };
      this.reservasForm.controls['usuarios'].setValue([usuario]);
      return true;
    }
    return false;
  }

  //Routing
  goToHome() {
    this.router.navigate(['']);
  }

  //Funciones para los modales
  open(content: any) {
    this.modalRef = this.modalService.open(content);
  }

  close() {
    this.modalRef.close();
  }

  onSubmit() {
    if (this.reservasForm.valid) {
      console.log("FormSubmit")
      if (this.comprobarIdSesion()) {
        this.saveReserva();
        this.close();
        this.open(this.exitoModal);
      } else {
        this.errorMensaje = "Asegurese de iniciar sesión";
      }
    } else {
      this.errorMensaje = "Revisa los campos del formulario";
    }
  }
}
