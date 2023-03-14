// TODO: Borrar en implementación
import {TipoDropdown} from "../../../models/tipo-dropdown";
import {Velatorio} from "../modelos/velatorio.interface";

export const CATALOGOS_DUMMIES: TipoDropdown[] = [
  {
    value: 'Opcion 1',
    label: 'Opcion 1'
  },
  {
    value: 'Opcion 2',
    label: 'Opcion 2'
  },
  {
    value: 'Opcion 3',
    label: 'Opcion 3'
  },
];

export const REGISTROS_VELATORIOS: Velatorio[] = [
  {
    id: 'D34SD56',
    nombre: 'No. 01 Doctores',
    administrador: 'Luis Garcia',
    responsableSanitario: 'Rafael Garcia',
    salasCremacion: 3,
    salasEmbalsamamiento: 3,
    capillasVelacion: 4,
    asignacion: 'Opcion 1',
    direccionCalle: 'Prueba',
    numeroExterior: 'SN',
    codigoPostal: '87463',
    colonia: 'Prueba',
    estado: 'Ciudad de México',
    municipio: 'Almoloya',
    telefono: 5683934834,
    estatus: true
  }, {
    id: 'D33SD57',
    nombre: 'No. 02 Hidalgo',
    administrador: 'Juan Perez',
    responsableSanitario: 'Mateo Perez',
    salasCremacion: 3,
    salasEmbalsamamiento: 3,
    capillasVelacion: 4,
    asignacion: 'Opcion 1',
    direccionCalle: 'Prueba',
    numeroExterior: 'SN',
    codigoPostal: '87463',
    colonia: 'Prueba',
    estado: 'Ciudad de México',
    municipio: 'Almoloya',
    telefono: 5683934834,
    estatus: false
  }
];
