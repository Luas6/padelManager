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
  private checkloginURL: string;
  private checkadminURL: string;
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoggedInChange$ = this.isLoggedIn$.asObservable();
  isAdminChange$ = this.isAdmin$.asObservable();

  constructor(private http: HttpClient) {
    this.loginUrl = `${environment.BACKEND_URL}/login`;
    this.checkloginURL = `${environment.BACKEND_URL}/checklogin`;
    this.checkadminURL = `${environment.BACKEND_URL}/checkadmin`;
  }

  public async checkTokenInLocalStorage() {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      try {
        await this.checkloginUsuario().toPromise();
        this.login();
        try {
          const data = await this.checkAdminUsuario().toPromise();
          this.setAdmin(true);
        } catch (error) {
          this.setAdmin(false);
        }
      } catch (error) {
        this.logout();
      }
    } else {
      this.logout();
    }
  }
  

  loginUsuario(usuario: Usuario): Observable<RespuestaLogin> {
    return this.http.post<RespuestaLogin>(this.loginUrl, usuario);
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
