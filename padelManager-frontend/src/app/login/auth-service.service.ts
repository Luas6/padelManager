import { Injectable } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { RespuestaLogin } from '../usuarios/respuesta-login';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loginURL = 'http://localhost:8080/api/v1/login';

  constructor(private http: HttpClient) { }

  loginUsuario(usuario: Usuario): Observable<RespuestaLogin> {
    return this.http.post<RespuestaLogin>(this.loginURL, usuario);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('jwtToken') !== null;
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }
}
