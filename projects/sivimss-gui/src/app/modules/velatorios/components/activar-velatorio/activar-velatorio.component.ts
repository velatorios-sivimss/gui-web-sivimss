import {Component, OnInit} from '@angular/core';
import {Velatorio} from "../../models/velatorio.interface";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {VelatorioService} from "../../services/velatorio.service";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {HttpErrorResponse} from "@angular/common/http";
import {RespuestaModalUsuario} from "../../../usuarios/models/respuestaModal.interface";

interface SolicitudEstatus {
  idVelatorio: number,
  indEstatus: number
}

@Component({
  selector: 'app-activar-velatorio',
  templateUrl: './activar-velatorio.component.html',
  styleUrls: ['./activar-velatorio.component.scss']
})
export class ActivarVelatorioComponent implements OnInit {

  velatorioSeleccionado!: Velatorio;
  title!: string;

  constructor(private alertaService: AlertaService,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              private velatorioService: VelatorioService
  ) {
    this.velatorioSeleccionado = this.config.data;
    this.title = this.velatorioSeleccionado.estatus ? 'Desactivar' : 'Activar';
  }

  ngOnInit(): void {
  }

  cancelar(): void {
    this.ref.close()
  }

  cambiarEstatus(): void {
    const estatus: SolicitudEstatus = this.obtenerSolicitudEstatus();
    const respuesta: RespuestaModalUsuario = {mensaje: "Cambio de estatus realizado", actualizar: true}
    this.velatorioService.cambiarEstatus(estatus).subscribe(
      () => {
        this.ref.close(respuesta);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
  }

  obtenerSolicitudEstatus(): SolicitudEstatus {
    return {
      idVelatorio: +this.velatorioSeleccionado.idVelatorio,
      indEstatus: this.velatorioSeleccionado.estatus ? 0 : 1
    }
  }
}
