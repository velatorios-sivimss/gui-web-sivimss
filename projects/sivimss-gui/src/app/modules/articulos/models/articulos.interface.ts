export interface Articulos {
id?: number;
categoria?: string;
tipoDeArticulo?: string;
tipoDeMaterial?: string;
tamanio?: string;
clasificacionDeProducto?: string;
modeloDeArticulo?: string;
descripcionDeProducto?: string;
largo?: string;
ancho?: string;
alto?: string;
estatus?: boolean;
claveSAT?:string;
partidaPresupuestal?:string;
cuentaClave?:string;
cuentaContable?:string;
}

export interface ConfirmacionServicio {
  estatus?: boolean;
  origen?: string;
}





