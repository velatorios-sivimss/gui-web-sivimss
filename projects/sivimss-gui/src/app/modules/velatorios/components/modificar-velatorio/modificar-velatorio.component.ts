import {Component, OnInit} from '@angular/core';
import {Velatorio} from "../../modelos/velatorio.interface";
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
      id: [{value: velatorio.id, disabled: true}],
      nombre: [{value: velatorio.nombre, disabled: false}, [Validators.required]],
      administrador: [{value: velatorio.administrador, disabled: false}, [Validators.required]],
      responsableSanitario: [{value: velatorio.responsableSanitario, disabled: false}, [Validators.required]],
      capillasVelacion: [{value: velatorio.capillasVelacion, disabled: false}, [Validators.required]],
      salasCremacion: [{value: velatorio.salasCremacion, disabled: false}, [Validators.required]],
      salasEmbalsamamiento: [{value: velatorio.salasEmbalsamamiento, disabled: false}, [Validators.required]],
      asignacion: [{value: velatorio.asignacion, disabled: false}, [Validators.required]],
      codigoPostal: [{value: velatorio.codigoPostal, disabled: false}, [Validators.required]],
      direccionCalle: [{value: velatorio.direccionCalle, disabled: false}, [Validators.required]],
      numeroExterior: [{value: velatorio.numeroExterior, disabled: false}, [Validators.required]],
      colonia: [{value: velatorio.colonia, disabled: false}, [Validators.required]],
      municipio: [{value: velatorio.municipio, disabled: false}, [Validators.required]],
      estado: [{value: velatorio.estado, disabled: false}, [Validators.required]],
      telefono: [{value: velatorio.telefono, disabled: false}, [Validators.required]],
      estatus: [{value: velatorio.estatus, disabled: false}, [Validators.required]],
    });
  }

  cancelarModificacion(): void {
    if (this.indice === 0) {
      this.indice++;
      this.nuevoVelatorio = {...this.velatorioForm.value};
      return;
    }
    this.ref.close()
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
