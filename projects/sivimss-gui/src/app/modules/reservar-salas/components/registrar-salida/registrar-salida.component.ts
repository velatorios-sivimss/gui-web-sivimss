import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogRef} from "primeng-lts/dynamicdialog";

@Component({
  selector: 'app-registrar-salida',
  templateUrl: './registrar-salida.component.html',
  styleUrls: ['./registrar-salida.component.scss']
})
export class RegistrarSalidaComponent implements OnInit {

  registroSalidaForm!: FormGroup;

  indice: number = 0;

  constructor(private formBuilder: FormBuilder,
              public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.inicializarFormRegistroSalida();
  }

  inicializarFormRegistroSalida(): void {
    this.registroSalidaForm = this.formBuilder.group({
      nivelGas: [{value: null, disabled: false}, [Validators.required]],
      fecha: [{value: null, disabled: false}, [Validators.required]],
      hora: [{value: null, disabled: false}, [Validators.required]],
      minutos: [{value: null, disabled: false}, [Validators.required]],
    })
  }

  cancelar(): void {
    this.ref.close()
  }

  get salidaF() {
    return this.registroSalidaForm.controls;
  }

}
