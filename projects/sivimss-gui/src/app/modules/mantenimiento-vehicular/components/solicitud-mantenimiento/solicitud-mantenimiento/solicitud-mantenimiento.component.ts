import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng-lts/dynamicdialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertaService} from 'projects/sivimss-gui/src/app/shared/alerta/services/alerta.service';
import {ActivatedRoute} from '@angular/router';
import {TipoDropdown} from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import {VehiculoTemp} from "../../../models/vehiculo-temp.interface";
import {
  CATALOGOS_PREV_ANUALES,
  CATALOGOS_PREV_EVENTUALES,
  CATALOGOS_PREV_SEMESTRALES
} from "../../../constants/catalogos-preventivo";
import {CATALOGOS_TTIPO_MANTENIMIENTO} from "../../../../inventario-vehicular/constants/dummies";

interface ResumenAsignacion {
  kilometraje: string,
  modalidad: string,
  fechaRegistro: string,
  tipoMantenimiento: string,
  mantenimientoPreventivo: string,
  notas: string
}

@Component({
  selector: 'app-solicitud-mantenimiento',
  templateUrl: './solicitud-mantenimiento.component.html',
  styleUrls: ['./solicitud-mantenimiento.component.scss'],
  providers: [DialogService]
})
export class SolicitudMantenimientoComponent implements OnInit {
  ventanaConfirmacion: boolean = false;

  vehiculoSeleccionado!: VehiculoTemp;
  resumenAsignacion!: ResumenAsignacion;

  solicitudMantenimientoForm!: FormGroup;
  mantenimientosPrev: TipoDropdown[] = [];
  tipoMantenimiento: TipoDropdown[] = CATALOGOS_TTIPO_MANTENIMIENTO;
  modalidades: string[] = ['Semestral', 'Anual', 'Frecuente']

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
      matPreventivo: [{value: null, disabled: false}],
      modalidad: [{value: null, disabled: false}, [Validators.required]],
      fechaRegistro: [{value: null, disabled: false}, [Validators.required]],
      notas: [{value: null, disabled: false}, [Validators.required]],
    });
    this.solicitudMantenimientoForm.get("modalidad")?.valueChanges.subscribe(() => {
      this.asignarOpcionesMantenimiento();
    })
  }

  get smf() {
    return this.solicitudMantenimientoForm.controls;
  }

  agregar(): void {
    this.resumenAsignacion = this.crearResumenAsignacion();
    this.ventanaConfirmacion = true;
  }

  regresar(): void {
    this.ventanaConfirmacion = false;
  }

  cerrar(): void {
    this.ref.close()
  }

  asignarOpcionesMantenimiento(): void {
    const modalidad: number = +this.solicitudMantenimientoForm.get("modalidad")?.value;
    if (![0, 1, 2].includes(modalidad)) return;
    if (modalidad === 0) {
      this.mantenimientosPrev = CATALOGOS_PREV_SEMESTRALES;
      return;
    }
    if (modalidad === 1) {
      this.mantenimientosPrev = CATALOGOS_PREV_ANUALES;
      return;
    }
    this.mantenimientosPrev = CATALOGOS_PREV_EVENTUALES;
  }

  crearResumenAsignacion(): ResumenAsignacion {
    const tipoMantenimiento = this.solicitudMantenimientoForm.get("tipoMantenimiento")?.value;
    const tipoMantenimientoValor = this.tipoMantenimiento.find(m => m.value === tipoMantenimiento)?.label;
    const modalidad = this.solicitudMantenimientoForm.get("modalidad")?.value;
    const modalidadValor = this.modalidades[modalidad] || "";
    return {
      kilometraje: this.solicitudMantenimientoForm.get("kilometraje")?.value,
      modalidad: modalidadValor,
      fechaRegistro: this.solicitudMantenimientoForm.get("fechaRegistro")?.value,
      tipoMantenimiento: tipoMantenimientoValor || "",
      mantenimientoPreventivo: this.solicitudMantenimientoForm.get("matPreventivo")?.value,
      notas: this.solicitudMantenimientoForm.get("notas")?.value
    }
  }
}
