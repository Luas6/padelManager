export class Reserva {
    id!: number;
    fecha?: string;
    hora?: string;
    pista?: string;
    idUsuarios?: number[] | null[];
    abierta?: boolean;
}
