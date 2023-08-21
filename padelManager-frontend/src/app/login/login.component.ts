import { Component } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { Router } from '@angular/router';
import { AuthService } from './auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mensajeError: string = '';
  isLoggedIn: boolean = false;
  usuario: Usuario = new Usuario();

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn(); // Verifica si la sesión está iniciada
  }

  logout(): void {
    this.authService.logout(); // Lógica para cerrar la sesión en tu servicio de autenticación
    this.isLoggedIn = false;
  }
  
  onSubmit() {
    //console.log(this.usuario);
    this.loginUsuario();
  }

  loginUsuario() {
    this.authService.loginUsuario(this.usuario).subscribe(data => {
      //console.log(data);
      console.log(data.token);
      if (data.token) {
        // Almacenar el token en el local storage para su uso posterior
        localStorage.setItem('jwtToken', data.token);
        //console.log(this.authService.isLoggedIn());
        // Redireccionar a una página después del inicio de sesión exitoso
        this.router.navigate(['']);
      } else {
        this.mensajeError = 'Usuario o Contraseña incorrectos';
        console.log('Response status not OK:', data);
      }

    },
    error => {
      // Error en la solicitud
      this.mensajeError = 'Error en la solicitud. Por favor, intenta nuevamente.';
      console.log(error);
    });
  }
}
