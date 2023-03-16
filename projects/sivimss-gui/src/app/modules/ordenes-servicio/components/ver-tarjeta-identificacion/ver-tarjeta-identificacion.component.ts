import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng-lts/dynamicdialog";

@Component({
  selector: 'app-ver-tarjeta-identificacion',
  templateUrl: './ver-tarjeta-identificacion.component.html',
  styleUrls: ['./ver-tarjeta-identificacion.component.scss']
})
export class VerTarjetaIdentificacionComponent implements OnInit {

  dummy!: string;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
  }

  ngOnInit(): void {
    //Obtener la info que le pasa el componente que abre el modal
    this.dummy = this.config.data.dummy;
  }

  cerrarModal() {
    //Pasar info a quien abrio el modal en caso de que se requiera. Se esta pasando un boolean de ejemplo
    this.ref.close(true);
  }

}
