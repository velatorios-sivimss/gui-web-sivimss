import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { Paquete } from '../../models/paquetes.interface';

@Component({
  selector: 'app-ver-detalle-paquete',
  templateUrl: './ver-detalle-paquete.component.html',
  styleUrls: ['./ver-detalle-paquete.component.scss']
})
export class VerDetallePaqueteComponent implements OnInit {

  paqueteSeleccionado!: Paquete;

  constructor(public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {
    console.log(this.config.data)
    this.paqueteSeleccionado = this.config.data;
  }

  ngOnInit(): void { }

  cerrarDialogo() {
    this.ref.close({
      respuesta: 'Ok'
    });
  }

}
