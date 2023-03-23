import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-caracteristicas-presupuesto',
  templateUrl: './caracteristicas-presupuesto.component.html',
  styleUrls: ['./caracteristicas-presupuesto.component.scss']
})
export class CaracteristicasPresupuestoComponent implements OnInit {

  paqueteSeleccionado: any;
  form!: FormGroup;
  mostrarModalAgregarPresupuesto: boolean = false;
  mostrarModalAgregarPaquete: boolean = false;
  mostrarModalAgregarAtaud: boolean = false;
  formAgregarAtaud!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      observaciones: [{value: null, disabled: false}, [Validators.required]],
      notasServicio: [{value: null, disabled: false}, [Validators.required]]
    });
  }

  abrirModalAgregarPrespuesto(event: MouseEvent) {
    event.stopPropagation();
    this.mostrarModalAgregarPresupuesto = true;
  }

  abrirModalAgregarPaquete(event: MouseEvent) {
    event.stopPropagation();
    this.mostrarModalAgregarPaquete = true;
  }

  abrirModalAgregarAtaud(): void {
    this.mostrarModalAgregarPaquete = false;
    this.mostrarModalAgregarPresupuesto = false;
    this.formAgregarAtaud = this.formBuilder.group({
      ataud: [{value: null, disabled: false}, [Validators.required]],
      proveedor: [{value: null, disabled: false}, [Validators.required]]
    });
    this.mostrarModalAgregarAtaud = true;
  }

  get f() {
    return this.form.controls;
  }

  get fa() {
    return this.formAgregarAtaud.controls;
  }

}
