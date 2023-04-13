import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {DynamicDialogRef} from "primeng-lts/dynamicdialog";

@Component({
  selector: 'app-registrar-entrada',
  templateUrl: './registrar-entrada.component.html',
  styleUrls: ['./registrar-entrada.component.scss']
})
export class RegistrarEntradaComponent implements OnInit {

  registroEntradaForm!: FormGroup;

  indice: number = 0;

  opcionesInicio: TipoDropdown[] = [{label: 'Op1', value: 'Op1'}, {label: 'Mantenimiento', value: 'Mantenimiento'}];

  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef
  ) {
    this.iniciarFormRegistroEntrada();
  }

  iniciarFormRegistroEntrada(): void {
    this.registroEntradaForm = this.formBuilder.group({
      inicioDe: [{value: null, disabled: false}, [Validators.required]],
      tipoMantenimiento: [{value: null, disabled: false}],
      folioODS: [{value: null, disabled: false}, [Validators.required]],
      nombreContratante: [{value: null, disabled: false}, [Validators.required]],
      nombreFinado: [{value: null, disabled: false}, [Validators.required]],
      nombreResponsable: [{value: null, disabled: false}, [Validators.required]],
      nivelGas: [{value: null, disabled: false}, [Validators.required]],
      fecha: [{value: null, disabled: false}, [Validators.required]],
      hora: [{value: null, disabled: false}, [Validators.required]],
      minutos: [{value: null, disabled: false}, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  cancelar(): void {
    if (this.indice === 1) {
      this.indice--;
      return;
    }
    this.ref.close()
  }

  get entradaF() {
    return this.registroEntradaForm.controls;
  }

  guardar(): void {
    if (this.indice === 0) {
      this.indice++;
      return;
    }
  }
}
