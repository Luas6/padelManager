import { Injectable } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { RespuestaLogin } from '../usuarios/respuesta-login';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loginUrl: string;
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoggedInChange$ = this.isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {
    this.loginUrl = `${environment.BACKEND_URL}/login`;
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
    return this.http.post<RespuestaLogin>(this.loginUrl, usuario);
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
