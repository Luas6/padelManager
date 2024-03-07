import { Usuario } from "src/app/usuarios/usuario";

export interface PistaDetallada {
  numero: number;
  disponible: boolean;
  huecos: number;
  abierta: boolean;
  reserva_id: number | null;
  usuarios: Usuario[];
  pista_propia: boolean;
}