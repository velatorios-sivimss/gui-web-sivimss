import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BreadcrumbService } from "../../../../shared/breadcrumb/services/breadcrumb.service";
import { AlertaService, TipoAlerta } from "../../../../shared/alerta/services/alerta.service";
import { OverlayPanel } from "primeng-lts/overlaypanel";
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { DIEZ_ELEMENTOS_POR_PAGINA } from "../../../../utils/constantes";
import { Paquete } from "../../models/paquetes.interface";
import { LazyLoadEvent } from "primeng-lts/api";
import { ActivatedRoute, Router } from '@angular/router';
import { VerDetallePaquetesComponent } from '../ver-detalle-paquetes/ver-detalle-paquetes.component';
import { Servicio } from '../../models/servicios.interface';
import { Articulo } from '../../models/articulos.interface';

interface HttpResponse {
  respuesta: string;
  paquete: Paquete;
}
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

  modo: 'crear' | 'modificar' | 'detalle' | 'activar' | 'desactivar' = 'crear';

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

  paquetesServicio: any[] = [
    {
      label: 'Paquete Uno',
      value: 0,
    },
    {
      label: 'Paquete Dos',
      value: 1,
    },
    {
      label: 'Paquete Tres',
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
      tipoArticulo: '',
    },
    {
      articulo: 'Ataúd',
      tipoArticulo: 'Donado',
    },
  ];

  paquetes: Paquete[] = [];
  paqueteSeleccionado!: Paquete;
  detalleRef!: DynamicDialogRef;
  filtroForm!: FormGroup;
  agregarPaqueteForm!: FormGroup;
  modificarPaqueteForm!: FormGroup;
  paquetesServicioFiltrados: any[] = [];

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
          id: 1,
          nombrePaquete: 'Paquete siniestro de previsión funeraria con cremación',
          descripcion: 'Paquete todo incluido con cremación servicios completos',
          estatus: true,
          costoInicial: '$34,200.00',
          costoReferencia: '$45,000.00',
          precio: '$65,000.00',
          region: 'Nacional',
          clave: '00000000000000000',
          servicios: this.servicios,
          articulos: this.articulos,
        },
        {
          id: 2,
          nombrePaquete: 'Paquete siniestro de previsión funeraria con cremación',
          descripcion: 'Paquete todo incluido con cremación servicios completos',
          estatus: true,
          costoInicial: '$34,200.00',
          costoReferencia: '$45,000.00',
          precio: '$65,000.00',
          region: 'Nacional',
          clave: '00000000000000000',
          servicios: this.servicios,
          articulos: this.articulos,
        },
        {
          id: 3,
          nombrePaquete: 'Paquete siniestro de previsión funeraria con cremación',
          descripcion: 'Paquete todo incluido con cremación servicios completos',
          estatus: true,
          costoInicial: '$34,200.00',
          costoReferencia: '$45,000.00',
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
    this.router.navigate(['agregar-paquete'], { relativeTo: this.activatedRoute });
  }

  abrirModalDetallePaquete(paquete: Paquete) {
    this.detalleRef = this.dialogService.open(VerDetallePaquetesComponent, {
      data: { paquete, modo: this.modo = 'detalle' },
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
    // this.inicializarModificarPaqueteForm();
    this.mostrarModalModificarPaquete = true;
    this.router.navigate(['modificar-paquete', this.paqueteSeleccionado.id], { relativeTo: this.activatedRoute });
  }

  agregarPaquete(): void {
    this.alertaService.mostrar(TipoAlerta.Exito, 'Usuario guardado');
  }

  limpiarFormBusqueda() {
    this.filtroForm.reset();
  }

  buscarPaquete() {
    // De acuerdo a CU al menos un campo con información a buscar
    if (this.validarAlMenosUnCampoConValor(this.filtroForm)) {
      // TO DO llamada a servicio para realizar búsqueda
      console.log('Datos a buscar', this.filtroForm.value);
    }
  }

  validarAlMenosUnCampoConValor(group: FormGroup) {
    if (!Object.values(group.value).find(value => value !== '' && value !== null)) {
      return false;
    }
    return true;
  }

  cambiarEstatus(paquete: Paquete) {
    this.modo = paquete.estatus ? 'desactivar' : 'activar';
    this.detalleRef = this.dialogService.open(VerDetallePaquetesComponent, {
      data: { paquete, modo: this.modo },
      header: "Ver detalle",
      width: "920px"
    });
    this.detalleRef.onClose.subscribe((res: HttpResponse) => {
      if (res && res.respuesta === 'Ok' && res.paquete) {
        const foundIndex = this.paquetes.findIndex((item: Paquete) => item.id === paquete.id);
        this.paquetes[foundIndex] = res.paquete;
      }
    });
  }

  filtrarPaquetes(event: any) {
    // TO DO En una aplicación real, realice una solicitud a una URL remota con la consulta y devuelva los resultados filtrados
    let filtrado: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.paquetesServicio.length; i++) {
      let paquete = this.paquetesServicio[i];
      if (paquete.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtrado.push(paquete);
      }
    }

    this.paquetesServicioFiltrados = filtrado;
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
