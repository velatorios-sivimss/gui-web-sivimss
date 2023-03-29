import {Component, OnInit} from '@angular/core';
import {Velatorio} from "../../models/velatorio.interface";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {CATALOGOS_DUMMIES} from "../../constants/dummies";

@Component({
  selector: 'app-modificar-velatorio',
  templateUrl: './modificar-velatorio.component.html',
  styleUrls: ['./modificar-velatorio.component.scss']
})
export class ModificarVelatorioComponent implements OnInit {

  indice: number = 0;

  velatorioForm!: FormGroup;
  velatorioSeleccionado!: Velatorio;

  asignaciones: TipoDropdown[] = CATALOGOS_DUMMIES;
  nuevoVelatorio!: Velatorio;

  constructor(private formBuilder: FormBuilder,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) {
    this.velatorioSeleccionado = this.config.data;
    this.inicializarFormVelatorio(this.velatorioSeleccionado)
  }

  ngOnInit(): void {
  }

  inicializarFormVelatorio(velatorio: Velatorio): void {
    this.velatorioForm = this.formBuilder.group({
      id: [{value: velatorio.idVelatorio, disabled: true}],
      nombre: [{value: velatorio.nomVelatorio, disabled: false}, [Validators.required]],
      administrador: [{value: velatorio.administrador, disabled: true}, [Validators.required]],
      responsableSanitario: [{value: velatorio.nomRespoSanitario, disabled: false}, [Validators.required]],
      capillasVelacion: [{value: velatorio.capillas, disabled: true}, [Validators.required]],
      salasCremacion: [{value: velatorio.salasCremacion, disabled: true}, [Validators.required]],
      salasEmbalsamamiento: [{value: velatorio.salasEmbalsamamiento, disabled: true}, [Validators.required]],
      asignacion: [{value: velatorio.cveAsignacion, disabled: false}, [Validators.required]],
      codigoPostal: [{value: velatorio.idCodigoPostal, disabled: false}, [Validators.required]],
      direccionCalle: [{value: velatorio.desCalle, disabled: false}, [Validators.required]],
      numeroExterior: [{value: velatorio.numExterior, disabled: false}, [Validators.required]],
      colonia: [{value: velatorio.desColonia, disabled: false}, [Validators.required]],
      municipio: [{value: velatorio.desMunicipio, disabled: true}, [Validators.required]],
      estado: [{value: velatorio.desEstado, disabled: true}, [Validators.required]],
      telefono: [{value: velatorio.numTelefono, disabled: false}, [Validators.required]],
      estatus: [{value: velatorio.estatus, disabled: false}, [Validators.required]],
    });
  }

  cancelarModificacion(): void {
    if (this.indice === 1) {
      this.indice--;
      return;
    }
    this.ref.close();
  }

  modificarVelatorio(): void {
    if (this.indice === 0) {
      this.indice++;
      this.nuevoVelatorio = {...this.velatorioForm.value};
      return;
    }
    this.ref.close()
  }

  get formV() {
    return this.velatorioForm.controls;
  }
}
