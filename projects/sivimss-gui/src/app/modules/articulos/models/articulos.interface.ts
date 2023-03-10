export interface Articulos {
  id?: number;
  servicio?: string;
  descripcionServicio?: string;
  tipoServicio?: number;
  descTipoServicio?: string;
  partidaPresupuestal?: number;
  descPartidaPresupuestal?: string;
  cuentaContable?: number;
  descCuentaContable?: string;
  observaciones?: string;
  estatus?: boolean;
  claveSAT?:string;
}

export interface ConfirmacionServicio {
  estatus?: boolean;
  origen?: string;
}





