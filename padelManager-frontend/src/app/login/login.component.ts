import { Component } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';
import { Router } from '@angular/router';
import { RespuestaLogin } from '../usuarios/respuesta-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService,
    private router: Router) { }
  onSubmit() {
    //console.log(this.usuario);
    this.loginUsuario();
  }
  loginUsuario() {
    this.usuarioService.loginUsuario(this.usuario).subscribe(data => {
      console.log(data);
      console.log(data.token);
      if (data.token) {
        // Almacenar el token en el local storage para su uso posterior
        localStorage.setItem('jwtToken', data.token);

        // Redireccionar a una página después del inicio de sesión exitoso
        this.router.navigate(['']);
      } else {
        console.log('Response status not OK:', data);
      }

    },
      error => console.log(error));
  }
}
