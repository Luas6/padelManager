import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from './empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private baseURL = 'http://localhost:8080/api/v1/empleados';

  constructor( private httpClient : HttpClient) { }

  getListaEmpleados(): Observable<Empleado[]>{
    return this.httpClient.get<Empleado[]>(this.baseURL);
  }

  crearEmpleado(empleado: Empleado): Observable<Empleado[]>{
    return this.httpClient.post<Empleado[]>(this.baseURL,empleado);
  }
}
