import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms'; // Importa FormGroup y FormControl
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})

export class CrearUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;
  mensajeError: string = '';
  formError = false;
  private modalRef: any;
  @ViewChild('errorModal') errorModal: any;

  constructor(
    private usuarioService: UsuarioService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      contrasena: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  saveUsuario() {
    this.usuarioService.crearUsuario(this.usuarioForm.value).subscribe(
      (data) => {
      this.goToUsuarioList();
    },
    (error: any) => {
      if (error.status === 409) {
         this.mensajeError = 'Correo ya en uso';
       } else if (error.status === 400) {
         this.mensajeError = 'Revisa los campos obligatorios y que todo tenga el formato correcto';
       } else {
         this.mensajeError = 'Error al crear usuario. Inténtalo de nuevo más tarde';
       }
     }
    );
  }

  goToUsuarioList() {
    this.router.navigate(['/login-usuario']);
  }

  open(content: any) {
    this.modalRef = this.modalService.open(content);
  }

  close() {
    this.modalRef.close();
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      this.saveUsuario();
    } else {
      this.formError = true;
      this.open(this.errorModal);
    }
  }
}
