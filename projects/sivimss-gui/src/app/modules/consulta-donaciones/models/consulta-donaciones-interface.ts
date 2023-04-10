export interface ConsultaDonacionesInterface {
  velatorio?: string;
  tipo?: string;
  modeloAtaud?: string;
  numeroInventario?: number;
  fechaDonacion?: string;
  donadoPor?: string;
  nombreDonador?: string;
}

export interface AtaudDonado {
  idAtaud?: number;
  descAtaud?: string;
  modelo?: string;
  material?: string;
  noInventario?: string;
}

// export interface RespuestaAtaud {
//   ataud?: AtaudDonado,
//   estatus?: boolean
// }

export interface FinadoInterface {
  nombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
}

export interface RespuestaFinado {
  finado?: FinadoInterface,
  estatus?: boolean;
}
