import {ReciboPago} from '../../models/recibo-pago.interface';
import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng-lts/dynamicdialog';
import {OverlayPanel} from 'primeng-lts/overlaypanel';
import {DIEZ_ELEMENTOS_POR_PAGINA} from 'projects/sivimss-gui/src/app/utils/constantes';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TipoDropdown} from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import {CATALOGOS_DUMMIES} from '../../constants/dummies';
import {BreadcrumbService} from 'projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service';
import {AlertaService, TipoAlerta} from 'projects/sivimss-gui/src/app/shared/alerta/services/alerta.service';
import {LazyLoadEvent} from 'primeng-lts/api';
import {SERVICIO_BREADCRUMB} from '../../constants/breadcrumb';
import {validarAlMenosUnCampoConValor} from 'projects/sivimss-gui/src/app/utils/funciones';
import {GenerarReciboService} from '../../services/generar-recibo-pago.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FiltrosReciboPago} from "../../models/filtrosReciboPago.interface";
import {finalize} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {LoaderService} from "../../../../../shared/loader/services/loader.service";

@Component({
  selector: 'app-generar-recibo-pago',
  templateUrl: './generar-recibo-pago.component.html',
  styleUrls: ['./generar-recibo-pago.component.scss'],
  providers: [DialogService]
})
export class GenerarReciboPagoComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;

  recibosPago: ReciboPago[] = [];
  reciboPagoSeleccionado: ReciboPago = {};
  filtroForm!: FormGroup;
  creacionRef!: DynamicDialogRef;
  detalleRef!: DynamicDialogRef;
  modificacionRef!: DynamicDialogRef;

  catNiveles: TipoDropdown[] = [];
  catDelegaciones: TipoDropdown[] = [];
  opciones: TipoDropdown[] = CATALOGOS_DUMMIES;

  paginacionConFiltrado: boolean = false;

  readonly POSICION_CATALOGO_NIVELES: number = 0;
  readonly POSICION_CATALOGO_DELEGACIONES: number = 1;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private alertaService: AlertaService,
    public dialogService: DialogService,
    private generarReciboService: GenerarReciboService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cargadorService: LoaderService
  ) {
  }


  ngOnInit(): void {
    this.breadcrumbService.actualizar(SERVICIO_BREADCRUMB);
    this.inicializarFiltroForm();
    this.cargarCatalogos();
  }

  private cargarCatalogos(): void {
    const respuesta = this.route.snapshot.data["respuesta"];
    this.catNiveles = respuesta[this.POSICION_CATALOGO_NIVELES];
    this.catDelegaciones = respuesta[this.POSICION_CATALOGO_DELEGACIONES];
  }

  abrirPanel(event: MouseEvent, reciboPagoSeleccionado: ReciboPago): void {
    this.reciboPagoSeleccionado = reciboPagoSeleccionado;
    this.overlayPanel.toggle(event);
  }

  abrirModalReciboPagoTramites(): void {
    this.router.navigate(['generar-recibo-pago-tramites'], {relativeTo: this.activatedRoute});
  }

  inicializarFiltroForm() {
    this.filtroForm = this.formBuilder.group({
      nivel: [{value: null, disabled: false}],
      delegacion: [{value: null, disabled: false}],
      velatorio: [{value: null, disabled: false}],
      folio: [{value: null, disabled: false}],
      nombreContratante: [{value: null, disabled: false}],
      fechaInicial: [{value: null, disabled: false}],
      fechaFinal: [{value: null, disabled: false}],
    });
  }

  seleccionarPaginacion(event?: LazyLoadEvent): void {
    if (event) {
      this.numPaginaActual = Math.floor((event.first || 0) / (event.rows || 1));
    }
    if (this.paginacionConFiltrado) {
      this.paginarConFiltros();
    } else {
      this.paginar();
    }
  }

  paginar(): void {
    this.cargadorService.activar();
    this.generarReciboService.buscarPorPagina(this.numPaginaActual, this.cantElementosPorPagina)
      .pipe(finalize(() => this.cargadorService.desactivar()))
      .subscribe(
        (respuesta) => {
          this.recibosPago = respuesta!.datos.content;
          this.totalElementos = respuesta!.datos.totalElements;
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          this.alertaService.mostrar(TipoAlerta.Error, error.message);
        }
      );
  }

  paginarConFiltros(): void {
    const filtros: FiltrosReciboPago = this.crearSolicitudFiltros();
    this.cargadorService.activar();
    this.generarReciboService.buscarPorFiltros(filtros, this.numPaginaActual, this.cantElementosPorPagina)
      .pipe(finalize(() => this.cargadorService.desactivar()))
      .subscribe(
        (respuesta) => {
          this.recibosPago = respuesta!.datos.content;
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

  crearSolicitudFiltros(): FiltrosReciboPago {
    return {
      claveFolio: this.filtroForm.get("folio")?.value,
      nomContratante: this.filtroForm.get("nombreContratante")?.value
    }
  }

  limpiar(): void {
    this.filtroForm.reset();
    this.paginar();
  }

  buscarPorFiltros(): void {
    setTimeout(() => {
      this.recibosPago = [
        {
          fecha: '12/08/2021',
          folio: 'DOC-000001',
          estatusOds: 'Generada',
          estatusPago: 'Generado',
        },
        {
          fecha: '12/08/2021',
          folio: 'DOC-000001',
          estatusOds: 'Generada',
          estatusPago: 'Generado',
        },
        {
          fecha: '12/08/2021',
          folio: 'DOC-000001',
          estatusOds: 'Generada',
          estatusPago: 'Generado',
        }
      ];
      this.totalElementos = this.recibosPago.length;
    }, 0)
  }

  buscarReciboPago() {
    if (validarAlMenosUnCampoConValor(this.filtroForm.value)) {
      this.paginar();
    } else {
      this.f.delegacion.setValidators(Validators.required);
      this.f.delegacion.updateValueAndValidity();
      this.f.velatorio.setValidators(Validators.required);
      this.f.velatorio.updateValueAndValidity();
      this.f.folio.setValidators(Validators.required);
      this.f.folio.updateValueAndValidity();
      this.f.nombreContratante.setValidators(Validators.required);
      this.f.nombreContratante.updateValueAndValidity();
      this.f.fechaInicial.setValidators(Validators.required);
      this.f.fechaInicial.updateValueAndValidity();
      this.f.fechaFinal.setValidators(Validators.required);
      this.f.fechaFinal.updateValueAndValidity();
      this.filtroForm.markAllAsTouched();
    }
  }


  get f() {
    return this.filtroForm?.controls;
  }


}
