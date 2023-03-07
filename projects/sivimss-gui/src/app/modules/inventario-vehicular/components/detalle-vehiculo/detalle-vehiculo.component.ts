import { Component, Input, OnInit } from '@angular/core';
import { Vehiculo } from '../../models/vehiculo.interface';

@Component({
  selector: 'app-detalle-vehiculo',
  templateUrl: './detalle-vehiculo.component.html',
  styleUrls: ['./detalle-vehiculo.component.scss']
})
export class DetalleVehiculoComponent implements OnInit {

  @Input() vehiculoSeleccionado: Vehiculo;

  constructor() { }

  ngOnInit(): void { }

}
