import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})

export class CrearUsuarioComponent implements OnInit{

  usuario: Usuario = new Usuario();
  formError = false;
  private modalRef: any;
  @ViewChild('errorModal') errorModal: any;

  constructor(private usuarioService: UsuarioService,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
  }
  saveUsuario(){
    this.usuarioService.crearUsuario(this.usuario).subscribe( data =>{
      console.log(data);
      this.goToUsuarioList();
    },
    error => console.log(error));
  }

  goToUsuarioList(){
    this.router.navigate(['/login-usuario']);
  }
  
  open(content: any) {
    this.modalRef = this.modalService.open(content);
  }

  close() {
    this.modalRef.close();
  }

  onSubmit(usuarioForm: NgForm) {
    if (usuarioForm.valid) {
        // El formulario es válido, realiza la acción
        console.log(this.usuario);
        this.saveUsuario();
    }else{
      this.formError = true;
      this.open(this.errorModal);
    }
}
}
