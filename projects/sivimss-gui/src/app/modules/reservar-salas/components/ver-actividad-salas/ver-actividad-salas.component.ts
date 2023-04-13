import { Component, OnInit } from '@angular/core';
import * as moment from "moment/moment";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";

@Component({
  selector: 'app-ver-actividad-salas',
  templateUrl: './ver-actividad-salas.component.html',
  styleUrls: ['./ver-actividad-salas.component.scss']
})
export class VerActividadSalasComponent implements OnInit {

  fechaSeleccionada: string = "";

  constructor(
    private readonly ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.fechaSeleccionada = moment(this.config.data).format("DD/MM/yyyy");
  }

  aceptar(): void {
    this.ref.close();
  }

}
