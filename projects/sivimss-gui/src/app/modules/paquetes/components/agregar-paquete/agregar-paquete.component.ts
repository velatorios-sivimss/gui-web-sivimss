import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { BreadcrumbService } from "../../../../shared/breadcrumb/services/breadcrumb.service";
import { AlertaService, TipoAlerta } from "../../../../shared/alerta/services/alerta.service";
import { OverlayPanel } from "primeng-lts/overlaypanel";
import { DIEZ_ELEMENTOS_POR_PAGINA } from "../../../../utils/constantes";
import { Servicio } from '../../models/servicios.interface';
import { LazyLoadEvent } from "primeng-lts/api";
import { Articulo } from '../../models/articulos.interface';
import { ListaVelatorios } from '../../models/lista-velatorios.interface';
import { VerDetallePaqueteComponent } from '../ver-detalle-paquete/ver-detalle-paquete.component';

@Component({
  selector: 'app-agregar-paquete',
  templateUrl: './agregar-paquete.component.html',
  styleUrls: ['./agregar-paquete.component.scss'],
  providers: [DialogService]
})
export class AgregarPaqueteComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementosServicios: number = 0;
  totalElementosArticulos: number = 0;

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

  servicios: Servicio[] = [];
  servicioSeleccionado!: Servicio;
  articulos: Articulo[] = [];
  articuloSeleccionado!: Articulo;
  velatorios: ListaVelatorios[] = [];
  tituloEliminar: string = '';
  tituloPrincipal: string = 'ADMINISTRAR PAQUETES';

  agregarPaqueteForm!: FormGroup;
  agregarServicioForm!: FormGroup;
  agregarArticuloForm!: FormGroup;

  mostrarModalAgregarServicio: boolean = false;
  mostrarModalAgregarArticulo: boolean = false;
  mostrarModalEliminar: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    public dialogService: DialogService,
    private alertaService: AlertaService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tituloPrincipal = params['titulo'];
    });

    this.route.data.subscribe(v => console.log(v));

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
    this.inicializarAgregarPaqueteForm();
    this.obtenerVelatorio();
  }


  paginar(event: LazyLoadEvent): void {
    setTimeout(() => {
      this.servicios = [
        {
          servicio: 'Traslado',
          costo: '$1,500.00',
          precio: '$25,000.00',
        },
        {
          servicio: 'Cremación',
          costo: '$4,700.00',
          precio: '$25,000.00',
        },
      ];
      this.totalElementosServicios = this.servicios.length;
    }, 0);

    setTimeout(() => {
      this.articulos = [
        {
          articulo: 'Velas con estampados religiosos',
          costo: '$1,500.00',
          precio: '$25,000.00',
        },
        {
          articulo: 'Sillas de acero para velatorios',
          costo: '$4,700.00',
          precio: '$25,000.00',
        },
      ];
      this.totalElementosArticulos = this.articulos.length;
    }, 0);
  }

  obtenerVelatorio() {
    this.velatorios = [
      { descripcion: 'No. 01 Doctores' },
      { descripcion: 'No. 03 Chihuahua' },
      { descripcion: 'No. 05 Mérida' },
      { descripcion: 'No. 06 Torreón' },
      { descripcion: 'No. 07 Cd. Juárez' },
      { descripcion: 'No. 08 Guadalajara' },
      { descripcion: 'No. 09 Toluca' },
      { descripcion: 'No. 10 Monterrey' },
      { descripcion: 'No. 11 Puebla' },
      { descripcion: 'No. 12 Veracruz' },
      { descripcion: 'No. 13 Querétaro' },
      { descripcion: 'No. 14 San Luis Potosí y CD Valles' },
      { descripcion: 'No. 15 Pachuca' },
      { descripcion: 'No. 17 Tapachula' },
      { descripcion: 'No. 18 Tequesquináhuac' },
      { descripcion: 'No. 20 Ecatepec' },
      { descripcion: 'No. 21 Tampico' },
      { descripcion: 'No. 22 Villahermosa' },
    ];
  }

  inicializarAgregarPaqueteForm() {
    this.agregarPaqueteForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }, Validators.required],
      paquete: [{ value: null, disabled: false }, Validators.required],
      descripcion: [{ value: null, disabled: false }, Validators.required],
      region: [{ value: null, disabled: false }, Validators.required],
      clave: [{ value: null, disabled: false }, Validators.required],
      costoInicial: [{ value: null, disabled: false }, Validators.required],
      costoReferencia: [{ value: null, disabled: false }, Validators.required],
      precio: [{ value: null, disabled: true }, Validators.required],
      estatus: [{ value: null, disabled: false }, Validators.required],
    });
  }

  inicializarAgregarServicioForm() {
    this.agregarServicioForm = this.formBuilder.group({
      tipoServicio: [{ value: null, disabled: false }, [Validators.required]],
      servicio: [{ value: null, disabled: false }, [Validators.required]],
    });
  }

  inicializarAgregarArticuloForm() {
    this.agregarArticuloForm = this.formBuilder.group({
      tipoArticulo: [{ value: null, disabled: false }, [Validators.required]],
      articulo: [{ value: null, disabled: false }, [Validators.required]],
    });
  }

  abrirModalDetallePaquete(paquete: Servicio) {
    return 0;
  }

  abrirPanel(event: MouseEvent, servicioSeleccionado: Servicio): void {
    this.servicioSeleccionado = servicioSeleccionado;
    this.overlayPanel.toggle(event);
  }

  agregarPaquete(): void {
    this.alertaService.mostrar(TipoAlerta.Exito, 'Paquete guardado');
  }

  agregarServicio(): void {
    this.alertaService.mostrar(TipoAlerta.Exito, 'Servicio agregado al paquete');
    this.mostrarModalAgregarServicio = false;
  }

  agregarArticulo(): void {
    this.alertaService.mostrar(TipoAlerta.Exito, 'Artículo agregado al paquete');
    this.mostrarModalAgregarArticulo = false;
  }

  verDetalleGuardarPaquete(): void {
    const detalleRef: DynamicDialogRef = this.dialogService.open(VerDetallePaqueteComponent, {
      data: this.agregarPaqueteForm.value,
      header: "Agregar paquete",
      width: "920px"
    });

    // this.detalleRef.onClose.subscribe((result: unknown) => {
    //   console.log(result);
    // });
  }

  abrirModalAgregarServicio(): void {
    this.inicializarAgregarServicioForm();
    this.mostrarModalAgregarServicio = true;
  }

  abrirModalAgregarArticulo(): void {
    this.inicializarAgregarArticuloForm();
    this.mostrarModalAgregarArticulo = true;
  }

  abrirModalEliminarServicio(servicio: Servicio): void {
    this.mostrarModalEliminar = true;
    this.tituloEliminar = 'Eliminar servicio al paquete';
  }

  abrirModalEliminarArticulo(articulo: Articulo): void {
    this.mostrarModalEliminar = true;
    this.tituloEliminar = 'Eliminar artículo al paquete';
  }

  eliminarServicioArticulo(): void {
    this.mostrarModalEliminar = false;
  }

  get f() {
    return this.agregarPaqueteForm.controls;
  }

  get fas() {
    return this.agregarServicioForm.controls;
  }

  get faa() {
    return this.agregarArticuloForm.controls;
  }

}
