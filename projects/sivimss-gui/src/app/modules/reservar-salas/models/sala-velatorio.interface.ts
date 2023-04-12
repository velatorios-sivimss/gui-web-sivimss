export interface SalaVelatorio {
    id: number,
    nombre: string,
    estatus: "Ocupada" | "Disponible" | "En Mantenimiento",
    hora_entrada: string
}