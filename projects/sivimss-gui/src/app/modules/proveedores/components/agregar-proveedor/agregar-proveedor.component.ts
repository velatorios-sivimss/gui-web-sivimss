import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng-lts/api';
import { DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { TipoDropdown } from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import { CATALOGOS_DUMMIES } from '../../constants/dummies';
import { MENU_STEPPER } from '../../constants/menu-stepper';
import { Proveedores } from '../../models/proveedores.interface';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.scss']
})
export class AgregarProveedorComponent implements OnInit {

  menuStep: MenuItem[] = MENU_STEPPER;
  indice: number = 0;
  direccionReferencia: boolean = false;

  responsables: TipoDropdown[] = CATALOGOS_DUMMIES;
  tiposProveedor: TipoDropdown[] = CATALOGOS_DUMMIES;
  usos: TipoDropdown[] = CATALOGOS_DUMMIES;
  velatorios: TipoDropdown[] = CATALOGOS_DUMMIES;
  numerosSerie: TipoDropdown[] = CATALOGOS_DUMMIES;

  agregarProveedorForm!: FormGroup;
  agregarDireccionFiscalForm!: FormGroup;
  formDireccionReferencia!: FormGroup;

  nuevoProveedor!: Proveedores;

  constructor(private formBuilder: FormBuilder,
    public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.inicializarAgregarProveedorForm();
    this.inicializaragregarDireccionFiscalForm();
  }

   inicializarAgregarProveedorForm() {
    this.agregarProveedorForm = this.formBuilder.group({
      id: [{value: 1, disabled: true}],
      nombre: [{value: null, disabled: false}, [Validators.required]],
      banco: [{value: null, disabled: false}, [Validators.required]],
      cuenta: [{value: null, disabled: false}, [Validators.required]],
      claveBancaria: [{value: null, disabled: false}, [Validators.required]],
      tipoProveedor: [{value: null, disabled: false}, [Validators.required]],
      rfc: [{value: null, disabled: false}, [Validators.required]],
      curp: [{value: null, disabled: false}, [Validators.required]],
      tipoContrato: [{value: null, disabled: false}, [Validators.required]],
      vigenciaDesde: [{value: null, disabled: false}, [Validators.required]],
      vigenciaHasta: [{value: null, disabled: false}, [Validators.required]],
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
      numExterior: [{value: null, disabled: false}, [Validators.required]],
      numInterior: [{value: null, disabled: false}, [Validators.required]],
      pais: [{value: null, disabled: false}, [Validators.required]],
      estado: [{value: null, disabled: false}, [Validators.required]],
      municipio: [{value: null, disabled: false}, [Validators.required]],
    });
  }

  inicializarDireccionReferenciaForm():void {
    this.formDireccionReferencia = this.formBuilder.group({
      codigoPostalReferencia: [{value: null, disabled: false}, [Validators.required]],
      calleReferencia: [{value: null, disabled: false}, [Validators.required]],
      numExteriorReferencia: [{value: null, disabled: false}, [Validators.required]],
      numInteriorReferencia: [{value: null, disabled: false}, [Validators.required]],
      paisReferencia: [{value: null, disabled: false}, [Validators.required]],
      estadoReferencia: [{value: null, disabled: false}, [Validators.required]],
      municipioReferencia: [{value: null, disabled: false}, [Validators.required]],
    });
  }


  adelantarPagina(): void {
    this.indice++;
    if (this.indice === this.menuStep.length) {
      this.crearResumenProveedor();
    }
  }

  regresarPagina(): void {
    this.indice--;
  }

  cancelar(): void {
    this.ref.close()
  }

  crearResumenProveedor(): void {
    this.nuevoProveedor = {
      id: null,
      ...this.agregarProveedorForm.value,
      ...this.agregarDireccionFiscalForm.value,
      ...this.formDireccionReferencia.value
    }
  }

  abrirAgregarDireccionReferencia() {
   if(this.direccionReferencia == false){
     this.direccionReferencia = true;
    //  this.inicializarDireccionReferenciaForm();
   }else{
    this.direccionReferencia = false;
    // this.formDireccionReferencia.reset;
   }

}

  get apf() {
    return this.agregarProveedorForm.controls;
  }

  get adf() {
    return this.agregarDireccionFiscalForm.controls;
  }
  get adrf() {
    return this.formDireccionReferencia.controls;
  }


}
