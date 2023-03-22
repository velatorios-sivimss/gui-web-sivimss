import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../models/usuario.interface";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UsuarioService} from "../../services/usuario.service";
import {RespuestaModalUsuario} from "../../models/respuestaModal.interface";

type SolicitudEstatus = Pick<Usuario, "id">

@Component({
  selector: 'app-ver-detalle-usuario',
  templateUrl: './ver-detalle-usuario.component.html',
  styleUrls: ['./ver-detalle-usuario.component.scss']
})
export class VerDetalleUsuarioComponent implements OnInit {

  usuarioSeleccionado!: Usuario;

  constructor(
    private alertaService: AlertaService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private usuarioService: UsuarioService
  ) {
  }

  ngOnInit(): void {
    this.usuarioSeleccionado = this.config.data;
  }

  cambiarEstatus(id: number): void {
    const idUsuario: SolicitudEstatus = {id}
    const solicitudId = JSON.stringify(idUsuario);
    this.usuarioService.cambiarEstatus(solicitudId).subscribe(
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
    const respuesta: RespuestaModalUsuario = {};
    this.ref.close(respuesta);
  }

  abrirModalModificarUsuario(): void {
    const respuesta: RespuestaModalUsuario = { modificar: true };
    this.ref.close(respuesta);
  }
}
