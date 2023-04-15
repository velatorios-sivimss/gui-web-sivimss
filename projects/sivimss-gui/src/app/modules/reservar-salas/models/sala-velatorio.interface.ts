export interface SalaVelatorio {
    idSala?: number,
    nombreSala?: string,
    estadoSala?: "Ocupada" | "Disponible" | "En Mantenimiento",
    indDisponibilidad?: number
    horaEntrada?: number
    idRegistroBitacora?: number
}

export interface SalaVelatorioConsultaDia {
  nombreSala?: string,
  nombreFinado?: string,
  horaEntrada?: string,
  nombreContratante?: string,
  folio?: string,
  idSala?: number,
  horaSalida?: string,
  idRegistro?: number
}
