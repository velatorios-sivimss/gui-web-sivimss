
import { ReciboPago } from '../../models/recibo-pago.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { OverlayPanel } from 'primeng-lts/overlaypanel';
import { DIEZ_ELEMENTOS_POR_PAGINA } from 'projects/sivimss-gui/src/app/utils/constantes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoDropdown } from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import { CATALOGOS_DUMMIES, CATALOGO_NIVEL } from '../../constants/dummies';
import { BreadcrumbService } from 'projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service';
import { AlertaService } from 'projects/sivimss-gui/src/app/shared/alerta/services/alerta.service';
import { LazyLoadEvent } from 'primeng-lts/api';
import { SERVICIO_BREADCRUMB } from '../../constants/breadcrumb';
import { validarAlMenosUnCampoConValor } from 'projects/sivimss-gui/src/app/utils/funciones';
import { GenerarNotaRemisionService } from '../../services/generar-nota-remision.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generar-nota-remision',
  templateUrl: './generar-nota-remision.component.html',
  styleUrls: ['./generar-nota-remision.component.scss'],
  providers: [DialogService]
})
export class GenerarNotaRemisionComponent implements OnInit {

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

  catNiveles: TipoDropdown[] = CATALOGO_NIVEL;
  opciones: TipoDropdown[] = CATALOGOS_DUMMIES;

  constructor(
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private alertaService: AlertaService,
    public dialogService: DialogService,
    private generarNotaRemisionService: GenerarNotaRemisionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.actualizarBreadcrumb();
    this.inicializarFiltroForm();
  }

  actualizarBreadcrumb(): void {
    this.breadcrumbService.actualizar(SERVICIO_BREADCRUMB);
  }

  inicializarFiltroForm() {
    this.filtroForm = this.formBuilder.group({
      nivel: [{ value: null, disabled: false }],
      delegacion: [{ value: null, disabled: false }],
      velatorio: [{ value: null, disabled: false }],
      folio: [{ value: null, disabled: false }],
      nombreContratante: [{ value: null, disabled: false }],
      fechaInicial: [{ value: null, disabled: false }],
      fechaFinal: [{ value: null, disabled: false }],
    });
  }

  abrirModalReciboPagoTramites(): void {
    this.router.navigate(['generar-recibo-pago-tramites'], { relativeTo: this.activatedRoute });
  }

  abrirPanel(event: MouseEvent, reciboPagoSeleccionado: ReciboPago): void {
    this.reciboPagoSeleccionado = reciboPagoSeleccionado;
    this.overlayPanel.toggle(event);
  }

  paginar(event?: LazyLoadEvent): void {
    if (event && event.first !== undefined && event.rows !== undefined) {
      this.numPaginaActual = Math.floor(event.first / event.rows);
    } else {
      this.numPaginaActual = 0;
    }
    this.buscarPorFiltros();
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

  limpiar(): void {
    this.filtroForm.reset();
    this.paginar();
  }

  get f() {
    return this.filtroForm?.controls;
  }

}
