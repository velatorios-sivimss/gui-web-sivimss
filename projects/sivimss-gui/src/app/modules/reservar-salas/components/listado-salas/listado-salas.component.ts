import { Component, OnInit } from '@angular/core';
import { TipoDropdown } from '../../../../models/tipo-dropdown';
import { MenuItem } from 'primeng-lts/api';
import { MENU_SALAS } from '../../constants/menu-salas';
import { SalaVelatorio } from '../../models/sala-velatorio.interface';
import { DIEZ_ELEMENTOS_POR_PAGINA } from 'projects/sivimss-gui/src/app/utils/constantes';

@Component({
  selector: 'app-listado-salas',
  templateUrl: './listado-salas.component.html',
  styleUrls: ['./listado-salas.component.scss']
})
export class ListadoSalasComponent implements OnInit {

  velatorios: TipoDropdown[] = [];
  menu: MenuItem[] = MENU_SALAS;
  activeItem: MenuItem =  MENU_SALAS[0];
  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;



  salasCremacion: SalaVelatorio[] = [{
    id: 1,
    nombre: "Jose Maria Morelos",
    estatus: "Ocupada",
    hora_entrada: "13:01"
  }, {
    id: 2,
    nombre: "Miguel Hidalgo",
    estatus: "Disponible",
    hora_entrada: ""
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
