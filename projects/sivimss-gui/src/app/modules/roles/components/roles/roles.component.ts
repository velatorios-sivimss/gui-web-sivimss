import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertaService} from "../../../../shared/alerta/services/alerta.service";
import {BreadcrumbService} from "../../../../shared/breadcrumb/services/breadcrumb.service";
import {LazyLoadEvent} from "primeng-lts/api";
import {DIEZ_ELEMENTOS_POR_PAGINA} from "../../../../utils/constantes";
import {OverlayPanel} from "primeng-lts/overlaypanel";
import {Rol} from "../../models/rol.interface";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

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

  filtroForm: FormGroup;

  roles: Rol[] = [];

  rolSeleccionado: Rol = null;
  mostrarModalDetalleRol: boolean = false;

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
    setTimeout(() => {
      this.roles = [
        {
          id: 1,
          nombre: 'COORDINADOR DE CENTROS VACACIONALES, VELATORIOS, UNIDAD DE CONGRESOS Y TIENDAS',
          nivel: 'Central',
          fechaCreacion: '01/01/2022',
          estatus: true,
          delegacion: 'Edo. México Poniente',
          velatorio: 'No. 9 Toluca',
          funcionalidades: [
            {
              id: '4567890',
              nombre: 'Consulta diosponibilidad de capillas',
              alta:false,
              baja:true,
              aprobacion:true,
              imprimir:false,
              modificar:false,
              consulta:true
            }
          ]
        },
        {
          id: 2,
          nombre: 'DIRECTOR DE ATENCIÓN A CLIENTES ',
          nivel: 'Central',
          fechaCreacion: '02/01/2022',
          estatus: true,
          delegacion: 'Edo. México Poniente',
          velatorio: 'No. 9 Toluca',
          funcionalidades: [
            {
              id: '4567890',
              nombre: 'Consulta diosponibilidad de capillas',
              alta:false,
              baja:true,
              aprobacion:true,
              imprimir:false,
              modificar:false,
              consulta:true
            }
          ]
        },
        {
          id: 3,
          nombre: 'COORDINADOR DE BAJAS, REMATES E INVENTARIO DE VELATORIOS',
          nivel: 'Central',
          fechaCreacion: '01/01/2022',
          estatus: false,
          delegacion: 'Edo. México Poniente',
          velatorio: 'No. 9 Toluca',
          funcionalidades: [
            {
              id: '4567890',
              nombre: 'Consulta diosponibilidad de capillas',
              alta:false,
              baja:true,
              aprobacion:true,
              imprimir:false,
              modificar:false,
              consulta:true
            }
          ]
        },
        {
          id: 4,
          nombre: 'JEFE DE UNIDADES DE TRANSPORTE Y GESTIÓN DE TRASLADOS',
          nivel: 'Central',
          fechaCreacion: '10/02/2022',
          estatus: false,
          delegacion: 'Edo. México Poniente',
          velatorio: 'No. 9 Toluca',
          funcionalidades: [
            {
              id: '4567890',
              nombre: 'Consulta diosponibilidad de capillas',
              alta:false,
              baja:true,
              aprobacion:true,
              imprimir:false,
              modificar:false,
              consulta:true
            }
          ]
        }
      ];
      this.totalElementos = this.roles.length;
    }, 0);
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
