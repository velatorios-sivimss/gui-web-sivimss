export interface EntradaSala {
  idSala?: number;
  idOds?: number;
  idTipoOcupacion?: number;
  fechaEntrada?: string;
  horaEntrada?: string;
  cantidadGasInicial?: number;
  descripcionMantenimiento?: string;
}

export interface SalidaSala {
  idSala?: number,
  fechaSalida?: string,
  horaSalida?: string,
  cantidadGasFinal?: number,
  idRegistro?: number
}
