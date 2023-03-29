import {Component, OnInit} from '@angular/core';
import {Velatorio} from "../../models/velatorio.interface";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {VelatorioService} from "../../services/velatorio.service";

interface SolicitudEstatus {
  id: number
}
@Component({
  selector: 'app-activar-velatorio',
  templateUrl: './activar-velatorio.component.html',
  styleUrls: ['./activar-velatorio.component.scss']
})
export class ActivarVelatorioComponent implements OnInit {

  velatorioSeleccionado!: Velatorio;
  title!: string;

  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              private velatorioService: VelatorioService
              ) {
    this.velatorioSeleccionado = this.config.data;
    this.title = this.velatorioSeleccionado.estatus ? 'Desactivar' : 'Activar';
  }

  ngOnInit(): void { }

  cancelar(): void {
    this.ref.close()
  }

  cambiarEstatus(): void {
    const estatus: SolicitudEstatus = this.obtenerSolicitudEstatus();
    const solicitudEstatus = JSON.stringify(estatus);
    this.velatorioService.cambiarEstatus(solicitudEstatus).subscribe(
    () => {},
    () => {}
    );
  }

  obtenerSolicitudEstatus(): SolicitudEstatus {
    return {
      id: +this.velatorioSeleccionado.idVelatorio
    }
  }
}
