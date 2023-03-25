import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbService} from "../../../../shared/breadcrumb/services/breadcrumb.service";
import {VELATORIOS_BREADCRUMB} from "../../constants/breadcrumb";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {AgregarVelatorioComponent} from "../agregar-velatorio/agregar-velatorio.component";
import {DIEZ_ELEMENTOS_POR_PAGINA} from "../../../../utils/constantes";
import {Velatorio} from "../../models/velatorio.interface";
import {OverlayPanel} from "primeng-lts/overlaypanel";
import {ActivarVelatorioComponent} from "../activar-velatorio/activar-velatorio.component";
import {ModificarVelatorioComponent} from "../modificar-velatorio/modificar-velatorio.component";
import {FiltrosVelatorio} from "../../models/filtrosVelatorio.interface";
import {RespuestaModaVelatorio} from "../../models/respuestaModal.interface";
import {VelatorioService} from "../../services/velatorio.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {RespuestaModalUsuario} from "../../../usuarios/models/respuestaModal.interface";

const MAX_WIDTH: string = "876px";

@Component({
  selector: 'app-velatorios',
  templateUrl: './velatorios.component.html',
  styleUrls: ['./velatorios.component.scss'],
  providers: [DialogService]
})
export class VelatoriosComponent implements OnInit, OnDestroy {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  filtroForm!: FormGroup;

  niveles: TipoDropdown[] = [];
  velatorios: TipoDropdown[] = [];

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;

  listaVelatorios: Velatorio[] = [];
  velatorioSeleccionado!: Velatorio;

  creacionRef!: DynamicDialogRef;
  modificarRef!: DynamicDialogRef;
  activarRef!: DynamicDialogRef;

  paginacionConFiltrado: boolean = false;

  constructor(private alertaService: AlertaService,
              private breadCrumbService: BreadcrumbService,
              public dialogService: DialogService,
              private formBuilder: FormBuilder,
              private velatorioService: VelatorioService) {
  }

  ngOnInit(): void {
    this.actualizarBreadcrumb();
    this.inicializarFiltroForm()
  }

  actualizarBreadcrumb(): void {
    this.breadCrumbService.actualizar(VELATORIOS_BREADCRUMB);
  }

  abrirPanel(event: MouseEvent, velatorioSeleccionado: Velatorio): void {
    this.velatorioSeleccionado = velatorioSeleccionado;
    this.overlayPanel.toggle(event);
  }

  abrirModalModificacionVelatorio(): void {
    this.modificarRef = this.dialogService.open(ModificarVelatorioComponent, {
      header: 'Modificar velatorio',
      data: this.velatorioSeleccionado,
      width: "920px"
    });
  }

  abrirModalActivarVelatorio(): void {
    const header = this.velatorioSeleccionado.estatus ? 'Desactivar' : 'Activar';
    this.activarRef = this.dialogService.open(ActivarVelatorioComponent, {
      header: `${header} velatorio`,
      data: this.velatorioSeleccionado,
      width: "920px"
    });
  }

  abrirModalCreacionVelatorio(): void {
    const CREACION_CONFIG: DynamicDialogConfig = {
      header: "Agregar velatorio",
      width: MAX_WIDTH,
    }
    this.creacionRef = this.dialogService.open(AgregarVelatorioComponent, CREACION_CONFIG);
    this.creacionRef.onClose.subscribe((respuesta: RespuestaModalUsuario) => this.procesarRespuestaModal(respuesta));
  }

  inicializarFiltroForm(): void {
    this.filtroForm = this.formBuilder.group({
      nivel: [{value: null, disabled: false}],
      velatorio: [{value: null, disabled: false}],
      velatorioEspecifico: [{value: null, disabled: false}]
    })
  }

  limpiarFiltros(): void {
    this.filtroForm.reset()
  }

  seleccionarPaginacion(): void {
    if (this.paginacionConFiltrado) {
      this.paginarConFiltros();
    } else {
      this.paginar();
    }
  }

  paginar(): void {
    this.velatorioService.buscarPorPagina(this.numPaginaActual, this.cantElementosPorPagina).subscribe(
      (respuesta) => {
        this.listaVelatorios = respuesta!.datos.content || [];
        this.totalElementos = respuesta!.datoss.totalElements || 0;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    )
  }

  paginarConFiltros(): void {
  }

  buscar(): void {
  }

  crearSolicitudFiltros(): FiltrosVelatorio {
    return {}
  }

  limpiar(): void {
    this.paginacionConFiltrado = false;
    this.filtroForm.reset();
    this.numPaginaActual = 0;
    this.paginar();
  }

  cambiarEstatus(): void {
  }

  procesarRespuestaModal(respuesta: RespuestaModaVelatorio = {}): void {
    if (respuesta.actualizar) {
      this.limpiar();
    }
    if (respuesta.mensaje) {
      this.alertaService.mostrar(TipoAlerta.Exito, respuesta.mensaje);
    }
  }

  get titulo(): string {
    return this.velatorioSeleccionado.estatus ? 'Desactivar' : 'Activar';
  }

  ngOnDestroy(): void {
    if (this.creacionRef) {
      this.creacionRef.destroy();
    }
    if (this.modificarRef) {
      this.modificarRef.destroy();
    }
    if (this.activarRef) {
      this.activarRef.destroy();
    }
  }

}
