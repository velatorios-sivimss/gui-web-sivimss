import {BreadcrumbService} from "../../../../shared/breadcrumb/services/breadcrumb.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {Component, OnInit, ViewChild} from '@angular/core';
import {OverlayPanel} from "primeng-lts/overlaypanel";
import {LazyLoadEvent} from "primeng-lts/api";
import {Proveedores } from "../../models/proveedores.interface";
import {DIEZ_ELEMENTOS_POR_PAGINA} from "../../../../utils/constantes";
import { AgregarProveedorComponent } from "../agregar-proveedor/agregar-proveedor.component";
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';

@Component({
  selector: 'app-administrar-proveedores',
  templateUrl: './administrar-proveedores.component.html',
  styleUrls: ['./administrar-proveedores.component.scss'],
  providers: [DialogService]
})
export class AdministrarProveedoresComponent implements OnInit {
  @ViewChild(OverlayPanel)
  overlayPanel: OverlayPanel;

  constructor(
    private formBuilder: FormBuilder,
    private alertaService: AlertaService,
    private breadcrumbService: BreadcrumbService,
    public dialogService: DialogService,
  ) {
  }

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;
  proveedorSeleccionado: Proveedores = null;
  filtroForm: FormGroup;
  usuarios: Proveedores[] = [];
  // totalElementos: number = 0;
  agregarProveedorForm: FormGroup;
  agregarDireccionFiscalForm: FormGroup;
  formDireccionReferencia: FormGroup;
  modificarProveedorForm: FormGroup;
  editarDireccionForm: FormGroup;

  mostrarModalAgregarProveedor: boolean = false;
  mostrarModalConfModProveedor: boolean = false;
  mostrarModalModificarProveedor: boolean = false;
  mostrarModalDetalleProveedor: boolean = false;

  mostrarformDireccionFiscal: boolean = false;
  mostrarDireccionReferencia: boolean = false;

  creacionRef: DynamicDialogRef
  detalleRef: DynamicDialogRef;
  modificacionRef: DynamicDialogRef;

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

  ngOnInit(): void {
    this.breadcrumbService.actualizar([
      {
        icono: 'imagen-icono-operacion-sivimss.svg',
        titulo: 'Administración de proveedores'
      },
      {
        icono: '',
        titulo: 'Administrar proveedores'
      }
    ]);
    this.inicializarFiltroForm();
  }

  checkOnClick() {
    this.inicializarDireccionReferenciaForm();
    if(this.mostrarDireccionReferencia == false){
      this.mostrarDireccionReferencia = true;
    }else{
      this.mostrarDireccionReferencia = false;
    }

}

