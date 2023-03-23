import {Funcionalidad} from "./funcionalidad.interface";

export interface Rol {
  idRol: number;
  desRol: string;
  nivel: string;
  fCreacion: string;
  estatus: boolean;
  delegacion: string;
  velatorio: string;
  funcionalidades: Funcionalidad[];
}
