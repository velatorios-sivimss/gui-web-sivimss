import { Component, OnInit } from '@angular/core';

import {AlertaService,TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {Servicio} from "../../models/servicio.interface";

@Component({
  selector: 'app-modificar-servicio',
  templateUrl: './modificar-servicio.component.html',
  styleUrls: ['./modificar-servicio.component.scss']
})
export class ModificarServicioComponent implements OnInit {

  modificarServicioForm: FormGroup;
  servicio: Servicio;

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
    private alertaService: AlertaService,
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.inicializarModificarServicioForm();
  }

  inicializarModificarServicioForm(): void{
    this.modificarServicioForm = this.formBuilder.group({
      // id: [{value:null, disabled:true},[Validators.required]],
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


  get fms(){
    return this.modificarServicioForm.controls;
  }

  modificarServicio(): void{
    this.cerrar();
    this.alertaService.mostrar(TipoAlerta.Exito, 'Servicio modificado correctamente');
  }

  cerrar():void {
    this.ref.close();
  }

}
