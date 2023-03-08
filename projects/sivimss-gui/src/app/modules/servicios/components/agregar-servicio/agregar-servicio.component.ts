import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


import {DialogService, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {Servicio} from "../../models/servicio.interface";

@Component({
  selector: 'app-agregar-servicio',
  templateUrl: './agregar-servicio.component.html',
  styleUrls: ['./agregar-servicio.component.scss'],
  providers: [DialogService]
})
export class AgregarServicioComponent implements OnInit {

  agregarServicioForm!: FormGroup;

  servicio:Servicio = {};


  confirmacionAgregarServicio: boolean = false;

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

  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.inicializarAgregarServicioForm();
  }

  inicializarAgregarServicioForm():void{
    this.agregarServicioForm = this.formBuilder.group({
      id: [{value:null, disabled:true}],
      servicio: [{value:null,disabled:false},[Validators.required]],
      descripcion: [{value:null,disabled:false},[Validators.required]],
      tipoServicio: [{value:null,disabled:false},[Validators.required]],
      partidaPresupuestal: [{value:null,disabled:false},[Validators.required]],
      cuentaContable: [{value:null,disabled:false},[Validators.required]],
      observaciones: [{value:null,disabled:false},[Validators.required]],
      estatus: [{value:true,disabled:false},[Validators.required]],
      claveSAT: [{value:null,disabled:false},[Validators.required]],
    });
  }

  confirmarAgregarServicio(): void {
    this.confirmacionAgregarServicio = true;
    /*
    * Se mandará solo texto para que el detalle solo lo imprim por lo que se deben llenar las variables
    * que son 'desc'*/
    this.servicio = {
      id: this.agregarServicioForm.get("id")?.value,
      servicio: this.agregarServicioForm.get("servicio")?.value,
      descripcionServicio:this.agregarServicioForm.get("descripcion")?.value,
      tipoServicio: this.agregarServicioForm.get("tipoServicio")?.value,
      descTipoServicio: "Campo dummy",
      partidaPresupuestal: this.agregarServicioForm.get("partidaPresupuestal")?.value,
      descPartidaPresupuestal: "Campo dummy",
      cuentaContable: this.agregarServicioForm.get("cuentaContable")?.value,
      descCuentaContable: "Campo dummy",
      observaciones: this.agregarServicioForm.get("observaciones")?.value,
      estatus: this.agregarServicioForm.get("estatus")?.value,
      claveSAT:this.agregarServicioForm.get("claveSAT")?.value
    };
  }

  cerrar(event?:boolean): void {
    if(event){
      this.confirmacionAgregarServicio = false;
      return;
    }
    this.ref.close({ "estatus":true});
  }

  get fas(){
    return this.agregarServicioForm.controls;
  }
}
