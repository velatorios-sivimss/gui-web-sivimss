export interface Articulos {
  idArticulo?: number;
  categoriaArticulo?: string;
  idCategoriaArticulo?: number;
  idTipoArticulo?: number;
  tipoArticulo?: string;
  tipoMaterial?: string;
  idTipoMaterial?: number;
  idTamanio?: number;
  tamanio?: string;
  idClasificacionProducto?: number;
  clasificacionProducto?: string;
  modeloArticulo?: string;
  desArticulo?: string;
  largo?: string;
  ancho?: string;
  alto?: string;
  estatus?: boolean;
  claveSAT?: string;
  partPresupuestal?: string;
  // cuentaClave?: string;
  // cuentaContable?: string;
  idCuentaPartPresupuestal?: number;
  idPartPresupuestal?: number;
  numCuentaPartPresupuestal?: number;

  productoServicios?: string;
  idProductosServicios?: number;
  


  //
  // idArticulo?: number;
  // partPresupuestal?: string;
  // idPartPresupuestal?: number;


  // idCuentaPartPresupuestal?: number;
  // productoServicios?: string;
  // SAT
  // numCuentaPartPresupuestal?: number;
  // idProductosServicios?: number;
}

export interface ConfirmacionServicio {
  estatus?: boolean;
  origen?: string;
}





