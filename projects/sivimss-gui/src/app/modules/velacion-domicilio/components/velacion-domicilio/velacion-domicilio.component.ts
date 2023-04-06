import {Component, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbService} from "../../../../shared/breadcrumb/services/breadcrumb.service";
import {SERVICIO_BREADCRUMB} from "../../constants/breadcrumb";
import {OverlayPanel} from "primeng-lts/overlaypanel";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {CATALOGOS_DUMMIES} from "../../constants/dummies";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LazyLoadEvent} from "primeng-lts/api";
import {DIEZ_ELEMENTOS_POR_PAGINA} from "../../../../utils/constantes";
import {VelacionDomicilioInterface} from "../../models/velacion-domicilio.interface";
import {DialogService, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {AlertaService} from "../../../../shared/alerta/services/alerta.service";
import {RegistrarEntradaEquipoComponent} from "../registrar-entrada-equipo/registrar-entrada-equipo.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-velacion-domicilio',
  templateUrl: './velacion-domicilio.component.html',
  styleUrls: ['./velacion-domicilio.component.scss'],
  providers: [DialogService]
})
export class VelacionDomicilioComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  filtroForm!: FormGroup;

  vale: VelacionDomicilioInterface[] = [];
  valeSeleccionado: VelacionDomicilioInterface = {}

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;

  registrarEntradaEquipoRef!: DynamicDialogRef;

  nivel:TipoDropdown[] = CATALOGOS_DUMMIES;
  delegacion:TipoDropdown[] = CATALOGOS_DUMMIES;
  velatorio:TipoDropdown[] = CATALOGOS_DUMMIES;

  constructor(
    private alertaService: AlertaService,
    private breadcrumbService: BreadcrumbService,
    public dialogService: DialogService,
    private formBuilder: FormBuilder,
    private router: Router
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
      nivel: [{value:null, disabled: false}, [Validators.required]],
      delegacion: [{value:null, disabled: false}, [Validators.required]],
      velatorio: [{value:null, disabled: false}, [Validators.required]],
      folioODS: [{value:null, disabled: false}, [Validators.required]],
      fechaInicio: [{value:null, disabled: false}, [Validators.required]],
      fechaFinal: [{value:null, disabled: false}, [Validators.required]]
    });
  }

  paginar(event: LazyLoadEvent): void{
    setTimeout(()=> {
      this.vale = [
        {
          velatorio:1,
          folioODS: "DOC-0001",
          nombreContratante: "Joel Gonzalo Marea Jojutla",
          fechaSalida: "01/01/2021",
          fechaEntrada: "01/01/2022",
          responsableInstalacion: "Betzabe",
          totalArticulos: 1,
        },
        {
          velatorio:2,
          folioODS: "DOC-0002",
          nombreContratante: "Joel Gonzalo Marea Jojutla",
          fechaSalida: "02/01/2021",
          fechaEntrada: "02/01/2022",
          responsableInstalacion: "Betzabe",
          totalArticulos: 2,
        }
      ];
      this.totalElementos = this.vale.length;
    },0);
  }

  abrirDetalleValeSalida(vale:VelacionDomicilioInterface): void{
    this.router.navigate(['reservar-capilla/velacion-en-domicilio/ver-detalle/1'])
  }

  abrirModalRegistroEntradaEquipo(): void {
    this.registrarEntradaEquipoRef = this.dialogService.open(RegistrarEntradaEquipoComponent,{
      header:'Registro de entrada de equipo',
      width:'920px',
    });
  }

  abrirPanel(event:MouseEvent,vale:VelacionDomicilioInterface):void{
    this.valeSeleccionado = vale;
    this.overlayPanel.toggle(event);
  }

  buscar(): void {

  }

  limpiar(): void {

  }

  get ff(){
    return this.filtroForm.controls;
  }

}
