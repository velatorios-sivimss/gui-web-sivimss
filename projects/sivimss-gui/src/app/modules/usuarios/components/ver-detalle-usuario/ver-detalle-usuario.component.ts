import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../models/usuario.interface";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UsuarioService} from "../../services/usuario.service";
import {RespuestaModalUsuario} from "../../models/respuestaModal.interface";

type SolicitudEstatus = Pick<Usuario, "id">
type DetalleUsuario = Required<Usuario> & { oficina: string, rol: string, delegacion: string, velatorio: string };

@Component({
  selector: 'app-ver-detalle-usuario',
  templateUrl: './ver-detalle-usuario.component.html',
  styleUrls: ['./ver-detalle-usuario.component.scss']
})
export class VerDetalleUsuarioComponent implements OnInit {

  usuarioSeleccionado!: DetalleUsuario;
  id!: number;

  constructor(
    private alertaService: AlertaService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private usuarioService: UsuarioService
  ) {
  }

  ngOnInit(): void {
    this.id = this.config.data;
    this.obtenerUsuario(this.id);
  }

  cambiarEstatus(): void {
    const idUsuario: SolicitudEstatus = {id: this.id}
    const mensaje = 'Cambio de estatus realizado';
    this.usuarioService.cambiarEstatus(idUsuario).subscribe(
      () => {
        const respuesta: RespuestaModalUsuario = {actualizar: true, mensaje};
        this.ref.close(respuesta);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
  }

  abrirModalModificarUsuario(): void {
    const respuesta: RespuestaModalUsuario = {modificar: true};
    this.ref.close(respuesta);
  }

  obtenerUsuario(id: number): void {
    this.usuarioService.buscarPorId(id).subscribe(
      (respuesta) => {
        this.usuarioSeleccionado = respuesta.datos[0];
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
  }
}
