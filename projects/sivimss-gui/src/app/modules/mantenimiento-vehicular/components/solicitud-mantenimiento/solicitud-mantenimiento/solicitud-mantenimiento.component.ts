import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng-lts/dynamicdialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreadcrumbService} from 'projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service';
import {AlertaService} from 'projects/sivimss-gui/src/app/shared/alerta/services/alerta.service';
import {ActivatedRoute} from '@angular/router';
import {TipoDropdown} from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import {CATALOGOS_DUMMIES, CATALOGOS_TTIPO_MANTENIMIENTO} from '../../../../inventario-vehicular/constants/dummies';
import {VehiculoTemp} from "../../../models/vehiculo-temp.interface";

@Component({
  selector: 'app-solicitud-mantenimiento',
  templateUrl: './solicitud-mantenimiento.component.html',
  styleUrls: ['./solicitud-mantenimiento.component.scss'],
  providers: [DialogService]
})
export class SolicitudMantenimientoComponent implements OnInit {
  ventanaConfirmacion: boolean = false;

  vehiculoSeleccionado!: VehiculoTemp;
  creacionRef!: DynamicDialogRef;

  solicitudMantenimientoForm!: FormGroup;
  tiposProveedor: TipoDropdown[] = CATALOGOS_DUMMIES;
  tipoMantenimiento: TipoDropdown[] = CATALOGOS_TTIPO_MANTENIMIENTO;

  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private alertaService: AlertaService,
    private route: ActivatedRoute,
  ) {
    this.vehiculoSeleccionado = this.config.data;
  }

  ngOnInit(): void {
    this.vehiculoSeleccionado = this.config.data.vehiculo;
    this.inicializarAgregarCapillaForm(this.vehiculoSeleccionado);
  }

  inicializarAgregarCapillaForm(vehiculoSeleccionado: VehiculoTemp) {
    this.solicitudMantenimientoForm = this.formBuilder.group({
      placas: [{value: vehiculoSeleccionado.DES_PLACAS, disabled: true}],
      marca: [{value: vehiculoSeleccionado.DES_MARCA, disabled: true}],
      anio: [{value: vehiculoSeleccionado.DES_MODELO, disabled: true}],
      kilometraje: [{value: null, disabled: false}, [Validators.required]],
      tipoMantenimiento: [{value: null, disabled: false}, [Validators.required]],
      fechaMantenimiento: [{value: null, disabled: false}, [Validators.required]],
      modalidad: [{value: null, disabled: false}, [Validators.required]],
      fechaRegistro: [{value: null, disabled: false}, [Validators.required]],
      notas: [{value: null, disabled: false}, [Validators.required]],
    });
  }

  get smf() {
    return this.solicitudMantenimientoForm.controls;
  }

  agregar(): void {
    this.ventanaConfirmacion = true;
  }

  regresar(): void {
    this.ventanaConfirmacion = false;
  }

  cerrar(): void {
    this.ref.close()
  }

}
