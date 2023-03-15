import {Component, OnInit} from '@angular/core';
import {Velatorio} from "../../modelos/velatorio.interface";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";

@Component({
  selector: 'app-activar-velatorio',
  templateUrl: './activar-velatorio.component.html',
  styleUrls: ['./activar-velatorio.component.scss']
})
export class ActivarVelatorioComponent implements OnInit {

  velatorioSeleccionado!: Velatorio;
  title!: string;

  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) {
    this.velatorioSeleccionado = this.config.data;
    this.title = this.velatorioSeleccionado.estado ? 'Desactivar' : 'Activar';
  }

  ngOnInit(): void {
  }

  cancelar(): void {
    this.ref.close()
  }

  cambiarEstatus(): void {
  }
}
