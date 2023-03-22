import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DIEZ_ELEMENTOS_POR_PAGINA} from "../../../../utils/constantes";
import {OverlayPanel} from "primeng-lts/overlaypanel";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {BreadcrumbService} from "../../../../shared/breadcrumb/services/breadcrumb.service";

import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Usuario} from '../../models/usuario.interface';
import {UsuarioService} from '../../services/usuario.service';
import {HttpRespuesta} from '../../../../models/http-respuesta.interface';

import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {CATALOGOS} from "../../constants/catalogos_dummies";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {AgregarUsuarioComponent} from "../agregar-usuario/agregar-usuario.component";
import {USUARIOS_BREADCRUMB} from "../../constants/breadcrumb";
import {FiltrosUsuario} from "../../models/filtrosUsuario.interface";
import {VerDetalleUsuarioComponent} from "../ver-detalle-usuario/ver-detalle-usuario.component";
import {RespuestaModalUsuario} from "../../models/respuestaModal.interface";
import {ModificarUsuarioComponent} from "../modificar-usuario/modificar-usuario.component";

type SolicitudEstatus = Pick<Usuario, "id">;
const MAX_WIDTH: string = "876px";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [DialogService]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;

  opciones: TipoDropdown[] = CATALOGOS;

  usuarios: Usuario[] = [];
  usuarioSeleccionado!: Usuario;

  filtroForm!: FormGroup;

  paginacionConFiltrado: boolean = false;

  creacionRef!: DynamicDialogRef
  detalleRef!: DynamicDialogRef;
  modificacionRef!: DynamicDialogRef;

  constructor(
    // private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private alertaService: AlertaService,
    private breadcrumbService: BreadcrumbService,
    public dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.breadcrumbService.actualizar(USUARIOS_BREADCRUMB);
    this.inicializarFiltroForm();
  }

  abrirPanel(event: MouseEvent, usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
    this.overlayPanel.toggle(event);
  }

  abrirModalAgregarUsuario(): void {
    const CREACION_CONFIG: DynamicDialogConfig = {
      header: "Ver detalle",
      width: MAX_WIDTH,
    }
    this.creacionRef = this.dialogService.open(AgregarUsuarioComponent, CREACION_CONFIG);
    this.creacionRef.onClose.subscribe((respuesta: RespuestaModalUsuario) => this.procesarRespuestaModal(respuesta));
  }

  abrirModalModificarUsuario(): void {
    const MODIFICAR_CONFIG: DynamicDialogConfig = {
      header: "Modificar usuario",
      width: MAX_WIDTH,
      data: this.usuarioSeleccionado
    }
    this.modificacionRef = this.dialogService.open(ModificarUsuarioComponent, MODIFICAR_CONFIG);
    this.modificacionRef.onClose.subscribe((respuesta: RespuestaModalUsuario) => this.procesarRespuestaModal(respuesta));
  }

  abrirModalDetalleUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
    const DETALLE_CONFIG: DynamicDialogConfig = {
      header: "Ver detalle",
      width: MAX_WIDTH,
      data: usuario
    }
    this.creacionRef = this.dialogService.open(VerDetalleUsuarioComponent, DETALLE_CONFIG);
    this.creacionRef.onClose.subscribe((respuesta: RespuestaModalUsuario) => this.procesarRespuestaModal(respuesta));
  }

  inicializarFiltroForm() {
    this.filtroForm = this.formBuilder.group({
      nivel: [{value: null, disabled: false}, Validators.required],
      velatorio: [{value: null, disabled: false}],
      delegacion: [{value: null, disabled: false}],
      rol: [{value: null, disabled: false}]
    });
  }

  seleccionarPaginacion(): void {
    if (this.paginacionConFiltrado) {
      this.paginarConFiltros();
    } else {
      this.paginar();
    }
  }

  paginar(): void {
    // this.numPaginaActual = Math.floor((first || 0) / (rows || 1));
    this.usuarioService.buscarPorPagina(this.numPaginaActual, this.cantElementosPorPagina).subscribe(
      (respuesta) => {
        this.usuarios = respuesta!.datos.content;
        this.totalElementos = respuesta!.datos.totalElements;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
  }

  paginarConFiltros(): void {
    const filtros = this.crearSolicitudFiltros();
    const solicitudFiltros = JSON.stringify(filtros);
    this.usuarioService.buscarPorFiltros(solicitudFiltros, this.numPaginaActual, this.totalElementos).subscribe(
      (respuesta) => {
        this.usuarios = respuesta!.datos.content;
        this.totalElementos = respuesta!.datos.totalElements;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
  }

  buscar(): void {
    this.numPaginaActual = 0;
    this.paginacionConFiltrado = true;
    this.paginarConFiltros();
  }

  crearSolicitudFiltros(): FiltrosUsuario {
    return {
      idOficina: this.filtroForm.get("nivel")?.value,
      idVelatorio: this.filtroForm.get("velatorio")?.value,
      idRol: this.filtroForm.get("rol")?.value,
      idDelegacion: this.filtroForm.get("delegacion")?.value
    };
  }

  limpiar(): void {
    this.paginacionConFiltrado = false;
    this.filtroForm.reset();
    this.numPaginaActual = 0;
    this.paginar();
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

  procesarRespuestaModal(respuesta: RespuestaModalUsuario = {}): void {
    if (respuesta.actualizar) {
      this.limpiar();
    }
    if (respuesta.mensaje) {
      this.alertaService.mostrar(TipoAlerta.Exito, respuesta.mensaje);
    }
    if (respuesta.modificar) {
      this.abrirModalModificarUsuario();
    }
  }

  get f() {
    return this.filtroForm.controls;
  }

  ngOnDestroy(): void {
    if (this.creacionRef) {
      this.creacionRef.destroy();
    }
    if (this.detalleRef) {
      this.detalleRef.destroy();
    }
    if (this.modificacionRef) {
      this.modificacionRef.destroy();
    }
  }
}
