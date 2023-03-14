import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from "../../../../shared/breadcrumb/services/breadcrumb.service";
import {VELATORIOS_BREADCRUMB} from "../../constants/breadcrumb";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TipoDropdown} from "../../../../models/tipo-dropdown";

@Component({
  selector: 'app-velatorios',
  templateUrl: './velatorios.component.html',
  styleUrls: ['./velatorios.component.scss']
})
export class VelatoriosComponent implements OnInit {

  filtroForm!: FormGroup;

  niveles: TipoDropdown[] = [];
  velatorios: TipoDropdown[] = [];

  constructor(private breadCrumbService: BreadcrumbService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.actualizarBreadcrumb();
    this.inicializarFiltroForm()
  }

  actualizarBreadcrumb(): void  {
    this.breadCrumbService.actualizar(VELATORIOS_BREADCRUMB);
  }

  inicializarFiltroForm(): void {
    this.filtroForm = this.formBuilder.group({
      nivel: [{ value: null, disabled: false }],
      velatorio: [{ value: null, disabled: false }],
      veatorioEspecifico: [{ value: null, disabled: false }]
    })
  }

  buscar(): void {}

  limpiarFiltros(): void {
    this.filtroForm.reset()
  }

}
