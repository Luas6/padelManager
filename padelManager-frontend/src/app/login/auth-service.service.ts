import { Injectable } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { RespuestaLogin } from '../usuarios/respuesta-login';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loginURL = 'http://localhost:8080/api/v1/login';
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoggedInChange$ = this.isLoggedIn$.asObservable();

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    return this.isLoggedIn$.value;
  }

  setLoggedIn(value: boolean) {
    this.isLoggedIn$.next(value);
  }


  loginUsuario(usuario: Usuario): Observable<RespuestaLogin> {
    this.setLoggedIn(true);
    //console.log("Hola"+this.isLoggedIn())
    return this.http.post<RespuestaLogin>(this.loginURL, usuario);
  }

  /*isLoggedIn(): boolean {
    return localStorage.getItem('jwtToken') !== null;
  }*/

  logout(): void {
    this.setLoggedIn(false);
    localStorage.removeItem('jwtToken');
  }
}
