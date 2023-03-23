import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DIEZ_ELEMENTOS_POR_PAGINA } from "../../../../utils/constantes";
import { LazyLoadEvent } from "primeng-lts/api";
import { OverlayPanel } from "primeng-lts/overlaypanel";
import { AlertaService, TipoAlerta } from "../../../../shared/alerta/services/alerta.service";
import { BreadcrumbService } from "../../../../shared/breadcrumb/services/breadcrumb.service";
import { Usuario } from "../../models/usuario.interface";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

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

  usuarios: Usuario[] = [];
  usuarioSeleccionado!: Usuario;

  filtroForm!: FormGroup;
  agregarUsuarioForm!: FormGroup;
  modificarUsuarioForm!: FormGroup;

  mostrarModalAgregarUsuario: boolean = false;
  mostrarModalModificarUsuario: boolean = false;
  mostrarModalDetalleUsuario: boolean = false;
  mostrarModalConfModUsuario: boolean = false;

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
        titulo: 'Administrar usuarios'
      }
    ]);
    this.inicializarFiltroForm();
  }

  paginar(event: LazyLoadEvent): void {
    setTimeout(() => {
      this.usuarios = [
        {
          id: 1,
          curp: 'AROER762010HDFNCOO',
          matricula: '473653728',
          usuario: 'armraf',
          nombre: 'Armando Rafaelo',
          primerApellido: 'De la Ibargüengoitia',
          segundoApellido: 'Aramburuzabala',
          estatus: true,
          correoElectronico: 'correo@correo.com',
          nivel: 'Central',
          rol: 'COORDINADOR DE CENTROS VACACIONALES, VELATORIOS, UNIDAD DE CONGRESOS Y TIENDAS',
        },
        {
          id: 2,
          curp: 'AROER762010HDFNCOO',
          matricula: '473653728',
          usuario: 'armraf',
          nombre: 'Armando Rafaelo',
          primerApellido: 'De la Ibargüengoitia',
          segundoApellido: 'Aramburuzabala',
          estatus: true,
          correoElectronico: 'correo@correo.com',
          nivel: 'Central',
          rol: 'COORDINADOR DE CENTROS VACACIONALES, VELATORIOS, UNIDAD DE CONGRESOS Y TIENDAS',
        },
        {
          id: 3,
          curp: 'AROER762010HDFNCOO',
          matricula: '473653728',
          usuario: 'armraf',
          nombre: 'Armando Rafaelo',
          primerApellido: 'De la Ibargüengoitia',
          segundoApellido: 'Aramburuzabala',
          estatus: true,
          correoElectronico: 'correo@correo.com',
          nivel: 'Central',
          rol: 'COORDINADOR DE CENTROS VACACIONALES, VELATORIOS, UNIDAD DE CONGRESOS Y TIENDAS',
        }
      ];
      this.totalElementos = 3;
    }, 0);
  }

  abrirPanel(event: MouseEvent, usuario: any): void {
    this.usuarioSeleccionado = usuario;
    this.overlayPanel.toggle(event);
  }

  abrirModalAgregarUsuario(): void {
    this.inicializarAgregarUsuarioForm();
    this.mostrarModalAgregarUsuario = true;
  }

  abrirModalModificarUsuario(): void {
    this.inicializarModificarUsuarioForm();
    this.mostrarModalModificarUsuario = true;
  }

  abrirModalDetalleUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = {...usuario};
    this.mostrarModalDetalleUsuario = true;
  }

  inicializarFiltroForm() {
    this.filtroForm = this.formBuilder.group({
      nivel: [{value: null, disabled: false}, Validators.required],
      velatorio: [{value: null, disabled: false}],
      delegacion: [{value: null, disabled: false}],
      rol: [{value: null, disabled: false}]
    });
  }

  inicializarAgregarUsuarioForm() {
    this.agregarUsuarioForm = this.formBuilder.group({
      id: [{value: 1, disabled: true}],
      curp: [{value: null, disabled: false}, [Validators.required]],
      matricula: [{value: null, disabled: false}, [Validators.required]],
      nombre: [{value: null, disabled: false}, [Validators.required]],
      primerApellido: [{value: null, disabled: false}, [Validators.required]],
      segundoApellido: [{value: null, disabled: false}, [Validators.required]],
      correoElectronico: [{value: null, disabled: false}, [Validators.required]],
      fechaNacimiento: [{value: null, disabled: false}, [Validators.required]],
      nivel: [{value: null, disabled: false}, [Validators.required]],
      delegacion: [{value: null, disabled: false}, [Validators.required]],
      velatorio: [{value: null, disabled: false}, [Validators.required]],
      rol: [{value: null, disabled: false}, [Validators.required]],
      estatus: [{value: true, disabled: false}]
    });
  }

  inicializarModificarUsuarioForm(): void {
    this.modificarUsuarioForm = this.formBuilder.group({
      id: [{value: 1, disabled: true}],
      curp: [{value: null, disabled: false}, [Validators.required]],
      matricula: [{value: null, disabled: false}, [Validators.required]],
      nombre: [{value: null, disabled: false}, [Validators.required]],
      primerApellido: [{value: null, disabled: false}, [Validators.required]],
      segundoApellido: [{value: null, disabled: false}, [Validators.required]],
      correoElectronico: [{value: null, disabled: false}, [Validators.required]],
      fechaNacimiento: [{value: null, disabled: false}, [Validators.required]],
      nivel: [{value: null, disabled: false}, [Validators.required]],
      delegacion: [{value: null, disabled: false}, [Validators.required]],
      velatorio: [{value: null, disabled: false}, [Validators.required]],
      rol: [{value: null, disabled: false}, [Validators.required]],
      estatus: [{value: true, disabled: false}]
    });
  }

  agregarUsuario(): void {
    this.alertaService.mostrar(TipoAlerta.Exito, 'Usuario guardado');
  }

  modificarUsuario(): void {
  }

  get f() {
    return this.filtroForm.controls;
  }

  get fau() {
    return this.agregarUsuarioForm.controls;
  }

  get fmu() {
    return this.modificarUsuarioForm.controls;
  }

}
