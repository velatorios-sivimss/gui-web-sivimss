import { TipoDropdown } from "../models/tipo-dropdown";

export function diferenciaUTC(fecha: string): number {
  const objetoFecha = new Date(fecha);
  return objetoFecha.setMinutes(objetoFecha.getMinutes() + objetoFecha.getTimezoneOffset());
}

export function validarAlMenosUnCampoConValor(values: object) {
  if (!Object.values(values).find(value => value !== '' && value !== null)) {
    return false;
  }
  return true;
}

export function mapearArregloTipoDropdown(arr: [] = [], label: string, value: string): TipoDropdown[] {
  return arr.map(obj => ({
      label: obj[label],
      value: obj[value]
  }));
}