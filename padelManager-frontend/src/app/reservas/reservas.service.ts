import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from './reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private reservasURL = 'http://localhost:8080/api/v1/reservas';
  private reservasUsuarioURL = 'http://localhost:8080/api/v1/reservas/usuario';

  private disponiblesURL = 'http://localhost:8080/api/v1/disponibles';

  constructor(private httpClient : HttpClient) { }
/*
  getListaReservas(): Observable<Reserva[]>{
    return this.httpClient.get<Reserva[]>(this.reservasURL);
  }*/

  getReservaUsuario(id: number): Observable<Reserva[]>{
    return this.httpClient.get<Reserva[]>(`${this.reservasUsuarioURL}/${id}`);
  }

  crearReserva(reserva: Reserva): Observable<Reserva[]>{
    return this.httpClient.post<Reserva[]>(this.reservasURL,reserva);
  }

  getHorasDisponibles(fecha: string): Observable<string[]>{
    return this.httpClient.get<string[]>(`${this.disponiblesURL}/${fecha}`);
  }

  getPistasDisponibles(fecha: string, hora: string): Observable<number[]>{
    return this.httpClient.get<number[]>(`${this.disponiblesURL}/${fecha}/${hora}`);
  }
}
