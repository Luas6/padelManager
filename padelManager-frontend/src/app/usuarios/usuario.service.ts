import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseURL = 'http://localhost:8080/api/v1/usuarios';

  constructor( private httpClient : HttpClient) { }

  getListaUsuarios(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(this.baseURL);
  }
  getUsuarioById(id: number): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.baseURL}/${id}`);
  }
  crearUsuario(usuario: Usuario): Observable<Usuario[]>{
    return this.httpClient.post<Usuario[]>(this.baseURL,usuario);
  }
  actualizarUsuario(id: number, employee: Usuario): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, employee);
  }
  borrarUsuario(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
