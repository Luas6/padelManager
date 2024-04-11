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
  private checkloginURL = 'http://localhost:8080/api/v1/checklogin';
  private checkadminURL = 'http://localhost:8080/api/v1/checkadmin';
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoggedInChange$ = this.isLoggedIn$.asObservable();
  isAdminChange$ = this.isAdmin$.asObservable();

  constructor(private http: HttpClient) {
    this.checkTokenInLocalStorage();
  }

  private checkTokenInLocalStorage() {
    const jwtToken = localStorage.getItem('jwtToken');
    //console.log("Function: checkTokenInLocalStorage"+jwtToken)
    if (jwtToken) {
      this.checkloginUsuario().subscribe(
        (data) => {
          this.login();
          this.checkAdmin();
        },
        (error: any) => {
          this.logout();
        }
      );
    }else{
      this.logout();
    }
  }

  private checkAdmin(){
    this.checkAdminUsuario().subscribe(
      (data) => {
        this.setAdmin(true);
      }
    );

  }

  loginUsuario(usuario: Usuario): Observable<RespuestaLogin> {
    return this.http.post<RespuestaLogin>(this.loginURL, usuario);
  }

  checkloginUsuario() {
    return this.http.get(this.checkloginURL);
  }

  checkAdminUsuario() {
    return this.http.get(this.checkadminURL);
  }


  logout(): void {
    this.setLoggedIn(false);
    this.setAdmin(false);
    localStorage.removeItem('jwtToken');
  }

  login(): void {
    this.setLoggedIn(true);
  }

  /* Setters Observables*/
  
  isLoggedIn() {
    return this.isLoggedIn$.value;
  }

  isLoggedInAsObservable() {
    return this.isLoggedIn$.asObservable();
  }

  setLoggedIn(value: boolean) {
    this.isLoggedIn$.next(value);
  }

  isAdmin() {
    return this.isAdmin$.value;
  }

  isAdminAsObservable() {
    return this.isAdmin$.asObservable();
  }

  setAdmin(value: boolean) {
    this.isAdmin$.next(value);
  }

}
