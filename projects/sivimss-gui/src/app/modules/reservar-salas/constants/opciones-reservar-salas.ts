export interface SelectButtonOptions {
    icon: string
    justify: string,
    route: string
}

export const OpcionesReservarSalas: SelectButtonOptions[] = [
    {
        icon: 'pi pi-align-left',
        justify: 'Center',
        route: 'salas',
    },
    {
        icon: 'icon-calendario',
        justify: 'Center',
        route: 'calendario'
    },
]
