import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BreadcrumbService } from "../../../shared/breadcrumb/services/breadcrumb.service";
import { AlertaService, TipoAlerta } from "../../../shared/alerta/services/alerta.service";
import { OverlayPanel } from "primeng-lts/overlaypanel";
import { DIEZ_ELEMENTOS_POR_PAGINA } from "../../../utils/constantes";
import { Capilla } from "../models/capilla.interface";
import { LazyLoadEvent } from "primeng-lts/api";

@Component({
  selector: 'app-capillas',
  templateUrl: './capillas.component.html',
  styleUrls: ['./capillas.component.scss']
})
export class CapillasComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel: OverlayPanel;

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;

  opciones: any[] = [
    {
      label: 'Opción 1',
      value: 0,
    },
    {
      label: 'Opción 2',
      value: 1,
    },
    {
      label: 'Opción 3',
      value: 2,
    }
  ];

  capillas: Capilla[] = [];

  capillaSeleccionada: Capilla = null;

  filtroForm: FormGroup;
  agregarCapillaForm: FormGroup;
  modificarCapillaForm: FormGroup;

  mostrarModalAgregarCapilla: boolean = false;
  mostrarModalModificarCapilla: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private alertaService: AlertaService
  ) {
  }

  ngOnInit(): void {
    this.breadcrumbService.actualizar([
      {
        icono: 'imagen-icono-operacion-sivimss.svg',
        titulo: 'Administración de catálogos'
      },
      {
        icono: '',
        titulo: 'Administrar capillas'
      }
    ]);
    this.inicializarFiltroForm();
  }


  paginar(event: LazyLoadEvent): void {
    setTimeout(() => {
      this.capillas = [
        {
          id: 'DOC-167589-2022 ',
          nombre: 'Capilla grande Mexmad de madera y acero contra humedad',
          largo: '5',
          alto: '100',
          areaTotal: '10,000',
          estatus: true
        },
        {
          id: 'DOC-167589-2022 ',
          nombre: 'Capilla grande Mexmad de madera y acero contra humedad',
          largo: '5',
          alto: '100',
          areaTotal: '10,000',
          estatus: true
        },
        {
          id: 'DOC-167589-2022 ',
          nombre: 'Capilla grande Mexmad de madera y acero contra humedad',
          largo: '5',
          alto: '100',
          areaTotal: '10,000',
          estatus: true
        }
      ];
      this.totalElementos = this.capillas.length;
    }, 0);
  }

  inicializarFiltroForm() {
    this.filtroForm = this.formBuilder.group({
      velatorio: [{value: null, disabled: false}],
      nombre: [{value: null, disabled: false}],
      id: [{value: null, disabled: false}],
    });
  }

  abrirModalAgregarCapilla(): void {
    this.inicializarAgregarCapillaForm();
    this.mostrarModalAgregarCapilla = true;
  }

  abrirModalDetalleCapilla(capilla: Capilla) {
    return 0;
  }

  abrirPanel(event: MouseEvent, capillaSeleccionada: Capilla): void {
    this.capillaSeleccionada = capillaSeleccionada;
    this.overlayPanel.toggle(event);
  }

  abrirModalModificarCapilla() {
    this.inicializarModificarCapillaForm();
    this.mostrarModalModificarCapilla = true;
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

  inicializarModificarCapillaForm() {
    this.modificarCapillaForm = this.formBuilder.group({
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

  get f() {
    return this.filtroForm.controls;
  }

  get fac() {
    return this.agregarCapillaForm.controls;
  }

  get fmc() {
    return this.modificarCapillaForm.controls;
  }

}
