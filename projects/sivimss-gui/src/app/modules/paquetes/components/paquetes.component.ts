import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BreadcrumbService } from "../../../shared/breadcrumb/services/breadcrumb.service";
import { AlertaService, TipoAlerta } from "../../../shared/alerta/services/alerta.service";
import { OverlayPanel } from "primeng-lts/overlaypanel";
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { DIEZ_ELEMENTOS_POR_PAGINA } from "../../../utils/constantes";
import { Paquete } from "../models/paquetes.interface";
import { LazyLoadEvent } from "primeng-lts/api";
import { ActivatedRoute, Router } from '@angular/router';
import { VerDetallePaqueteComponent } from './ver-detalle-paquete/ver-detalle-paquete.component';
import { Servicio } from '../models/servicios.interface';
import { Articulo } from '../models/articulos.interface';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss'],
  providers: [DialogService]
})
export class PaquetesComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

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
  servicios: Servicio[] = [
    {
      servicio: 'Traslado a nivel nacional',
      costo: '$25,100.00',
      precio: '$25,100.00'
    },
    {
      servicio: 'Cremación',
      costo: '$3,200.00',
      precio: '$3,200.00'
    },
  ];

  articulos: Articulo[] = [
    {
      articulo: 'Traslado a nivel nacional',
      costo: '$25,100.00',
      precio: '$25,100.00'
    },
    {
      articulo: 'Cremación',
      costo: '$3,200.00',
      precio: '$3,200.00'
    },
  ];

  paquetes: Paquete[] = [];
  paqueteSeleccionado!: Paquete;
  detalleRef!: DynamicDialogRef;
  filtroForm!: FormGroup;
  agregarPaqueteForm!: FormGroup;
  modificarPaqueteForm!: FormGroup;

  mostrarModalAgregarPaquete: boolean = false;
  mostrarModalModificarPaquete: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    public dialogService: DialogService,
    private alertaService: AlertaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
        titulo: 'Administrar paquetes'
      }
    ]);
    this.inicializarFiltroForm();
  }


  paginar(event: LazyLoadEvent): void {
    setTimeout(() => {
      this.paquetes = [
        {
          id: '1',
          nombrePaquete: 'Paquete siniestro de previsión funeraria con cremación',
          descripcion: 'Paquete todo incluido con cremación servicios completos',
          estatus: true,
          costoInicial: '$34,200.00',
          costo: '$45,000.00',
          precio: '$65,000.00',
          region: 'Nacional',
          clave: '00000000000000000',
          servicios: this.servicios,
          articulos: this.articulos,
        },
        {
          id: '2',
          nombrePaquete: 'Paquete siniestro de previsión funeraria con cremación',
          descripcion: 'Paquete todo incluido con cremación servicios completos',
          estatus: true,
          costoInicial: '$34,200.00',
          costo: '$45,000.00',
          precio: '$65,000.00',
          region: 'Nacional',
          clave: '00000000000000000',
          servicios: this.servicios,
          articulos: this.articulos,
        },
        {
          id: '3',
          nombrePaquete: 'Paquete siniestro de previsión funeraria con cremación',
          descripcion: 'Paquete todo incluido con cremación servicios completos',
          estatus: true,
          costoInicial: '$34,200.00',
          costo: '$45,000.00',
          precio: '$65,000.00',
          region: 'Nacional',
          clave: '00000000000000000',
          servicios: this.servicios,
          articulos: this.articulos,
        }
      ];
      this.totalElementos = this.paquetes.length;
    }, 0);
  }

  inicializarFiltroForm() {
    this.filtroForm = this.formBuilder.group({
      nivel: [{ value: null, disabled: false }],
      delegacion: [{ value: null, disabled: false }],
      velatorio: [{ value: null, disabled: false }],
      nombrePaquete: [{ value: null, disabled: false }],
    });
  }

  abrirModalAgregarPaquete(): void {
    const queryParams = { titulo: 'ADMINISTRAR PAQUETES' };
    this.router.navigate(['agregar-paquete'], {
      relativeTo: this.activatedRoute,
      queryParams,
    });
  }

  abrirModalDetallePaquete(paqueteSeleccionado: Paquete) {
    this.detalleRef = this.dialogService.open(VerDetallePaqueteComponent, {
      data: paqueteSeleccionado,
      header: "Ver detalle",
      width: "920px"
      });

    // this.detalleRef.onClose.subscribe((result: unknown) => {
    //   console.log(result);
    // });
  }

  abrirPanel(event: MouseEvent, paqueteSeleccionado: Paquete): void {
    this.paqueteSeleccionado = paqueteSeleccionado;
    this.overlayPanel.toggle(event);
  }

  abrirModalModificarPaquete() {
    this.inicializarModificarPaqueteForm();
    this.mostrarModalModificarPaquete = true;
    const queryParams = { titulo: 'MODIFICAR PAQUETES' };
    this.router.navigate(['modificar-paquete'], {
      relativeTo: this.activatedRoute,
      queryParams,
    });
  }

  inicializarAgregarPaqueteForm() {
    this.agregarPaqueteForm = this.formBuilder.group({
      nivel: [{ value: null, disabled: false }, [Validators.required]],
      delegacion: [{ value: null, disabled: false }, [Validators.required]],
      velatorio: [{ value: null, disabled: false }, [Validators.required]],
      nombrePaquete: [{ value: null, disabled: false }, [Validators.required]],
    });
  }

  inicializarModificarPaqueteForm() {
    this.modificarPaqueteForm = this.formBuilder.group({
      nivel: [{ value: null, disabled: false }, [Validators.required]],
      delegacion: [{ value: null, disabled: false }, [Validators.required]],
      velatorio: [{ value: null, disabled: false }, [Validators.required]],
      nombrePaquete: [{ value: null, disabled: false }, [Validators.required]],
    });
  }

  agregarPaquete(): void {
    this.alertaService.mostrar(TipoAlerta.Exito, 'Usuario guardado');
  }

  get f() {
    return this.filtroForm.controls;
  }

  get fac() {
    return this.agregarPaqueteForm.controls;
  }

  get fmc() {
    return this.modificarPaqueteForm.controls;
  }

}
