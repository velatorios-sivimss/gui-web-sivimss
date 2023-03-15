import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbService} from "../../../../shared/breadcrumb/services/breadcrumb.service";
import {VELATORIOS_BREADCRUMB} from "../../constants/breadcrumb";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {DialogService, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {AgregarVelatorioComponent} from "../agregar-velatorio/agregar-velatorio.component";
import {DIEZ_ELEMENTOS_POR_PAGINA} from "../../../../utils/constantes";
import {Velatorio} from "../../modelos/velatorio.interface";
import {LazyLoadEvent} from "primeng-lts/api";
import {REGISTROS_VELATORIOS} from "../../constants/dummies";
import {OverlayPanel} from "primeng-lts/overlaypanel";
import {ActivarVelatorioComponent} from "../activar-velatorio/activar-velatorio.component";
import {ModificarVelatorioComponent} from "../modificar-velatorio/modificar-velatorio.component";

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

  constructor(private breadCrumbService: BreadcrumbService,
              public dialogService: DialogService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.actualizarBreadcrumb();
    this.inicializarFiltroForm()
  }

  actualizarBreadcrumb(): void {
    this.breadCrumbService.actualizar(VELATORIOS_BREADCRUMB);
  }

  inicializarFiltroForm(): void {
    this.filtroForm = this.formBuilder.group({
      nivel: [{value: null, disabled: false}],
      velatorio: [{value: null, disabled: false}],
      velatorioEspecifico: [{value: null, disabled: false}]
    })
  }

  buscar(): void {
  }

  limpiarFiltros(): void {
    this.filtroForm.reset()
  }

  paginar(event: LazyLoadEvent): void {
    setTimeout(() => {
      this.listaVelatorios = REGISTROS_VELATORIOS;
      this.totalElementos = REGISTROS_VELATORIOS.length;
    }, 0);
  }

  abrirModalCreacionVelatorio(): void {
    this.creacionRef = this.dialogService.open(AgregarVelatorioComponent, {
      header: "Agregar velatorio",
      width: "920px"
    });
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

  get titulo(): string {
    return this.velatorioSeleccionado.estatus ? 'Desactivar' : 'Activar';
  }
}
