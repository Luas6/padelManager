import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from './reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private reservasURL = 'http://localhost:8080/api/v1/reservas';

  constructor(private httpClient : HttpClient) { }

  getListaReservas(): Observable<Reserva[]>{
    return this.httpClient.get<Reserva[]>(this.reservasURL);
  }

  crearReserva(reserva: Reserva): Observable<Reserva[]>{
    return this.httpClient.post<Reserva[]>(this.reservasURL,reserva);
  }
}
