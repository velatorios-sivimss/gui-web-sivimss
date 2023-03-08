import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Route, Router } from "@angular/router";

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {

  opcionAnteriorSeleccionada:any = null;
  opcionSeleccionada: any = null;

  menu: any[] = [
    {
      icono: 'imagen-icono-operacion-sivimss.svg',
      texto: 'Operación SIVIMSS',
      activo: false,
      subtitulos: [
        {
          icono: '',
          texto: 'Órdenes de servicio',
          ruta: 'ordenes-de-servicio',
          activo: false
        },
        {
          icono: '',
          texto: 'Órdenes de subrogación',
          ruta: 'ordenes-de-subrogacion',
          activo: false
        },
        {
          icono: '',
          texto: 'Pagos',
          ruta: 'pagos',
          activo: false
        },
      ]
    },
    {
      icono: 'imagen-icono-operacion-sivimss.svg',
      texto: 'Administrar',
      activo: false,
      subtitulos: [
        {
          icono: '',
          texto: 'Usuarios',
          ruta: 'usuarios',
          activo: false
        },
        {
          icono: '',
          texto: 'Roles',
          ruta: 'roles',
          activo: false
        },
        {
          icono: '',
          texto: 'Capillas',
          ruta: 'capillas',
          activo: false
        },
        {
          icono: '',
          texto: 'Artículos',
          ruta: 'artículos',
          activo: false
        },
        {
          icono: '',
          texto: 'Servicios',
          ruta: 'servicios',
          activo: false
        },
        {
          icono: '',
          texto: 'Velatorios',
          ruta: 'velatorios',
          activo: false
        },
        {
          icono: '',
          texto: 'Proveedores',
          ruta: 'proveedores',
          activo: false
        },
        {
          icono: '',
          texto: 'Contratantes',
          ruta: 'contratantes',
          activo: false
        },
        {
          icono: '',
          texto: 'Vehicular',
          ruta: 'inventario-vehicular',
          activo: false
        },
        {
          icono: '',
          texto: 'Panteones',
          ruta: 'panteones',
          activo: false
        },
        {
          icono: '',
          texto: 'Salas',
          ruta: 'salas',
          activo: false
        },
        {
          icono: '',
          texto: 'Traslados',
          ruta: 'traslados',
          activo: false
        },
        {
          icono: '',
          texto: 'Inhábiles',
          ruta: 'inhabiles',
          activo: false
        },
        {
          icono: '',
          texto: 'Interno',
          ruta: 'interno',
          activo: false
        },
        {
          icono: '',
          texto: 'Paquetes',
          ruta: 'paquetes',
          activo: false
        },
        {
          icono: '',
          texto: 'Ordenes de entrada',
          ruta: 'ordenes-de-entrada',
          activo: false
        }
      ]
    }
  ]

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  navegar(opcionSeleccionada: any) {
    if(this.opcionAnteriorSeleccionada){
      this.opcionAnteriorSeleccionada.activo = false;
    }
    opcionSeleccionada.activo = true;
    this.router.navigate([opcionSeleccionada.ruta]);
    this.opcionAnteriorSeleccionada = opcionSeleccionada;
  }

}
