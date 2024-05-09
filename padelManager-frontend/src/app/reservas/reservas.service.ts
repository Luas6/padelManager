import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from './reserva';
import { PistaDetallada } from './form-reservar/formulario-reservas/PistaDetallada';
import { PistaAbierta } from './form-reservar/formulario-reservas/PistaAbierta';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private reservasURL: string;
  private reservasUsuarioURL: string;

  private disponiblesURL: string;
  private detalladasURL: string;
  private abiertasURL: string;

  constructor(private httpClient : HttpClient) {
  this.reservasURL = `${environment.BACKEND_URL}/reservas`;
  this.reservasUsuarioURL = `${environment.BACKEND_URL}/reservas/usuario`;

  this.disponiblesURL = `${environment.BACKEND_URL}/disponibles`;
  this.detalladasURL = `${environment.BACKEND_URL}/detalladas`;
  this.abiertasURL = `${environment.BACKEND_URL}/abiertas`;
  }
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
