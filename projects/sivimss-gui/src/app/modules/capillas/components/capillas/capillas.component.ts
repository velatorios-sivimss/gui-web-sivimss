import { ModificarCapillaComponent } from './../modificar-capilla/modificar-capilla.component';
import { AgregarCapillaComponent } from './../agregar-capilla/agregar-capilla.component';
import { HttpRespuesta } from './../../../../models/http-respuesta.interface';
import { CapillaService } from "../../services/capilla.service";
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BreadcrumbService } from "projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service";
import { AlertaService, TipoAlerta } from "projects/sivimss-gui/src/app/shared/alerta/services/alerta.service";
import { OverlayPanel } from "primeng-lts/overlaypanel";
import { LazyLoadEvent } from "primeng-lts/api";
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { CapillasResolver } from '../../services/capillas.resolver';
import { SERVICIO_BREADCRUMB } from '../../../servicios/constants/breadcrumb';
import { DIEZ_ELEMENTOS_POR_PAGINA } from "projects/sivimss-gui/src/app/utils/constantes";
import { Capilla } from "../../models/capilla.interface";
import { CATALOGOS_DUMMIES } from '../../../inventario-vehicular/constants/dummies';
import { TipoDropdown } from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import { FiltroCapilla } from '../../models/filtro-capilla.interface';
import { DetalleCapillaComponent } from '../detalle-capilla/detalle-capilla.component';
import { RespuestaModalcapilla } from '../../models/respuesta-modal-capilla.interface';

@Component({
  selector: 'app-capillas',
  templateUrl: './capillas.component.html',
  styleUrls: ['./capillas.component.scss'],
  providers: [DialogService]
})
export class CapillasComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;
  // velatorios: TipoDropdown[] = CATALOGOS_DUMMIES;
  velatorios: any[] = [
    {
      label: 'Opción 1',
      value: 1,
    },
    {
      label: 'Opción 2',
      value: 2,
    },
    {
      label: 'Opción 3',
      value: 3,
    }
  ];

  capillas: Capilla[] = [];
  articuloServicioFiltrados: TipoDropdown[] = [];

  capillaSeleccionada!: Capilla;

  creacionRef!: DynamicDialogRef
  detalleRef!: DynamicDialogRef;
  modificacionRef!: DynamicDialogRef;

  filtroForm!: FormGroup;
  agregarCapillaForm!: FormGroup;
  modificarCapillaForm!: FormGroup;

  mostrarModalAgregarCapilla: boolean = false;
  mostrarModalModificarCapilla: boolean = false;
  usuarios: any;

  velatorio:any;
  idCap:any;
  nomCap:any;

  constructor(
    private formBuilder: FormBuilder,
    private alertaService: AlertaService,
    private route: ActivatedRoute,
    private capillaService: CapillaService,
    private breadcrumbService: BreadcrumbService,
    public dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.actualizarBreadcrumb();
    this.inicializarFiltroForm();
    this.obtenerObjetoParaFiltrado();
    this.paginar();
  }


  actualizarBreadcrumb(): void {
    this.breadcrumbService.actualizar(SERVICIO_BREADCRUMB);
  }

  buscar(): void {
    this.numPaginaActual = 0;
    // this.paginacionConFiltrado = true;
    this.buscarPorFiltros();
  }


  obtenerObjetoParaFiltrado(): FiltroCapilla {
    return {
        idVelatorio: parseInt(this.filtroForm.get("velatorio")?.value),
        nombreCapilla: this.filtroForm.get("nombre")?.value,
        idCapilla:  parseInt(this.filtroForm.get("id")?.value)
    };
  }

  inicializarFiltroForm() {
    this.filtroForm = this.formBuilder.group({
      velatorio: [{value: null, disabled: false},[Validators.required]],
      nombre: [{value: null, disabled: false},[Validators.required]],
      id: [{value: null, disabled: false},[Validators.required]],
    });
  }

  obtenerNombreArticuloDescripcion(): string {
    let query = this.f.nombreArticulo?.value || '';
    if (typeof this.f.nombreArticulo?.value === 'object') {
      query = this.f.nombreArticulo?.value?.label;
    }
    return query?.toLowerCase();
  }

  limpiar(): void {
    this.filtroForm.reset();
    console.log('limpiar');
  }

  abrirModalDetalleCapilla(capilla: Capilla) {
    this.creacionRef = this.dialogService.open(DetalleCapillaComponent, {
      header: "Detalle de capilla",
      width: "920px",
      data: { capilla, origen: "detalle" },
    });
  }


  abrirPanel(event: MouseEvent, capillaSeleccionada: Capilla): void {
    this.capillaSeleccionada = capillaSeleccionada;
    this.overlayPanel.toggle(event);
  }

  inicializarAgregarCapillaForm() {
    this.agregarCapillaForm = this.formBuilder.group({
      id: [{value: null, disabled: true}],
      nombre: [{value: null, disabled: false}, [Validators.required]],
      capacidad: [{value: null, disabled: false}, [Validators.required]],
      velatorio: [{value: null, disabled: false}, [Validators.required]],
      largo: [{value: null, disabled: false}, [Validators.required]],
      ancho: [{value: null, disabled: false}, [Validators.required]],
      areaTotal: [{value: null, disabled: false}, [Validators.required]]
    });
  }

  agregarCapilla(): void {
    this.alertaService.mostrar(TipoAlerta.Exito, 'Usuario guardado');
  }


  paginar(event?: LazyLoadEvent): void {
    this.buscarPorFiltros();
  }

  buscarPorFiltros(): void {
    const filtros = this.obtenerObjetoParaFiltrado();
    const solicitudFiltros = JSON.stringify(filtros);
    this.capillaService.buscarPorFiltros(solicitudFiltros, this.numPaginaActual, this.cantElementosPorPagina).subscribe(
      (respuesta) => {
        this.capillas = respuesta!.datos.content;
        this.totalElementos = respuesta!.datos.totalElements;
            },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
  }

  abrirModalModificarCapilla(): void {
    this.creacionRef = this.dialogService.open(ModificarCapillaComponent, {
      header: "Modificar capilla",
      width: "920px",
      data: { capilla: this.capillaSeleccionada, origen: "modificar" },
    });

    this.creacionRef.onClose.subscribe((estatus: boolean) => {
      if (estatus) {
        this.alertaService.mostrar(TipoAlerta.Exito, 'Capilla modificada correctamente');
        this.paginar();
      }
    })
  }

  get f() {
    return this.filtroForm.controls;
  }

  get fac() {
    return this.agregarCapillaForm.controls;
  }

  get fmc() {
    return this.modificarCapillaForm.controls;
  }

  abrirModalAgregarCapilla(): void {
    this.creacionRef = this.dialogService.open(AgregarCapillaComponent, {
      header: "Registrar capilla nueva",
      width: "920px"
    });

    this.creacionRef.onClose.subscribe((estatus: boolean) => {
      if (estatus) {
        this.alertaService.mostrar(TipoAlerta.Exito, 'Capilla agregada correctamente');
        this.paginar();
      }
    })
  }


}
