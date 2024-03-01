import { Usuario } from "../usuarios/usuario";

export class Reserva {
    id!: number;
    fecha?: string;
    hora?: string;
    pista?: string;
    usuarios?: Usuario[];
    abierta?: boolean;
}
