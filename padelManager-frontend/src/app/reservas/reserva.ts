export class Reserva {
    id!: number;
    fecha?: string;
    hora?: string;
    pista?: string;
    usuarios?: number[] | null[];
    abierta?: boolean;
}
