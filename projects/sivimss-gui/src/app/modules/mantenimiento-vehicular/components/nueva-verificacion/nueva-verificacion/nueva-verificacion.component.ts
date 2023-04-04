import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MENU_STEPPER } from '../../../../inventario-vehicular/constants/menu-stepper';
import { MenuItem } from 'primeng-lts/api';
import { CATALOGOS_DUMMIES } from '../../../../inventario-vehicular/constants/dummies';
import { TipoDropdown } from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayPanel } from 'primeng-lts/overlaypanel';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { ConfirmacionServicio, Vehiculos } from '../../../models/vehiculos.interface';
 import { AbstractControl, FormArray} from "@angular/forms";

import { Funcionalidad } from "projects/sivimss-gui/src/app/modules/roles/models/funcionalidad.interface";
import { AlertaService, TipoAlerta } from "projects/sivimss-gui/src/app/shared/alerta/services/alerta.service";
import { BreadcrumbService } from "projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service";
import { ActivatedRoute } from '@angular/router';
// import { log } from 'console';



@Component({
  selector: 'app-nueva-verificacion',
  templateUrl: './nueva-verificacion.component.html',
  styleUrls: ['./nueva-verificacion.component.scss'],
  providers: [DialogService]
})
export class NuevaVerificacionComponent implements OnInit {

  @Input() vehiculoSeleccionado!: Vehiculos;
  @Input() origen!: string;
  @Output() confirmacionAceptar = new EventEmitter<ConfirmacionServicio>();
  creacionRef!: DynamicDialogRef;

  menuStep: MenuItem[] = MENU_STEPPER;
  indice: number = 0;
  direccionReferencia: boolean = false;

  responsables: TipoDropdown[] = CATALOGOS_DUMMIES;
  tiposProveedor: TipoDropdown[] = CATALOGOS_DUMMIES;
  usos: TipoDropdown[] = CATALOGOS_DUMMIES;
  velatorios: TipoDropdown[] = CATALOGOS_DUMMIES;
  numerosSerie: TipoDropdown[] = CATALOGOS_DUMMIES;

  nuevaVerificacionForm!: FormGroup;
  selectedNivelAceite: boolean = false;

  nuevaVerificacion!: Vehiculos;
  vehiculo:Vehiculos = {};
  // vehiculoSeleccionado!: Vehiculos;

  ventanaConfirmacion: boolean = false;

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private breadcrumbService: BreadcrumbService,
    private alertaService: AlertaService,
    private route: ActivatedRoute,

  ) {  this.vehiculoSeleccionado = this.config.data; }

  ngOnInit(): void {

    if (this.config?.data) {
      this.origen = this.config.data.origen;
        this.vehiculoSeleccionado = this.config.data.vehiculo;
    }

    console.log('holaaa')
    console.log('velatiors___:'+this.vehiculoSeleccionado.velatorio);
     this.vehiculoSeleccionado
     this.vehiculoSeleccionado.velatorio
     this.inicializarAgregarCapillaForm(this.vehiculoSeleccionado);
  }

  OnOfSeleccion(){

  }



  inicializarAgregarCapillaForm(vehiculoSeleccionado: Vehiculos) {
    this.nuevaVerificacionForm = this.formBuilder.group({
      velatorio: [{value: vehiculoSeleccionado.velatorio, disabled: true}],
      fecha: [{value: vehiculoSeleccionado.fecha, disabled: false}, [Validators.required]],
      hora: [{value: vehiculoSeleccionado.hora, disabled: false}, [Validators.required]],
      vehiculo: [{value: vehiculoSeleccionado.vehiculo, disabled: false}, [Validators.required]],
      placas: [{value: vehiculoSeleccionado.placas, disabled: false}, [Validators.required]],
      nivelAceite: [{value: vehiculoSeleccionado.nivelAceite, disabled: false}],


      nivelAgua: [{value: vehiculoSeleccionado.nivelAgua, disabled: false}],

      calibracionNeumaticosTraseros: [{value: vehiculoSeleccionado.calibracionNeumaticosTraseros, disabled: false}],

      calibracionNeumaticosDelanteros: [{value: vehiculoSeleccionado.calibracionNeumaticosDelanteros, disabled: false}],

      nivelCombustible: [{value: vehiculoSeleccionado.nivelCombustible, disabled: false}],

      nivelBateria: [{value: vehiculoSeleccionado.nivelBateria, disabled: false}],

      limpiezaInterior: [{value: vehiculoSeleccionado.limpiezaInterior, disabled: false}],
      limpiezaExterior: [{value: vehiculoSeleccionado.limpiezaExterior, disabled: false}],


      codigoFalla: [{value: vehiculoSeleccionado.codigoFalla, disabled: false}],

    });
  }



  regresarPagina(): void {
    this.indice--;
  }

  cancelar(): void {
    this.ref.close()
  }

  // cerrar(event?:ConfirmacionServicio): void {
  //   //Selección cancelar pantalla agregar
  //   if(event && event.origen == "agregar"){
  //     this.ventanaConfirmacion = false;
  //     this.ref.close(true);
  //     return;
  //   }
  // }

  get nvf() {
    return this.nuevaVerificacionForm.controls;
  }




}
