import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LazyLoadEvent } from 'primeng-lts/api';
import { DropdownItem } from 'primeng-lts/dropdown';
import { OverlayPanel } from 'primeng-lts/overlaypanel';

import { BreadcrumbService } from 'projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service';
import { DIEZ_ELEMENTOS_POR_PAGINA } from 'projects/sivimss-gui/src/app/utils/constantes';
import { INVENTARIO_VEHICULAR_BREADCRUMB } from '../../constants/breadcrumb';
import { Vehiculo } from '../../models/vehiculo.interface';

@Component({
  selector: 'app-inventario-vehicular',
  templateUrl: './inventario-vehicular.component.html',
  styleUrls: ['./inventario-vehicular.component.scss'],
  providers: []
})
export class InventarioVehicularComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel: OverlayPanel;

  filtroForm: FormGroup;
  velatorios: DropdownItem[] = [];
  niveles: DropdownItem[] = [];
  delegaciones: DropdownItem[] = [];

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;

  vehiculos: Vehiculo[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
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
      this.vehiculos = [
        {
          id: 1,
          velatorio: "No. 14 San Luis Potosí y CD Valles",
          uso: "Utilitario administrativo",
          responsable: "Alberto Lima Dorantes",
          tipoVehiculo: "Carrosa con detalles religiosos",
          estatus: true
        },
        {
          id: 2,
          velatorio: "No. 14 San Luis Potosí y CD Valles",
          uso: "Utilitario administrativo",
          responsable: "Alberto Lima Dorantes",
          tipoVehiculo: "Carrosa con detalles religiosos",
          estatus: false
        },
        {
          id: 3,
          velatorio: "No. 14 San Luis Potosí y CD Valles",
          uso: "Utilitario administrativo",
          responsable: "Alberto Lima Dorantes",
          tipoVehiculo: "Carrosa con detalles religiosos",
          estatus: true
        }
      ];
      this.totalElementos = this.vehiculos.length;
    }, 0);
  }

  abrirPanel(event: MouseEvent, vehiculoSeleccionado: Vehiculo): void {
    // this.capillaSeleccionada = capillaSeleccionada;
    this.overlayPanel.toggle(event);
  }

  abrirModalDetalleVehiculo(vehiculoSeleccionado: Vehiculo): void { }

}
