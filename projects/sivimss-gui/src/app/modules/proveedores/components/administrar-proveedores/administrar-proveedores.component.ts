import { Proveedores } from './../../models/proveedores.interface';
import { ModificarProveedorComponent } from './../modificar-proveedor/modificar-proveedor.component';
import { AgregarProveedorComponent } from './../agregar-proveedor/agregar-proveedor.component';
import { VerDetalleProveedorComponent } from './../ver-detalle-proveedor/ver-detalle-proveedor.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LazyLoadEvent } from 'primeng-lts/api';
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { OverlayPanel } from 'primeng-lts/overlaypanel';
import { TipoDropdown } from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import { BreadcrumbService } from 'projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service';
import { DIEZ_ELEMENTOS_POR_PAGINA } from 'projects/sivimss-gui/src/app/utils/constantes';
import { INVENTARIO_VEHICULAR_BREADCRUMB } from '../../constants/breadcrumb';
import { CATALOGOS_DUMMIES } from '../../constants/dummies';
import { Vehiculo } from '../../models/vehiculo.interface';

@Component({
  selector: 'app-administrar-proveedores',
  templateUrl: './administrar-proveedores.component.html',
  styleUrls: ['./administrar-proveedores.component.scss'],
  providers: [DialogService]
})
export class AdministrarProveedoresComponent implements OnInit {


  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  filtroForm!: FormGroup;
  velatorios: TipoDropdown[] = CATALOGOS_DUMMIES;
  niveles: TipoDropdown[] = CATALOGOS_DUMMIES;
  delegaciones: TipoDropdown[] = CATALOGOS_DUMMIES;
  proveedoresOpciones: TipoDropdown[] = CATALOGOS_DUMMIES;

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;

  proveedores: Proveedores[] = [];
  // ProveedorSeleccionado!: Proveedores;
  proveedorSeleccionado!: Proveedores
  mostrarModalDetalleVehiculo: boolean = false;
  propiedad = false;

  creacionRef!: DynamicDialogRef
  detalleRef!: DynamicDialogRef;
  modificacionRef!: DynamicDialogRef;

  constructor(
    private breadcrumbService: BreadcrumbService,
    public dialogService: DialogService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.actualizarBreadcrumb();
    this.inicializarFiltroForm();
  }

  actualizarBreadcrumb(): void {
    this.breadcrumbService.actualizar(INVENTARIO_VEHICULAR_BREADCRUMB);
  }

  inicializarFiltroForm(): void {
    this.filtroForm = this.formBuilder.group({
      nivel: [{ value: null, disabled: false }],
      delegacion: [{ value: null, disabled: false }],
      velatorio: [{ value: null, disabled: false }],
      vehiculo: [{ value: null, disabled: false }]
    });
  }

  limpiarFiltros(): void {
    this.filtroForm.reset();
  }

  buscar(): void { }

  paginar(event: LazyLoadEvent): void {
    setTimeout(() => {
      this.proveedores = [
        {
          id: 1,
          curp: 'AROER762010HDFNCOO',
          nombre: 'Armando Rafaelo',
          responsableSanitario: 'Armando Rafaelo',
          estatus: true,
          correoElectronico: 'correo@correo.com',
          banco: 'dqwdqwd',
          cuenta: 'dsdasd',
          tipoProveedor: 'asdasd',
          rfc: 'ASSD',
          telefono: 'dfs',
          regimen: 'dasdasd',
          representanteLegal: 'adfsdf',
          claveBancaria: 'dsfsd',
          tipoContrato: 'dasdf',
          vigenciaDesde: 'asdasd',
          vigenciaHasta: 'asdasd',
          rol: 'fsdf',

          codigoPostal: 'string',
          calle: 'string',
          numExterior: 'string',
          numInterior: 'string',
          pais: 'string',
          estado: 'string',
          municipio: 'string',

          codigoPostalReferencia: 'string',
          calleReferencia: 'string',
          numExteriorReferencia: 'string',
          numInteriorReferencia: 'string',
          paisReferencia: 'string',
          estadoReferencia: 'string',
          municipioReferencia: 'string',
        },
        {
          id: 1,
          curp: 'AROER762010HDFNCOO',
          nombre: 'Armando Rafaelo',
          responsableSanitario: 'Armando Rafaelo',
          estatus: true,
          correoElectronico: 'correo@correo.com',
          banco: 'dqwdqwd',
          cuenta: 'dsdasd',
          tipoProveedor: 'asdasd',
          rfc: 'ASSD',
          telefono: 'dfs',
          regimen: 'dasdasd',
          representanteLegal: 'adfsdf',
          claveBancaria: 'dsfsd',
          tipoContrato: 'dasdf',
          vigenciaDesde: 'asdasd',
          vigenciaHasta: 'asdasd',
          rol: 'fsdf',

          codigoPostal: 'string',
          calle: 'string',
          numExterior: 'string',
          numInterior: 'string',
          pais: 'string',
          estado: 'string',
          municipio: 'string',

          codigoPostalReferencia: 'string',
          calleReferencia: 'string',
          numExteriorReferencia: 'string',
          numInteriorReferencia: 'string',
          paisReferencia: 'string',
          estadoReferencia: 'string',
          municipioReferencia: 'string',
        },
      ]
      this.totalElementos = 3
    }, 0)
  }


  abrirPanel(event: MouseEvent, proveedorSeleccionado: Proveedores): void {
    this.proveedorSeleccionado = proveedorSeleccionado;
    this.overlayPanel.toggle(event);
  }

  abrirModalDetalleProveedor(proveedorSeleccionado: Proveedores): void {
    this.proveedorSeleccionado = proveedorSeleccionado;
    this.detalleRef = this.dialogService.open(VerDetalleProveedorComponent, {
      data: proveedorSeleccionado,
      header: "Ver Detalle",
      width: "920px"
    });

    this.detalleRef.onClose.subscribe((respuesta) => {
      if (respuesta.modificar) {
        this.abrirModalModificacionProveedor();
      }
    })
  }

  abrirModalCreacionProveedor(): void {
    this.creacionRef = this.dialogService.open(AgregarProveedorComponent, {
      header: "Agregar vehículo",
      width: "920px"
    });
  }

  abrirModalModificacionProveedor(): void {
    this.creacionRef = this.dialogService.open(ModificarProveedorComponent, {
      data: this.proveedorSeleccionado,
      header: "Modificar vehículo",
      width: "920px"
    })
  }

  ngOnDestroy() {
    if (this.creacionRef) {
      this.creacionRef.destroy();
    }
    if (this.detalleRef) {
      this.detalleRef.destroy();
    }
    if (this.modificacionRef) {
      this.modificacionRef.destroy();
    }
  }

}
