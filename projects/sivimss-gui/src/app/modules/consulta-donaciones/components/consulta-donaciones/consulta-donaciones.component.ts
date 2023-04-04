import {Component, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbService} from "../../../../shared/breadcrumb/services/breadcrumb.service";
import {SERVICIO_BREADCRUMB} from "../../constants/breadcrumb";
import {OverlayPanel} from "primeng-lts/overlaypanel";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {CATALOGOS_DUMMIES} from "../../../servicios-funerarios/constants/dummies";
import {LazyLoadEvent} from "primeng-lts/api";
import {ConsultaDonacionesInterface} from "../../models/consulta-donaciones-interface";
import {DIEZ_ELEMENTOS_POR_PAGINA} from "../../../../utils/constantes";
import {ServiciosFunerariosInterface} from "../../../servicios-funerarios/models/servicios-funerarios.interface";
import {DialogService, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {RegistrarDonacionComponent} from "../registrar-donacion/registrar-donacion.component";

@Component({
  selector: 'app-consulta-donaciones',
  templateUrl: './consulta-donaciones.component.html',
  styleUrls: ['./consulta-donaciones.component.scss'],
  providers: [DialogService]
})
export class ConsultaDonacionesComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  registrarDonacionRef!: DynamicDialogRef;


  filtroForm!: FormGroup;

  ataudesDonados: ConsultaDonacionesInterface[] = [];
  ataudDonadoSeleccionado: ConsultaDonacionesInterface = {};

  nivel:TipoDropdown[] = CATALOGOS_DUMMIES;
  delegacion:TipoDropdown[] = CATALOGOS_DUMMIES;
  velatorio:TipoDropdown[] = CATALOGOS_DUMMIES;
  donadoPor:TipoDropdown[] = CATALOGOS_DUMMIES;

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;

  constructor(
    private breadcrumbService: BreadcrumbService,
    public dialogService: DialogService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.actualizarBreadcrumb();
    this.inicializarFiltroForm();
  }

  actualizarBreadcrumb(): void {
    this.breadcrumbService.actualizar(SERVICIO_BREADCRUMB);
  }

  inicializarFiltroForm(): void {
    this.filtroForm = this.formBuilder.group({
      nivel: [{value: null, disabled:false}],
      delegacion: [{value: null, disabled:false}],
      velatorio: [{value: null, disabled:false}],
      donadoPor: [{value: null, disabled:false}],
      fechaDesde: [{value: null, disabled:false}],
      fechaHasta: [{value: null, disabled:false}],
    });
  }

  paginar(event: LazyLoadEvent): void {
    setTimeout(() => {

      this.ataudesDonados = [
        {
          velatorio: "No. 18 Tequesquináhuac",
          tipo: "Madera",
          modeloAtaud: "Mod-001",
          numeroInventario: 453564,
          fechaDonacion: "01/01/2021",
          donadoPor: "Instituto",
          nombreDonador: "Juan Alberto Sustos"
        },
        {
          velatorio: "No. 18 Tequesquináhuac",
          tipo: "Madera",
          modeloAtaud: "Mod-001",
          numeroInventario: 453564,
          fechaDonacion: "01/01/2021",
          donadoPor: "Instituto",
          nombreDonador: "Juan Alberto Sustos"
        },
        {
          velatorio: "No. 18 Tequesquináhuac",
          tipo: "Madera",
          modeloAtaud: "Mod-001",
          numeroInventario: 453564,
          fechaDonacion: "01/01/2021",
          donadoPor: "Instituto",
          nombreDonador: "Juan Alberto Sustos"
        }
      ];
      this.totalElementos = this.ataudesDonados.length;
    },0);
  }

  abrirPanel(event: MouseEvent, ataudDonado: ConsultaDonacionesInterface): void {
    this.ataudDonadoSeleccionado = ataudDonado;
    this.overlayPanel.toggle(event);
  }

  abrirModarRegistrarDonacion(): void {
    this.registrarDonacionRef = this.dialogService.open(RegistrarDonacionComponent, {
      header:"Registrar donación",
      width:"920px"
    })
  }

  get ff() {
    return this.filtroForm.controls;
  }
}
