export interface registrarEntrada {
  idVelatorio?: number;
  fechaEntrada?: string;
  horaEntrada?: string;
  registroEntrada?: string;
  nombreFinado?: string;
  nombreContratante?: string;
  folioODS?: string;
  idCapilla?:number;
  idOrdenServicio?:number;

}

export interface registrarSalida {
  idCapilla?:number;
  idOrdenServicio?:number;
  idDisponibilidad?:number;
  fechaSalida?:number;
  horaSalida?:number;

}


export interface CalendarioCapillas {
  id?: number
  title?: string;
  date?: string;
  textColor?: string;
  color?: string;
  borderColor?: string;
  start?: string;
}
//  { id:"1",
//  title: 'sala no 45',
//  date: '2023-04-18',
//  textColor:"#217A6B",
//  color:"#fff",
//  borderColor: '#217A6B' },
