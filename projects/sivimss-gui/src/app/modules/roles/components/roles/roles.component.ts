import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {BreadcrumbService} from "../../../../shared/breadcrumb/services/breadcrumb.service";
import {LazyLoadEvent} from "primeng-lts/api";
import {DIEZ_ELEMENTOS_POR_PAGINA} from "../../../../utils/constantes";
import {OverlayPanel} from "primeng-lts/overlaypanel";
import { USUARIOS_BREADCRUMB } from '../../../usuarios/constants/breadcrumb';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {Rol} from "../../models/rol.interface";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { CATALOGOS } from '../../../usuarios/constants/catalogos_dummies';
import { RolService } from '../../services/rol.service';
import {Catalogo} from 'projects/sivimss-gui/src/app/models/catalogos.interface';
import { FiltrosRol } from '../../models/filtrosRol.interface';
import {VerDetalleRolComponent} from "../ver-detalle-rol/ver-detalle-rol.component";
import {RespuestaModalRol} from "../../models/respuestaModal.interface";

type SolicitudEstatus = Pick<Rol, "idRol">; 
const MAX_WIDTH: string = "876px";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  providers: [DialogService]
})
export class RolesComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;
  paginacionConFiltrado: boolean = false;
  filtroForm!: FormGroup;

  opciones: TipoDropdown[] = CATALOGOS;
  catRol: any[] = [];
  roles: Rol[] = [];
  rolSeleccionado!: Rol;
  mostrarModalDetalleRol: boolean = false;
  creacionRef!: DynamicDialogRef

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private rolService: RolService,
    private alertaService: AlertaService,
    private breadcrumbService: BreadcrumbService,
    public dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    debugger
    this.breadcrumbService.actualizar(USUARIOS_BREADCRUMB);
    const roles = this.route.snapshot.data["respuesta"].datos;
    this.catRol = roles.map((rol: Catalogo) => ({label: rol.des_rol, value: rol.id})) || [];
    this.inicializarFiltroForm();
  }

  seleccionarPaginacion(): void {
    if (this.paginacionConFiltrado) {
      this.paginarConFiltros();
    } else {
      this.paginar();
    }
  }

  paginar(): void {
    debugger
    this.rolService.buscarPorPagina(this.numPaginaActual, this.cantElementosPorPagina).subscribe(
      (respuesta) => {
        this.roles = respuesta!.datos.content;
        this.totalElementos = respuesta!.datos.totalElements;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
    this.totalElementos = this.roles.length;
  }

  paginarConFiltros(): void {
    const filtros = this.crearSolicitudFiltros();
    const solicitudFiltros = JSON.stringify(filtros);
    this.rolService.buscarPorFiltros(solicitudFiltros, this.numPaginaActual, this.totalElementos).subscribe(
      (respuesta) => {
        this.roles = respuesta!.datos.content;
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

  crearSolicitudFiltros(): FiltrosRol {
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

  cambiarEstatus(idRol: number): void {
    const id: SolicitudEstatus = {idRol}
    const solicitudId = JSON.stringify(id);
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


  inicializarFiltroForm():void {
    this.filtroForm = this.formBuilder.group({
      nivel: [{value: null, disabled: false}],
      velatorio: [{value: null, disabled: false}],
      delegacion: [{value: null, disabled: false}],
      estatus: [{value: null, disabled: false}],
      alta: [{value: false, disabled: false}],
      baja: [{value: false, disabled: false}],
      aprobacion: [{value: false, disabled: false}],
      consulta: [{value: false, disabled: false}],
      modificar: [{value: false, disabled: false}],
      imprimir: [{value: false, disabled: false}]
    });
  }


  abrirPanel(event: MouseEvent, rolSeleccionado: Rol):void {
    this.rolSeleccionado = rolSeleccionado;
    this.overlayPanel.toggle(event);
  }

  abrirModalDetalleRol(rol: Rol): void {
    this.rolSeleccionado = rol;
    const DETALLE_CONFIG: DynamicDialogConfig = {
      header: "Ver detalle",
      width: MAX_WIDTH,
      data: rol
    }
    this.creacionRef = this.dialogService.open(VerDetalleRolComponent, DETALLE_CONFIG);
    this.creacionRef.onClose.subscribe((respuesta: RespuestaModalRol) => this.procesarRespuestaModal(respuesta));
  }

  procesarRespuestaModal(respuesta: RespuestaModalRol = {}): void {
    if (respuesta.actualizar) {
      this.limpiar();
    }
    if (respuesta.mensaje) {
      this.alertaService.mostrar(TipoAlerta.Exito, respuesta.mensaje);
    }
  }



}
