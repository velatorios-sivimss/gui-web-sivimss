import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownItem } from 'primeng-lts/dropdown';
import { BreadcrumbService } from 'projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service';
import { INVENTARIO_VEHICULAR_BREADCRUMB } from '../../constants/breadcrumb';

@Component({
  selector: 'app-inventario-vehicular',
  templateUrl: './inventario-vehicular.component.html',
  styleUrls: ['./inventario-vehicular.component.scss']
})
export class InventarioVehicularComponent implements OnInit {

  filtroForm: FormGroup;
  velatorios: DropdownItem[] = [];
  niveles: DropdownItem[] = [];
  delegaciones: DropdownItem[] = [];

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

}
