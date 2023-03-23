import {Funcionalidad} from "./funcionalidad.interface";

export interface Rol {
  id: number;
  des: string;
  nivel: string;
  fCreacion: string;
  estatus: boolean;
  delegacion: string;
  velatorio: string;
  funcionalidades: Funcionalidad[];
}
