import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { TipoDropdown } from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import { CATALOGOS_DUMMIES } from '../../constants/dummies';
import { Articulos, ConfirmacionServicio } from '../../models/articulos.interface';

@Component({
  selector: 'app-agregar-articulos',
  templateUrl: './agregar-articulos.component.html',
  styleUrls: ['./agregar-articulos.component.scss'],
  providers: [DialogService]
})
export class AgregarArticulosComponent implements OnInit {

  agregarArticuloForm!: FormGroup;

  articulos:Articulos = {};


 ventanaConfirmacion: boolean = false;

  opciones: TipoDropdown[] = CATALOGOS_DUMMIES;
  tipoServicio: TipoDropdown[] = CATALOGOS_DUMMIES;
  cuentaContable: TipoDropdown[] = CATALOGOS_DUMMIES;
  partidaPresupuestal: TipoDropdown[] = CATALOGOS_DUMMIES;
  claveSAT: TipoDropdown[] = CATALOGOS_DUMMIES;
  estatus: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.estatus = true;
    this.inicializarAgregarServicioForm();
  }

  inicializarAgregarServicioForm():void{
    this.agregarArticuloForm = this.formBuilder.group({
      id: [{value:null, disabled:true}],
      categoria: [{value:null,disabled:false},[Validators.required]],
      tipoDeArticulo: [{value:null,disabled:false},[Validators.required]],
      tipoDeMaterial: [{value:null,disabled:false},[Validators.required]],
      tamanio: [{value:null,disabled:false},[Validators.required]],
      clasificacionDeProducto: [{value:null,disabled:false},[Validators.required]],
      modeloDeArticulo: [{value:null,disabled:false},[Validators.required]],
      descripcionDeProducto: [{value:null,disabled:false},[Validators.required]],
      largo: [{value:null,disabled:false},[Validators.required]],
      ancho: [{value:null,disabled:false},[Validators.required]],
      alto: [{value:null,disabled:false},[Validators.required]],
      estatus: [{value: true, disabled: false}],
      claveSAT: [{value:null,disabled:false},[Validators.required]],
      cuentaClave: [{value:null,disabled:false},[Validators.required]],
      cuentaContable: [{value:null,disabled:false},[Validators.required]],
      partidaPresupuestal: [{value:null,disabled:false},[Validators.required]],
    });
  }

  confirmarAgregarServicio(): void {
    this.ventanaConfirmacion = true;
    /*
    * Se mandará solo texto para que el detalle solo lo imprim por lo que se deben llenar las variables
    * que son 'desc'*/
    this.articulos = {
      id: this.agregarArticuloForm.get("id")?.value,
      categoria: this.agregarArticuloForm.get("categoria")?.value,
      tipoDeArticulo:this.agregarArticuloForm.get("tipoDeArticulo")?.value,
      tipoDeMaterial: this.agregarArticuloForm.get("tipoDeMaterial")?.value,
      tamanio: this.agregarArticuloForm.get("tamanio")?.value,
      clasificacionDeProducto: this.agregarArticuloForm.get("clasificacionDeProducto")?.value,
      modeloDeArticulo: this.agregarArticuloForm.get("modeloDeArticulo")?.value,
      descripcionDeProducto: this.agregarArticuloForm.get("descripcionDeProducto")?.value,
      largo: this.agregarArticuloForm.get("largo")?.value,
      ancho: this.agregarArticuloForm.get("ancho")?.value,
      alto: this.agregarArticuloForm.get("alto")?.value,
      estatus:this.agregarArticuloForm.get("estatus")?.value,
      claveSAT:this.agregarArticuloForm.get("claveSAT")?.value,
      cuentaClave:this.agregarArticuloForm.get("cuentaClave")?.value,
      cuentaContable:this.agregarArticuloForm.get("cuentaContable")?.value,
      partidaPresupuestal:this.agregarArticuloForm.get("partidaPresupuestal")?.value,
    };
  }

  cerrar(event?:ConfirmacionServicio): void {
    debugger;
    //Selección cancelar pantalla agregar
    if(event && event.origen == "agregar"){
      this.ventanaConfirmacion = false;
      this.ref.close(true);
      return;
    }

    if(event && event.origen == "regresar") {
      this.ventanaConfirmacion = false;
      return;
    }

    if(event && event.origen == "cancelar"){
      this.ventanaConfirmacion = false;
      return;
    }

    this.ref.close(false);

  }


  get faa(){
    return this.agregarArticuloForm.controls;
  }

}
