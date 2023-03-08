import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng-lts/api';
import { MENU_STEPPER } from '../../constants/menu-stepper';
import { DropdownItem } from 'primeng-lts/dropdown';
import { DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { Vehiculo } from '../../models/vehiculo.interface';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.scss']
})
export class AgregarVehiculoComponent implements OnInit {

  menuStep: MenuItem[] = MENU_STEPPER;
  indice: number = 0;

  responsables: DropdownItem[] = [];
  tiposVehiculo: DropdownItem[] = [];
  usos: DropdownItem[] = [];
  velatorios: DropdownItem[] = [];
  numerosSerie: DropdownItem[] = [];

  datosGeneralesForm!: FormGroup;
  datosDocumentacionForm!: FormGroup;
  nuevoVehiculo: Vehiculo;

  constructor(private formBuilder: FormBuilder,
    public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.inicializarFormDatosGenerales();
    this.inicializarFormDatosDocumentacion();
  }

  inicializarFormDatosGenerales(): void {
    this.datosGeneralesForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      velatorio: [{ value: null, disabled: false }, [Validators.required]],
      uso: [{ value: null, disabled: false }, [Validators.required]],
      responsable: [{ value: null, disabled: false }, [Validators.required]],
      tipoVehiculo: [{ value: null, disabled: false }, [Validators.required]],
      marca: [{ value: null, disabled: false }, [Validators.required]],
      submarca: [{ value: null, disabled: false }, [Validators.required]],
      modelo: [{ value: null, disabled: false }, [Validators.required]],
      placas: [{ value: null, disabled: false }, [Validators.required]],
      noMotor: [{ value: null, disabled: false }, [Validators.required]],
      noCilindros: [{ value: null, disabled: false }, [Validators.required]],
      transmision: [{ value: null, disabled: false }, [Validators.required]],
      desTransmision: [{ value: null, disabled: false }, [Validators.required]],
      combustible: [{ value: null, disabled: false }, [Validators.required]],
      desCombustible: [{ value: null, disabled: false }, [Validators.required]],
    });
  }

  inicializarFormDatosDocumentacion(): void {
    this.datosDocumentacionForm = this.formBuilder.group({
      tarjetaCirculacion: [{ value: null, disabled: false }, [Validators.required]],
      vigenciaTarjetaInicio: [{ value: null, disabled: false }, [Validators.required]],
      vigenciaTarjetaFin: [{ value: null, disabled: false }, [Validators.required]],
      noSerie: [{ value: null, disabled: false }, [Validators.required]],
      fechaAdquisicion: [{ value: null, disabled: false }, [Validators.required]],
      vigenciaAdquisicionInicio: [{ value: null, disabled: false }, [Validators.required]],
      vigenciaAdquisicionFin: [{ value: null, disabled: false }, [Validators.required]],
      costoTotal: [{ value: null, disabled: false }, [Validators.required]],
      aseguradora: [{ value: null, disabled: false }, [Validators.required]],
      poliza: [{ value: null, disabled: false }, [Validators.required]],
      vigenciapolizaInicio: [{ value: null, disabled: false }, [Validators.required]],
      vigenciapolizaFin: [{ value: null, disabled: false }, [Validators.required]],
      riesgos: [{ value: null, disabled: false }, [Validators.required]],
      importePrima: [{ value: null, disabled: false }, [Validators.required]],
      estatus: [{ value: true, disabled: false }, [Validators.required]],
    })
  }

  adelantarPagina(): void {
    this.indice++;
    if (this.indice === this.menuStep.length) {
      this.crearResumenVehiculo();
    }
  }

  regresarPagina(): void {
    this.indice--;
  }

  cancelar(): void {
    this.ref.close()
  }

  crearResumenVehiculo(): void {
    this.nuevoVehiculo = {
      id: null,
      ...this.datosDocumentacionForm.value,
      ...this.datosGeneralesForm.value
    }
  }

  get fdg() {
    return this.datosGeneralesForm.controls;
  }

  get fdd() {
    return this.datosDocumentacionForm.controls;
  }

}
