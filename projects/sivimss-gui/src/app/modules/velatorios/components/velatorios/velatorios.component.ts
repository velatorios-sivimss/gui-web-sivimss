import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../../../shared/breadcrumb/services/breadcrumb.service";
import {VELATORIOS_BREADCRUMB} from "../../constants/breadcrumb";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {DialogService, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {AgregarVelatorioComponent} from "../agregar-velatorio/agregar-velatorio.component";
import {DIEZ_ELEMENTOS_POR_PAGINA} from "../../../../utils/constantes";
import {Velatorio} from "../../modelos/velatorio.interface";
import {LazyLoadEvent} from "primeng-lts/api";

@Component({
  selector: 'app-velatorios',
  templateUrl: './velatorios.component.html',
  styleUrls: ['./velatorios.component.scss'],
  providers: [DialogService]
})
export class VelatoriosComponent implements OnInit, OnDestroy {

  filtroForm!: FormGroup;

  niveles: TipoDropdown[] = [];
  velatorios: TipoDropdown[] = [];

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;

  listaVelatorios: Velatorio[] = [];

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

  abrirPanel($event: MouseEvent, velatorio: Velatorio): void {

  }

  abrirModalModificacionVelatorio(): void {

  }

  abrirModalActivarVelatorio(): void {

  }
}
