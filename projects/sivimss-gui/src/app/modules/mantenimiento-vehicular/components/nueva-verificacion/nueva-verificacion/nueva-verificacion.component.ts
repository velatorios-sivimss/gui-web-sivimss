import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MENU_STEPPER} from '../../../../inventario-vehicular/constants/menu-stepper';
import {MenuItem} from 'primeng-lts/api';
import {CATALOGOS_DUMMIES} from '../../../../inventario-vehicular/constants/dummies';
import {TipoDropdown} from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OverlayPanel} from 'primeng-lts/overlaypanel';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng-lts/dynamicdialog';
import {ConfirmacionServicio, Vehiculos} from '../../../models/vehiculos.interface';
import {AbstractControl, FormArray} from "@angular/forms";

import {Funcionalidad} from "projects/sivimss-gui/src/app/modules/roles/models/funcionalidad.interface";
import {AlertaService, TipoAlerta} from "projects/sivimss-gui/src/app/shared/alerta/services/alerta.service";
import {BreadcrumbService} from "projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service";
import {ActivatedRoute, Router} from '@angular/router';
import {DetalleNuevaVerificacionComponent} from '../detalle-nueva-verificacion/detalle-nueva-verificacion.component';
import {VehiculoTemp} from "../../../models/vehiculo-temp.interface";
import {obtenerFechaActual, obtenerHoraActual} from "../../../../../utils/funciones-fechas";
import {VerificacionInicio} from "../../../models/verificacion-inicio.interface";

@Component({
  selector: 'app-nueva-verificacion',
  templateUrl: './nueva-verificacion.component.html',
  styleUrls: ['./nueva-verificacion.component.scss'],
  providers: [DialogService]
})
export class NuevaVerificacionComponent implements OnInit {

  @Input() vehiculoSeleccionado!: VehiculoTemp;
  @Input() origen!: string;
  @Output() confirmacionAceptar = new EventEmitter<ConfirmacionServicio>();
  creacionRef!: DynamicDialogRef;

  menuStep: MenuItem[] = MENU_STEPPER;
  indice: number = 0;

  velatorios: TipoDropdown[] = CATALOGOS_DUMMIES;

  nuevaVerificacionForm!: FormGroup;

  nuevaVerificacion!: VerificacionInicio;
  vehiculo: Vehiculos = {};

  ventanaConfirmacion: boolean = false;
  horaActual: string = obtenerHoraActual();
  fechaActual: string = obtenerFechaActual();

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
    private router: Router,
  ) {
    this.vehiculoSeleccionado = this.config.data.vehiculo;
  }

  ngOnInit(): void {
    this.origen = this.config.data.origen;
    this.vehiculoSeleccionado = this.config.data.vehiculo;
    this.inicializarVerificacionForm();
  }

  inicializarVerificacionForm() {
    this.nuevaVerificacionForm = this.formBuilder.group({
      nivelAceite: [{value: null, disabled: false}, [Validators.required]],
      nivelAgua: [{value: null, disabled: false}, [Validators.required]],
      calibracionNeumaticosTraseros: [{value: null, disabled: false}, [Validators.required]],
      calibracionNeumaticosDelanteros: [{value: null, disabled: false}, [Validators.required]],
      nivelCombustible: [{value: null, disabled: false}, [Validators.required]],
      nivelBateria: [{value: null, disabled: false}, [Validators.required]],
      limpiezaInterior: [{value: null, disabled: false}, [Validators.required]],
      limpiezaExterior: [{value: null, disabled: false}, [Validators.required]],
      codigoFalla: [{value: null, disabled: false}, [Validators.required]],
    });
  }

  obtenerValorNivel(valor: number): string {
    const valores: number[] = [0, 1, 2];
    if (!valores.includes(valor)) return "";
    if (valor === 0) return "BAJO";
    if (valor === 1) return "MEDIO";
    return "CORRECTO";
  }

  crearResumenNuevaVerificacion(): VerificacionInicio {
    return {
      idCalNeuDelanteros: this.obtenerValorNivel(+this.nuevaVerificacionForm.get("calibracionNeumaticosDelanteros")?.value),
      idCalNeuTraseros: this.obtenerValorNivel(+this.nuevaVerificacionForm.get("calibracionNeumaticosTraseros")?.value),
      idCodigoFallo: this.obtenerValorNivel(+this.nuevaVerificacionForm.get("codigoFalla")?.value),
      idLimpiezaExterior: this.obtenerValorNivel(+this.nuevaVerificacionForm.get("limpiezaExterior")?.value),
      idLimpiezaInterior: this.obtenerValorNivel(+this.nuevaVerificacionForm.get("limpiezaInterior")?.value),
      idMttoVehicular: this.obtenerValorNivel(+this.nuevaVerificacionForm.get("")?.value),
      idMttoVerifInicio: this.obtenerValorNivel(+this.nuevaVerificacionForm.get("")?.value),
      idNivelAceite: this.obtenerValorNivel(+this.nuevaVerificacionForm.get("nivelAceite")?.value),
      idNivelAgua: this.obtenerValorNivel(+this.nuevaVerificacionForm.get("nivelAgua")?.value),
      idNivelBateria: this.obtenerValorNivel(+this.nuevaVerificacionForm.get("nivelBateria")?.value),
      idNivelCombustible: this.obtenerValorNivel(+this.nuevaVerificacionForm.get("nivelCombustible")?.value)
    }
  }

  cancelar(): void {
    if (this.indice === 1) {
      this.indice--;
      return;
    }
    this.ref.close()
  }

  aceptar() {
    this.indice++;
    this.nuevaVerificacion = this.crearResumenNuevaVerificacion();
  }

  crearNuevaVerificacion() {
    this.alertaService.mostrar(TipoAlerta.Exito, 'Verificacion agregada correctamente');
    this.ref.close();
    this.abrirRegistroMantenimiento();
  }

  abrirRegistroMantenimiento(): void {
    this.router.navigate(['detalle-verificacion'], {relativeTo: this.route});
  }

  get nvf() {
    return this.nuevaVerificacionForm.controls;
  }

}
