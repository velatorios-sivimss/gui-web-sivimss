import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {

  opcionSeleccionada:any = null;

  elementos:any[]=[
    {
      icono:'imagen-icono-operacion-sivimss.svg',
      titulo:'Administrar',
      elementos:[
        {
          icono:'',
          titulo:'Usuarios',
          path:'usuarios'
        },
        {
          icono:'',
          titulo:'Roles',
          path:'roles'
        },
        {
          icono:'',
          titulo:'Capillas',
          path:'capillas'
        },
        {
          icono:'',
          titulo:'Artículos',
          path:'artículos',
        },
        {
          icono:'',
          titulo:'Servicios',
          path:'servicios'
        },
        {
          icono:'',
          titulo:'Velatorios',
          path:'velatorios'
        },
        {
          activo:true,
          icono:'',
          titulo:'Proveedores',
          path:'proveedores'
        },
        {
          icono:'',
          titulo:'Contratantes',
          path:'contratantes'
        },
        {
          icono:'',
          titulo:'Vehicular',
          path:'inventario-vehicular'
        },
        {
          icono:'',
          titulo:'Panteones',
          path:'panteones'
        },
        {
          icono:'',
          titulo:'Salas',
          path:'salas'
        },
        {
          icono:'',
          titulo:'Traslados',
          path:'traslados'
        },
        {
          icono:'',
          titulo:'Inhábiles',
          path:'inhabiles'
        },
        {
          icono:'',
          titulo:'Interno',
          path:'interno'
        },
        {
          icono:'',
          titulo:'Paquetes',
          path:'paquetes'
        },
        {
          icono:'',
          titulo:'Ordenes de entrada',
          path:'ordenes-de-entrada'
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
