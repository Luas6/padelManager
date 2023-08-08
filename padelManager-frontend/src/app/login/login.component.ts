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
  onSubmit() {
    console.log(this.usuario);
    this.loginUsuario();
  }
  loginUsuario() {
    this.usuarioService.loginUsuario(this.usuario).subscribe(response => {
      console.log(response);
      const jwtToken = response.headers.get('Authorization');

      // Almacenar el token en el local storage para su uso posterior
      localStorage.setItem('jwtToken', jwtToken);

      // Redireccionar a una página después del inicio de sesión exitoso
      this.router.navigate(['']);

    },
      error => console.log(error));
  }
}
