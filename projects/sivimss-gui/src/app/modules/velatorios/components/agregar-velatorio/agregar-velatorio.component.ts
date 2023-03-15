import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {Velatorio} from "../../modelos/velatorio.interface";
import {CATALOGOS_DUMMIES} from "../../constants/dummies";

@Component({
  selector: 'app-agregar-velatorio',
  templateUrl: './agregar-velatorio.component.html',
  styleUrls: ['./agregar-velatorio.component.scss']
})
export class AgregarVelatorioComponent implements OnInit {

  indice: number = 0;

  velatorioForm!: FormGroup;

  asignaciones: TipoDropdown[] = CATALOGOS_DUMMIES;
  nuevoVelatorio!: Velatorio;
  constructor(private formBuilder: FormBuilder,
              public ref: DynamicDialogRef) {
  }

  ngOnInit(): void {
    this.inicializarFormVelatorio();
  }

  inicializarFormVelatorio(): void {
    this.velatorioForm = this.formBuilder.group({
      id: [{value: null, disabled: true}],
      nombre: [{value: null, disabled: false}, [Validators.required]],
      administrador: [{value: null, disabled: false}, [Validators.required]],
      responsableSanitario: [{value: null, disabled: false}, [Validators.required]],
      capillasVelacion: [{value: null, disabled: false}, [Validators.required]],
      salasCremacion: [{value: null, disabled: false}, [Validators.required]],
      salasEmbalsamamiento: [{value: null, disabled: false}, [Validators.required]],
      asignacion: [{value: null, disabled: false}, [Validators.required]],
      codigoPostal: [{value: null, disabled: false}, [Validators.required]],
      direccionCalle: [{value: null, disabled: false}, [Validators.required]],
      numeroExterior: [{value: null, disabled: false}, [Validators.required]],
      colonia: [{value: null, disabled: false}, [Validators.required]],
      municipio: [{value: null, disabled: false}, [Validators.required]],
      estado: [{value: null, disabled: false}, [Validators.required]],
      telefono: [{value: null, disabled: false}, [Validators.required]],
      estatus: [{value: true, disabled: false}, [Validators.required]],
    });
  }

  crearVelatorio(): void {
    if (this.indice === 0) {
      this.indice++;
      this.nuevoVelatorio = {...this.velatorioForm.value};
      return;
    }
    this.ref.close()
  }

  cancelarCreacion(): void {
    if (this.indice ===  1) {
      this.indice--;
      return;
    }
    this.ref.close();
  }

  get formV() {
    return this.velatorioForm.controls;
  }
}
