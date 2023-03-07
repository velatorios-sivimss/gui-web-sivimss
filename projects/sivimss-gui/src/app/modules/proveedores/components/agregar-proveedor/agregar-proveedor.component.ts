import {BreadcrumbService} from "../../../../shared/breadcrumb/services/breadcrumb.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {Component, OnInit, ViewChild} from '@angular/core';
import {OverlayPanel} from "primeng-lts/overlaypanel";
import {LazyLoadEvent} from "primeng-lts/api";
import {Proveedores } from "../../models/proveedores.interface";
import {DIEZ_ELEMENTOS_POR_PAGINA} from "../../../../utils/constantes";
import {DynamicDialogModule} from 'primeng-lts/dynamicdialog';
import { MenuItem } from 'primeng-lts/api';
import { DropdownItem } from 'primeng-lts/dropdown';
import { DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { compileNgModule } from "@angular/compiler";
import { MENU_STEPPER } from "../../constants/menu-steppers";


@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.scss']
})
export class AgregarProveedorComponent implements OnInit {
  @ViewChild(OverlayPanel)
  overlayPanel: OverlayPanel;

  constructor(
    private formBuilder: FormBuilder,
    private alertaService: AlertaService,
    private breadcrumbService: BreadcrumbService,
    public ref: DynamicDialogRef
  ) {
  }

  // menuStep: MenuItem[] = MENU_STEPPER;
  indice: number = 0;

  proveedorSeleccionado: Proveedores = null;

  responsables: DropdownItem[] = [];
  tiposVehiculo: DropdownItem[] = [];
  usos: DropdownItem[] = [];
  velatorios: DropdownItem[] = [];
  menuStep: MenuItem[] = MENU_STEPPER;

  agregarProveedorForm: FormGroup;
  agregarDireccionFiscalForm: FormGroup;
  formDireccionReferencia: FormGroup;

  // mostrarModalAgregarProveedor: boolean = false;
  // mostrarModalConfModProveedor: boolean = false;
  // mostrarModalModificarProveedor: boolean = false;
  mostrarformDireccionFiscal: boolean = false;
  mostrarDireccionReferencia: boolean = false;
  mostrarModalAgregarProveedor: boolean = true;
  mostrarModalDetalleProveedor: boolean = false;

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
    console.log("hola desde administración");

    this.inicializarAgregarProveedorForm();
  }

  checkOnClick() {
    this.inicializarDireccionReferenciaForm();
    if(this.mostrarDireccionReferencia == false){
      this.mostrarDireccionReferencia = true;
    }else{
      this.mostrarDireccionReferencia = false;
    }

}

  // inicializarFiltroForm() {
  //   this.filtroForm = this.formBuilder.group({
  //     nivel: [{value: null, disabled: false}, Validators.required],
  //     velatorio: [{value: null, disabled: false}],
  //     delegacion: [{value: null, disabled: false}],
  //     rol: [{value: null, disabled: false}]
  //   });
  // }

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

  // get f() {
  //   return this.filtroForm.controls;
  // }

  // abrirModalDetalleUsuario(usuario:Proveedores):void {
  //   this.proveedorSeleccionado = {...usuario};
  //   this.mostrarModalDetalleProveedor = true;
  // }

  abrirModalDetalleProveedorForm():void {
    // this.proveedorSeleccionado = {...usuario};
    this.mostrarModalDetalleProveedor = true;
    this.mostrarModalAgregarProveedor = false;
    this.mostrarformDireccionFiscal = false;
    this.mostrarDireccionReferencia = false

  }

  agregarDireccionFiscal():void {
    this.inicializaragregarDireccionFiscalForm();
    this.mostrarformDireccionFiscal = true
    this.mostrarModalAgregarProveedor = false
    // this.alertaService.mostrar(TipoAlerta.Exito, 'Usuario guardado');
  }

  regresarAgregarProveedor(){
    this.mostrarformDireccionFiscal = false;
    this.mostrarDireccionReferencia = false;
  }


  get agregarProveedor() {
    return this.agregarProveedorForm.controls;
  }

  get direccionFiscal(){
    return this.agregarDireccionFiscalForm.controls;
  }

  get direccionReferencia(){
    return this.formDireccionReferencia.controls;
  }

  // get fmu(){
  //   return this.modificarProveedorForm.controls;
  // }




}
