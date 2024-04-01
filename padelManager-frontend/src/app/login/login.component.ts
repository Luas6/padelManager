import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { Router } from '@angular/router';
import { AuthService } from './auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  mensajeError: string = '';
  isLoggedIn$: Observable<boolean>;
  usuario: Usuario = new Usuario();

  constructor(
    private authService: AuthService,
    private router: Router)
    { 
      this.isLoggedIn$ = authService.isLoggedInAsObservable();
      this.loginForm = new FormGroup({
        correo: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        contrasena: new FormControl('', [Validators.required]),
      });
    }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedInAsObservable();
  }

  logout(): void {
    console.log("Logout")
    this.authService.logout(); // Lógica para cerrar la sesión en tu servicio de autenticación
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
    this.authService.loginUsuario(this.loginForm.value).subscribe(
      (data) => {
        console.log(data);
        if (data.token && data.id) {
          // Almacenar el token en el local storage para su uso posterior
          localStorage.setItem('jwtToken', data.token);
          localStorage.setItem('idSesion', (data.id).toString());
          this.authService.login();
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
        } else if (error.status === 400) {
          this.mensajeError = 'Revisa los campos obligatorios y que todo tenga el formato correcto';
        }else{
          this.mensajeError = 'Error al hacer login. Inténtalo de nuevo más tarde';
        }
      }
    );
  }
}
