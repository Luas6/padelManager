import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { Router } from '@angular/router';
import { AuthService } from './auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  mensajeError: string = '';
  isLoggedIn: boolean = false;
  usuario: Usuario = new Usuario();

  constructor(
    private authService: AuthService,
    private router: Router)
    { 
      this.loginForm = new FormGroup({
        correo: new FormControl('', [Validators.required]),
        contrasena: new FormControl('', [Validators.required]),
      });
    }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log(this.isLoggedIn) // Verifica si la sesión está iniciada
  }

  logout(): void {
    console.log("Logout")
    this.authService.logout(); // Lógica para cerrar la sesión en tu servicio de autenticación
    this.isLoggedIn = false;
  }
  
  onSubmit() {
    //console.log(this.usuario);
    if(this.loginForm.valid){
      this.loginUsuario();
    } else {
      this.mensajeError = 'Usuario o Contraseña no válidos';
    }

  }

  loginUsuario() {
    this.authService.loginUsuario(this.loginForm.value).subscribe(data => {
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
    (error: any) => {
      if (error.status === 401) {
        this.mensajeError = 'Contraseña incorrecta';
      } else if (error.status === 404) {
        this.mensajeError = 'Usuario no encontrado';
      }else{
        this.mensajeError = 'Error al hacer login. Inténtalo de nuevo más tarde';
      }
    });
  }
}
