import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {BreadcrumbService} from "../../../../shared/breadcrumb/services/breadcrumb.service";
import {LazyLoadEvent} from "primeng-lts/api";
import {DIEZ_ELEMENTOS_POR_PAGINA} from "../../../../utils/constantes";
import {OverlayPanel} from "primeng-lts/overlaypanel";

import {Rol} from "../../models/rol.interface";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { CATALOGOS } from '../../../usuarios/constants/catalogos_dummies';
import { RolService } from '../../services/rol.service';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;


  filtroForm!: FormGroup;

  opciones: TipoDropdown[] = CATALOGOS;
  catRol: any[] = [];
  roles: Rol[] = [];
  rolSeleccionado!: Rol;
  mostrarModalDetalleRol: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private rolService: RolService,
    private alertaService: AlertaService,
    private breadcrumbService: BreadcrumbService
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
        titulo: 'Administrar roles'
      }
    ]);
    this.inicializarFiltroForm();
  }


  paginar(event: LazyLoadEvent): void {
    debugger
    this.rolService.buscarPorPagina(this.numPaginaActual, this.cantElementosPorPagina).subscribe(
      (respuesta) => {
        this.roles = respuesta!.datos.content;
        this.totalElementos = respuesta!.datos.totalElements;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
    this.totalElementos = this.roles.length;

  }

  inicializarFiltroForm():void {
    this.filtroForm = this.formBuilder.group({
      nivel: [{value: null, disabled: false}],
      velatorio: [{value: null, disabled: false}],
      delegacion: [{value: null, disabled: false}],
      estatus: [{value: null, disabled: false}],
      alta: [{value: false, disabled: false}],
      baja: [{value: false, disabled: false}],
      aprobacion: [{value: false, disabled: false}],
      consulta: [{value: false, disabled: false}],
      modificar: [{value: false, disabled: false}],
      imprimir: [{value: false, disabled: false}]
    });
  }

  abrirModalDetalleRol(rolSeleccionado: Rol):void {
    this.rolSeleccionado = {...rolSeleccionado};
    this.mostrarModalDetalleRol = true;
  }

  abrirPanel(event: MouseEvent, rolSeleccionado: Rol):void {
    this.rolSeleccionado = rolSeleccionado;
    this.overlayPanel.toggle(event);
  }

}
