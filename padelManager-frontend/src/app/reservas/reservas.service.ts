import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from './reserva';
import { PistaDetallada } from './form-reservar/formulario-reservas/PistaDetallada';
import { PistaAbierta } from './form-reservar/formulario-reservas/PistaAbierta';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private reservasURL = 'http://localhost:8080/api/v1/reservas';
  private reservasUsuarioURL = 'http://localhost:8080/api/v1/reservas/usuario';

  private disponiblesURL = 'http://localhost:8080/api/v1/disponibles';
  private detalladasURL = 'http://localhost:8080/api/v1/detalladas';
  private abiertasURL = 'http://localhost:8080/api/v1/abiertas';

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

  getPistasDetalladas(fecha: string, hora: string): Observable<PistaDetallada[]>{
    return this.httpClient.get<PistaDetallada[]>(`${this.detalladasURL}/${fecha}/${hora}`);
  }

  unirseAReserva(pista: PistaAbierta): Observable<Reserva[]>{
    return this.httpClient.post<Reserva[]>(this.abiertasURL,pista);
  }
}