  inicializarFiltroForm() {
    this.filtroForm = this.formBuilder.group({
      nivel: [{value: null, disabled: false}, Validators.required],
      velatorio: [{value: null, disabled: false}],
      delegacion: [{value: null, disabled: false}],
      rol: [{value: null, disabled: false}]
    });
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

  inicializarAgregarProveedorForm() {
    this.agregarProveedorForm = this.formBuilder.group({
      id: [{value: 1, disabled: true}],
      nombre: [{value: null, disabled: false}, [Validators.required]],
      banco: [{value: null, disabled: false}, [Validators.required]],
      cuenta: [{value: null, disabled: false}, [Validators.required]],
      clabeBancaria: [{value: null, disabled: false}, [Validators.required]],
      tipoProveedor: [{value: null, disabled: false}, [Validators.required]],
      rfc: [{value: null, disabled: false}, [Validators.required]],
      curp: [{value: null, disabled: false}, [Validators.required]],
      tipoContrato: [{value: null, disabled: false}, [Validators.required]],
      fechaDesde: [{value: null, disabled: false}, [Validators.required]],
      fechaHasta: [{value: null, disabled: false}, [Validators.required]],
      telefono: [{value: null, disabled: false}, [Validators.required]],
      correoElectronico: [{value: null, disabled: false}, [Validators.required]],
      regimen: [{value: null, disabled: false}, [Validators.required]],
      representanteLegal: [{value: null, disabled: false}, [Validators.required]],
    });
  }

  inicializarModificarProveedorForm():void {
    this.modificarProveedorForm = this.formBuilder.group({
      id: [{value: 1, disabled: true}],
      nombre: [{value: null, disabled: false}, [Validators.required]],
      banco: [{value: null, disabled: false}, [Validators.required]],
      cuenta: [{value: null, disabled: false}, [Validators.required]],
      clabeBancaria: [{value: null, disabled: false}, [Validators.required]],
      tipoProveedor: [{value: null, disabled: false}, [Validators.required]],
      rfc: [{value: null, disabled: false}, [Validators.required]],
      curp: [{value: null, disabled: false}, [Validators.required]],
      tipoContrato: [{value: null, disabled: false}, [Validators.required]],
      fechaDesde: [{value: null, disabled: false}, [Validators.required]],
      fechaHasta: [{value: null, disabled: false}, [Validators.required]],
      telefono: [{value: null, disabled: false}, [Validators.required]],
      correoElectronico: [{value: null, disabled: false}, [Validators.required]],
      regimen: [{value: null, disabled: false}, [Validators.required]],
      representanteLegal: [{value: null, disabled: false}, [Validators.required]],
      // estatus: [{value: null, disabled: false}],
    });
  }

  inicializaragregarDireccionFiscalForm():void {
    this.agregarDireccionFiscalForm = this.formBuilder.group({
      codigoPostal: [{value: null, disabled: false}, [Validators.required]],
      calle: [{value: null, disabled: false}, [Validators.required]],
      noExterior: [{value: null, disabled: false}, [Validators.required]],
      noInterior: [{value: null, disabled: false}, [Validators.required]],
      pais: [{value: null, disabled: false}, [Validators.required]],
      estado: [{value: null, disabled: false}, [Validators.required]],
      municipio: [{value: null, disabled: false}, [Validators.required]],
    });
  }

  inicializarDireccionReferenciaForm():void {
    this.formDireccionReferencia = this.formBuilder.group({
      codigoPostal: [{value: null, disabled: false}, [Validators.required]],
      calle: [{value: null, disabled: false}, [Validators.required]],
      noExterior: [{value: null, disabled: false}, [Validators.required]],
      noInterior: [{value: null, disabled: false}, [Validators.required]],
      pais: [{value: null, disabled: false}, [Validators.required]],
      estado: [{value: null, disabled: false}, [Validators.required]],
      municipio: [{value: null, disabled: false}, [Validators.required]],
    });
  }

  abrirPanel(event:MouseEvent, usuario: any):void {
    this.proveedorSeleccionado = usuario;
    this.overlayPanel.toggle(event);
  }

  // abrirModalAgregarUsuario():void {
  //   this.inicializarAgregarProveedorForm();
  //   this.mostrarModalAgregarProveedor = true;
  // }

  abrirModalAgregarProveedor(): void {
    this.creacionRef = this.dialogService.open(AgregarProveedorComponent, {
      header: "Agregar proveedor",
      width: "876px"
    });
  }

  abrirModalModificarUsuario():void {
    this.inicializarModificarProveedorForm();
    this.mostrarModalModificarProveedor = true;
  }

  abrirModalDetalleUsuario(usuario:Proveedores):void {
    this.proveedorSeleccionado = {...usuario};
    this.mostrarModalDetalleProveedor = true;
  }

  abrirModalDetalleProveedorForm():void {
    // this.proveedorSeleccionado = {...usuario};
    this.mostrarModalDetalleProveedor = true;
    this.mostrarModalAgregarProveedor = false;
  }

  agregarDireccionFiscal():void {
    this.inicializaragregarDireccionFiscalForm();
    this.mostrarformDireccionFiscal = true
    // this.alertaService.mostrar(TipoAlerta.Exito, 'Usuario guardado');
  }

  regresarAgregarProveedor(){
    this.mostrarformDireccionFiscal = false;
    this.mostrarDireccionReferencia = false;
  }

  get f() {
    return this.filtroForm.controls;
  }

  get fau() {
    return this.agregarProveedorForm.controls;
  }

  get fmu(){
    return this.modificarProveedorForm.controls;
  }

}
