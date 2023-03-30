import {Component, OnInit} from '@angular/core';
import {Rol} from "../../models/rol.interface";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {HttpErrorResponse} from "@angular/common/http";
import {RolService} from "../../services/rol.service";
import {RespuestaModalRol} from "../../models/respuestaModal.interface";
import {ModificarRolComponent} from "../modificar-rol/modificar-rol.component";

type SolicitudEstatus = Pick<Rol, "id">
const MAX_WIDTH: string = "876px";

@Component({
  selector: 'app-ver-detalle-rol',
  templateUrl: './ver-detalle-rol.component.html',
  styleUrls: ['./ver-detalle-rol.component.scss']
})
export class VerDetalleRolComponent implements OnInit {

  rolSeleccionado!: Rol;
  detalleRef!: DynamicDialogRef;
  modificacionRef!: DynamicDialogRef;

  constructor(
    private alertaService: AlertaService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private rolService: RolService,
    public dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    debugger
    this.rolSeleccionado = this.config.data;
   // this.obtenerRol(this.rolSeleccionado);
  }

  cambiarEstatus(rol: Rol): void {
    debugger
    const rolEstatus = {
      "idRol": rol.idRol,
      "estatusRol": rol.estatus ? 1 : 0 
    }
   // const idUsuario: SolicitudEstatus = {id}
    const solicitudId = JSON.stringify(rolEstatus);
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

  abrirModalModificarRol(): void {
    const MODIFICAR_CONFIG: DynamicDialogConfig = {
      header: "Modificar rol",
      width: MAX_WIDTH,
      data: this.rolSeleccionado
    }
    this.modificacionRef = this.dialogService.open(ModificarRolComponent, MODIFICAR_CONFIG);
    this.modificacionRef.onClose.subscribe((respuesta: RespuestaModalRol) => this.procesarRespuestaModal(respuesta));
  }

  obtenerRol(id: number): void {
    debugger
    this.rolService.buscarPorId(id).subscribe(
      (respuesta) => {
        this.rolSeleccionado = respuesta.datos[0];
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
  }

  procesarRespuestaModal(respuesta: RespuestaModalRol = {}): void {
    if (respuesta.mensaje) {
      this.alertaService.mostrar(TipoAlerta.Exito, respuesta.mensaje);
    }
    if (respuesta.modificar) {
      this.abrirModalModificarRol();
    }
  }

  ngOnDestroy(): void {
    if (this.detalleRef) {
      this.detalleRef.destroy();
    }
    if (this.modificacionRef) {
      this.modificacionRef.destroy();
    }
  }

}
