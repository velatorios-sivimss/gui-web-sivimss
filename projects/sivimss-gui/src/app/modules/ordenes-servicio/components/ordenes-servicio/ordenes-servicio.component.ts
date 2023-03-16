import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LazyLoadEvent } from "primeng-lts/api";
import { OverlayPanel } from "primeng-lts/overlaypanel";
import { AlertaService } from "projects/sivimss-gui/src/app/shared/alerta/services/alerta.service";
import { BreadcrumbService } from "projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service";
import { DIEZ_ELEMENTOS_POR_PAGINA } from "projects/sivimss-gui/src/app/utils/constantes";

@Component({
  selector: 'app-ordenes-servicio',
  templateUrl: './ordenes-servicio.component.html',
  styleUrls: ['./ordenes-servicio.component.scss']
})
export class OrdenesServicioComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;

  filtroForm!: FormGroup;

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

  ordenesServicio: any[] = [];
  ordenServicioSeleccionada: any = null;

  mostrarLoaderInline:boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private alertaService: AlertaService,
    private breadcrumbService: BreadcrumbService
  ) {
  }

  ngOnInit(): void {
    this.breadcrumbService.actualizar([
      {
        icono: 'imagen-icono-operacion-sivimss.svg',
        titulo: 'Operación SIVIMSS'
      },
      {
        icono: '',
        titulo: 'Órdenes de servicio'
      }
    ]);
    this.inicializarFiltroForm();
  }

  inicializarFiltroForm():void {
    this.filtroForm = this.formBuilder.group({
      velatorio: [{value: null, disabled: false}, []],
      numeroFolio: [{value: null, disabled: false}, []],
      nombreContratante: [{value: null, disabled: false}, []],
      nombreFinado: [{value: null, disabled: false}, []],
      tipoOrden: [{value: null, disabled: false}, []],
      unidadProcedencia: [{value: null, disabled: false}, []],
      numeroContrato: [{value: null, disabled: false}, []],
      estatus: [{value: null, disabled: false}, []]
    });
  }


  paginar(event: LazyLoadEvent): void {
    setTimeout(() => {
      this.ordenesServicio = [
        {
          id: 1,
          numeroFolio: 'DOC-000001',
          velatorio: 'Velatorio No. 14 San Luis Potosi y CD Valles',
          nombreContratante: 'Heriberto Angelo Sánchez Maldonado',
          nombreFinado: 'Alberto Lima Durazo',
          estatus: 'Pre-orden'
        },
        {
          id: 2,
          numeroFolio: 'DOC-000001',
          velatorio: 'Velatorio No. 14 San Luis Potosi y CD Valles',
          nombreContratante: 'Heriberto Angelo Sánchez Maldonado',
          nombreFinado: 'Alberto Lima Durazo',
          estatus: 'Cancelada'
        },
        {
          id: 3,
          numeroFolio: 'DOC-000001',
          velatorio: 'Velatorio No. 14 San Luis Potosi y CD Valles',
          nombreContratante: 'Heriberto Angelo Sánchez Maldonado',
          nombreFinado: 'Alberto Lima Durazo',
          estatus: 'Activa'
        }
      ];
      this.totalElementos = 3;
    }, 0);
  }

  abrirPanel(event:MouseEvent, ordenServicioSeleccionada: any):void {
    this.ordenServicioSeleccionada = ordenServicioSeleccionada;
    this.overlayPanel.toggle(event);
  }

}
