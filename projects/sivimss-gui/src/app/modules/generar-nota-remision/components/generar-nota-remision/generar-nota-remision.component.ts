
import { NotaRemision } from '../../models/nota-remision.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { OverlayPanel } from 'primeng-lts/overlaypanel';
import { DIEZ_ELEMENTOS_POR_PAGINA } from 'projects/sivimss-gui/src/app/utils/constantes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoDropdown } from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import { CATALOGOS_DUMMIES, CATALOGO_NIVEL } from '../../constants/dummies';
import { BreadcrumbService } from 'projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service';
import { AlertaService, TipoAlerta } from 'projects/sivimss-gui/src/app/shared/alerta/services/alerta.service';
import { LazyLoadEvent } from 'primeng-lts/api';
import { SERVICIO_BREADCRUMB } from '../../constants/breadcrumb';
import { validarAlMenosUnCampoConValor } from 'projects/sivimss-gui/src/app/utils/funciones';
import { GenerarNotaRemisionService } from '../../services/generar-nota-remision.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from "moment";

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

  notasRemision: NotaRemision[] = [];
  notaRemisionSeleccionada: NotaRemision = {};
  filtroForm!: FormGroup;
  creacionRef!: DynamicDialogRef;
  detalleRef!: DynamicDialogRef;
  modificacionRef!: DynamicDialogRef;
  hayCamposObligatorios: boolean = false;

  catNiveles: TipoDropdown[] = CATALOGO_NIVEL;
  opciones: TipoDropdown[] = CATALOGOS_DUMMIES;
  foliosGenerados: TipoDropdown[] = [];
  clavesEstatus: string[] = ['Sin nota', 'Generada', 'Cancelada'];

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
    this.obtenerFoliosGenerados();
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
    this.router.navigate(['formato'], { relativeTo: this.activatedRoute });
  }

  abrirPanel(event: MouseEvent, notaRemisionSeleccionada: NotaRemision): void {
    this.notaRemisionSeleccionada = notaRemisionSeleccionada;
    this.overlayPanel.toggle(event);
  }

  paginar(event?: LazyLoadEvent): void {
    if (event && event.first !== undefined && event.rows !== undefined) {
      this.numPaginaActual = Math.floor(event.first / event.rows);
    } else {
      this.numPaginaActual = 0;
    }
    this.generarNotaRemisionService.buscarPorPagina(this.numPaginaActual, this.cantElementosPorPagina).subscribe(
      (respuesta) => {
        this.notasRemision = respuesta!.datos.content;
        this.totalElementos = respuesta!.datos.totalElements;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
  }

  buscarFoliosNotaRemision() {
    let camposObligatorios = {
      folio: this.f.folio.value,
      fechaInicial: this.f.fechaInicial.value,
      fechaFinal: this.f.fechaFinal.value,
    };
    this.hayCamposObligatorios = false;
    if (validarAlMenosUnCampoConValor(camposObligatorios) && this.filtroForm.valid) {
      this.numPaginaActual = 0;
      this.buscarPorFiltros();
    } else {
      this.f.folio.setValidators(Validators.required);
      this.f.folio.updateValueAndValidity();
      this.f.fechaInicial.setValidators(Validators.required);
      this.f.fechaInicial.updateValueAndValidity();
      this.f.fechaFinal.setValidators(Validators.required);
      this.f.fechaFinal.updateValueAndValidity();
      this.filtroForm.markAllAsTouched();
      this.hayCamposObligatorios = true;
    }
  }

  buscarPorFiltros(): void {
    this.generarNotaRemisionService.buscarPorFiltros(this.obtenerObjetoParaFiltrado(), this.numPaginaActual, this.cantElementosPorPagina).subscribe(
      (respuesta) => {
        if (respuesta!.datos.content.length === 0) {
          this.notasRemision = [];
          this.totalElementos = 0;
          this.alertaService.mostrar(TipoAlerta.Precaucion, 'No se encontró información relacionada a tu búsqueda.');
        } else {
          this.notasRemision = respuesta!.datos.content;
          this.totalElementos = respuesta!.datos.totalElements;
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
  }

  obtenerObjetoParaFiltrado(): object {
    return {
      idNivel: 1,
      idVelatorio: 1,
      folioODS: +this.f.folio.value?.label,
      fecIniODS: moment(this.f.fechaInicial.value).format('DD/MM/YYYY'),
      fecFinODS: moment(this.f.fechaInicial.value).format('DD/MM/YYYY'),
    }
  }


  limpiar(): void {
    this.filtroForm.reset();
    this.paginar();
  }

  fechasOpcionales() {
    this.f.fechaInicial.clearValidators();
    this.f.fechaInicial.updateValueAndValidity();
    this.f.fechaFinal.clearValidators();
    this.f.fechaFinal.updateValueAndValidity();
    this.hayCamposObligatorios = false;
  }

  folioOpcional() {
    if (this.f.fechaInicial.value && this.f.fechaFinal.value) {
      this.f.folio.clearValidators();
      this.f.folio.updateValueAndValidity();
      this.hayCamposObligatorios = false;
    }

    if (!this.f.fechaInicial.value || !this.f.fechaFinal.value) {
      this.f.fechaInicial.setValidators(Validators.required);
      this.f.fechaInicial.updateValueAndValidity();
      this.f.fechaFinal.setValidators(Validators.required);
      this.f.fechaFinal.updateValueAndValidity();
      this.filtroForm.markAllAsTouched();
      this.hayCamposObligatorios = true;
    }
  }

  obtenerFoliosGenerados() {
    this.generarNotaRemisionService.buscarTodasOdsGeneradas().subscribe(
      (respuesta) => {
        let filtrado: TipoDropdown[] = [];
        if (respuesta!.datos.length > 0) {
          respuesta!.datos.forEach((e: any) => {
            filtrado.push({
              label: e.nombre,
              value: e.id,
            });
          });
          this.foliosGenerados = filtrado;
        } else {
          this.foliosGenerados = [];
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  get f() {
    return this.filtroForm?.controls;
  }

}
