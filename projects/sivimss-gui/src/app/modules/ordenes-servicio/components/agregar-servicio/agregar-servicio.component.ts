import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng-lts/dynamicdialog";

@Component({
  selector: 'app-agregar-servicio',
  templateUrl: './agregar-servicio.component.html',
  styleUrls: ['./agregar-servicio.component.scss']
})
export class AgregarServicioComponent implements OnInit {

  form!: FormGroup;
  dummy!: string;

  mostrarSeccionCreacion: boolean = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig
  ) {
  }

  ngOnInit(): void {
    //Obtener la info que le pasa el componente que abre el modal
    this.dummy = this.config.data.dummy;
    this.inicializarForm();
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      servicio: [{value: null, disabled: false}, [Validators.required]],
      proveedor: [{value: null, disabled: false}, [Validators.required]],
      destino: [{value: null, disabled: false}, [Validators.required]],
      kilometraje: [{value: null, disabled: false}, [Validators.required]]
    });
  }

  cerrarModal() {
    //Pasar info a quien abrio el modal en caso de que se requiera. Se esta pasando un boolean de ejemplo
    this.ref.close(true);
  }

  get f() {
    return this.form.controls;
  }
}
