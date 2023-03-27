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
