import {Funcionalidad} from "./funcionalidad.interface";

export interface Rol {
  id: number;
  nombre: string;
  nivel: string;
  fechaCreacion: string;
  estatus: boolean;
  delegacion: string;
  velatorio: string;
  funcionalidades: Funcionalidad[];
}
