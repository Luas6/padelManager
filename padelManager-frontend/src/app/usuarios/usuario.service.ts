import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuariosURL = 'http://localhost:8080/api/v1/usuarios';
  private loginURL = 'http://localhost:8080/api/v1/login';

  constructor( private httpClient : HttpClient) { }

  getListaUsuarios(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(this.usuariosURL);
  }
  getUsuarioById(id: number): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.usuariosURL}/${id}`);
  }
  crearUsuario(usuario: Usuario): Observable<Usuario[]>{
    return this.httpClient.post<Usuario[]>(this.usuariosURL,usuario);
  }
  actualizarUsuario(id: number, employee: Usuario): Observable<Object>{
    return this.httpClient.put(`${this.usuariosURL}/${id}`, employee);
  }
  borrarUsuario(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.usuariosURL}/${id}`);
  }
  loginUsuario(usuario: Usuario): Observable<Usuario[]>{
    return this.httpClient.post<Usuario[]>(this.loginURL,usuario);
  }

}
