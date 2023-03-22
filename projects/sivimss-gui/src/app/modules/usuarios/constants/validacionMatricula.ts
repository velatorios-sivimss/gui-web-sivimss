import {TipoAlerta} from "../../../shared/alerta/services/alerta.service";

export const OPCIONES_MATRICULA: number[] = [0, 1]
export const MENSAJES_MATRICULA = new Map();

MENSAJES_MATRICULA.set(0, { mensaje: "Matricula valida", tipo: TipoAlerta.Exito})
MENSAJES_MATRICULA.set(1, { mensaje: "Matricula duplicada", tipo: TipoAlerta.Error})
