import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-informacion-servicio',
  templateUrl: './informacion-servicio.component.html',
  styleUrls: ['./informacion-servicio.component.scss']
})
export class InformacionServicioComponent implements OnInit {

  form!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      lugarVelacion:  this.formBuilder.group({
        capilla: [{value: null, disabled: false}, [Validators.required]],
        fecha: [{value: null, disabled: false}, [Validators.required]],
        hora: [{value: null, disabled: false}, [Validators.required]]
      }),
      lugarCremacion:  this.formBuilder.group({
        sala: [{value: null, disabled: false}, [Validators.required]],
        fecha: [{value: null, disabled: false}, [Validators.required]],
        hora: [{value: null, disabled: false}, [Validators.required]]
      }),
      inhumacion:  this.formBuilder.group({
        agregarPanteon: [{value: null, disabled: false}, [Validators.required]]
      }),
      recoger:  this.formBuilder.group({
        fecha: [{value: null, disabled: false}, [Validators.required]],
        hora: [{value: null, disabled: false}, [Validators.required]]
      }),
      instalacionServicio:  this.formBuilder.group({
        fecha: [{value: null, disabled: false}, [Validators.required]],
        hora: [{value: null, disabled: false}, [Validators.required]]
      }),
      cortejo:  this.formBuilder.group({
        fecha: [{value: null, disabled: false}, [Validators.required]],
        hora: [{value: null, disabled: false}, [Validators.required]],
        gestionadoPorPromotor: [{value: null, disabled: false}, [Validators.required]]
      })
    });
  }

  get lugarVelacion() {
    return (this.form.controls['lugarVelacion'] as FormGroup).controls;
  }

  get lugarCremacion() {
    return (this.form.controls['lugarCremacion'] as FormGroup).controls;
  }

  get recoger() {
    return (this.form.controls['recoger'] as FormGroup).controls;
  }

  get instalacionServicio() {
    return (this.form.controls['instalacionServicio'] as FormGroup).controls;
  }

  get inhumacion() {
    return (this.form.controls['inhumacion'] as FormGroup).controls;
  }

  get cortejo() {
    return (this.form.controls['cortejo'] as FormGroup).controls;
  }

}
