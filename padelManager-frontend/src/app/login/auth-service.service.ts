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

  constructor(private http: HttpClient) {
    this.checkTokenInLocalStorage();
  }

  private checkTokenInLocalStorage() {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      this.setLoggedIn(true);
    }
  }

  isLoggedIn() {
    return this.isLoggedIn$.value;
  }

  isLoggedInAsObservable() {
    return this.isLoggedIn$.asObservable();
  }

  setLoggedIn(value: boolean) {
    this.isLoggedIn$.next(value);
  }


  loginUsuario(usuario: Usuario): Observable<RespuestaLogin> {
    return this.http.post<RespuestaLogin>(this.loginURL, usuario);
  }

  /*isLoggedIn(): boolean {
    return localStorage.getItem('jwtToken') !== null;
  }*/

  logout(): void {
    this.setLoggedIn(false);
    localStorage.removeItem('jwtToken');
  }

  login(): void {
    this.setLoggedIn(true);
  }
}
