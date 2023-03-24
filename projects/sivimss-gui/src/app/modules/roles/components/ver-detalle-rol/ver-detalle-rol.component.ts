import {Component, OnInit} from '@angular/core';
import {Rol} from "../../models/rol.interface";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {HttpErrorResponse} from "@angular/common/http";
import {RolService} from "../../services/rol.service";
import {RespuestaModalRol} from "../../models/respuestaModal.interface";

type SolicitudEstatus = Pick<Rol, "id">

@Component({
  selector: 'app-ver-detalle-rol',
  templateUrl: './ver-detalle-rol.component.html',
  styleUrls: ['./ver-detalle-rol.component.scss']
})
export class VerDetalleRolComponent implements OnInit {

  rolSeleccionado!: Rol;

  constructor(
    private alertaService: AlertaService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private rolService: RolService
  ) {
  }

  ngOnInit(): void {
    this.rolSeleccionado = this.config.data;
  }

  cambiarEstatus(id: number): void {
    debugger
    const idUsuario: SolicitudEstatus = {id}
    const solicitudId = JSON.stringify(idUsuario);
    this.rolService.cambiarEstatus(solicitudId).subscribe(
      () => {
        this.alertaService.mostrar(TipoAlerta.Exito, 'Cambio de estatus realizado');
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
  }

  aceptar(): void {
    const respuesta: RespuestaModalRol = {};
    this.ref.close(respuesta);
  }

  abrirModalModificarUsuario(): void {
    const respuesta: RespuestaModalRol = { modificar: true };
    this.ref.close(respuesta);
  }


}
