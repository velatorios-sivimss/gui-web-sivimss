import {Component, OnInit} from '@angular/core';
import {TipoDropdown} from '../../../../models/tipo-dropdown';
import {MENU_SALAS} from '../../constants/menu-salas';
import {SalaVelatorio} from '../../models/sala-velatorio.interface';
import {DIEZ_ELEMENTOS_POR_PAGINA} from 'projects/sivimss-gui/src/app/utils/constantes';
import {DialogService} from "primeng-lts/dynamicdialog";
import {RegistrarEntradaComponent} from "../registrar-entrada/registrar-entrada.component";
import {RegistrarSalidaComponent} from "../registrar-salida/registrar-salida.component";

@Component({
  selector: 'app-listado-salas',
  templateUrl: './listado-salas.component.html',
  styleUrls: ['./listado-salas.component.scss'],
  providers: [DialogService]
})
export class ListadoSalasComponent implements OnInit {

  velatorios: TipoDropdown[] = [];
  menu: string[] = MENU_SALAS;
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

  salasEmbalsamamiento: SalaVelatorio[] = [{
    id: 1,
    nombre: "Juan Valdez",
    estatus: "Ocupada",
    hora_entrada: "13:01"
  }, {
    id: 2,
    nombre: "Ignacio Morales",
    estatus: "Disponible",
    hora_entrada: ""
  }];

  constructor(public dialogService: DialogService) {
  }

  ngOnInit(): void {
  }

  registrarActividad(sala: SalaVelatorio): void {
    if (sala.hora_entrada) {
      this.registrarSalida();
      return;
    }
    this.registrarEntrada();
  }

  registrarEntrada(): void {
    this.dialogService.open(RegistrarEntradaComponent, {
      header: 'Registrar Entrada',
      width: '920px'
    });
  }


  private registrarSalida(): void {
    this.dialogService.open(RegistrarSalidaComponent, {
      header: 'Registrar Salida',
      width: '920px'
    });
  }
}
