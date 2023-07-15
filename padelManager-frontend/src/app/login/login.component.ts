import { Component } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService,
    private router: Router) { }


    
  onSubmit(){
    console.log(this.usuario);
    this.loginUsuario();
  }
  loginUsuario() {
    this.usuarioService.loginUsuario(this.usuario).subscribe( data =>{
      console.log(data);
      //Manejar Sesión
    },
    error => console.log(error));
  }
}
