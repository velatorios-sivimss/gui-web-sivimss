export function diferenciaUTC(fecha: string): number {
  const objetoFecha = new Date(fecha);
  return objetoFecha.setMinutes(objetoFecha.getMinutes() + objetoFecha.getTimezoneOffset());
}
