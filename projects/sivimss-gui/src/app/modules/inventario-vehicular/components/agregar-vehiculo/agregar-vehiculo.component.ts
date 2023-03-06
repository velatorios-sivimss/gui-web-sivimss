import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng-lts/api';
import { MENU_STEPPER } from '../../constants/menu-stepper';
import { DropdownItem } from 'primeng-lts/dropdown';
import { DynamicDialogRef } from 'primeng-lts/dynamicdialog';

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

  datosGeneralesForm!: FormGroup;
  datosDocumentacionForm!: FormGroup;

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
      tarjetaCirculacion: [{ value: null, disabled: false }],
      vigenciaTarjetaInicio: [{ value: null, disabled: false }],
      vigenciaTarjetaFin: [{ value: null, disabled: false }],
      noSerie: [{ value: null, disabled: false }],
      fechaAdquisicion: [{ value: null, disabled: false }],
      vigenciaAdquisicionInicio: [{ value: null, disabled: false }],
      vigenciaAdquisicionFin: [{ value: null, disabled: false }],
      costoTotal: [{ value: null, disabled: false }],
      aseguradora: [{ value: null, disabled: false }],
      poliza: [{ value: null, disabled: false }],
      vigenciapolizaInicio: [{ value: null, disabled: false }],
      vigenciapolizaFin: [{ value: null, disabled: false }],
      riesgos: [{ value: null, disabled: false }],
      importePrima: [{ value: null, disabled: false }],
      estatus: [{ value: null, disabled: false }],
    })
  }

  adelantarPagina(): void {
    this.indice = ++this.indice;
  }

  regresarPagina(): void {
    this.indice = --this.indice;
  }

  cancelar(): void {
    this.ref.close()
  }

}
