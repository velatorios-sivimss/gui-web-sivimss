import { Articulo } from "./articulos.interface";
import { Servicio } from "./servicios.interface";

export interface Paquete {
  id?: string;
  nombrePaquete?: string;
  descripcion?: string;
  estatus?: boolean;
  costoInicial?: string;
  costo?: string;
  precio?: string;
  region?: string;
  clave?: string;
  servicios?: Servicio[];
  articulos?: Articulo[];
}
