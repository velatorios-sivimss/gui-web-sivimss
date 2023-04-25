import {VerificacionInicio} from "./verificacion-inicio.interface";

export interface RegistroVerificacionInterface {
  idMttoVehicular: number | null,
  idMttoestado: number,
  idVehiculo: number,
  idDelegacion: number,
  idVelatorio: number,
  idEstatus: number,
  verificacionInicio: VerificacionInicio,
  solicitud: number | null,
  registro: number | null
}
