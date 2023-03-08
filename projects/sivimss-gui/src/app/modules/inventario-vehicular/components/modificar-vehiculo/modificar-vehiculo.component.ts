import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng-lts/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { MENU_STEPPER } from '../../constants/menu-stepper';
import { Vehiculo } from '../../models/vehiculo.interface';

@Component({
  selector: 'app-modificar-vehiculo',
  templateUrl: './modificar-vehiculo.component.html',
  styleUrls: ['./modificar-vehiculo.component.scss']
})
export class ModificarVehiculoComponent implements OnInit {

  vehiculoSeleccionado!: Vehiculo;

  menuStep: MenuItem[] = MENU_STEPPER;
  indice: number = 0;

  constructor(public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {
    this.vehiculoSeleccionado = this.config.data;
  }

  ngOnInit(): void { }

}
