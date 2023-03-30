import {Funcionalidad} from "./funcionalidad.interface";

export interface Rol {
  id: number;
  idRol: number;
  desRol: string;
  nivel: string;
  fCreacion: string;
  estatus: boolean;
  delegacion: string;
  velatorio: string;
  desNivelOficina: string;
  funcionalidades: Funcionalidad[];
}
