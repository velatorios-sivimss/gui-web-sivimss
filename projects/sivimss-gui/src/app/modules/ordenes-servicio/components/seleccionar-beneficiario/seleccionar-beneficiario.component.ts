import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng-lts/dynamicdialog";

@Component({
  selector: 'app-seleccionar-beneficiario',
  templateUrl: './seleccionar-beneficiario.component.html',
  styleUrls: ['./seleccionar-beneficiario.component.scss']
})
export class SeleccionarBeneficiarioComponent implements OnInit {

  beneficiarios: any[] = [
    {
      id: 0, nombre: 'Denia Lima Hernandez', seleccionado: false
    },
    {
      id: 1, nombre: 'Jimena Lima Hernandez', seleccionado: false
    },
    {
      id: 2, nombre: 'Sergio Lima Hernandez', seleccionado: false
    }
  ];

  beneficiarioSeleccionado: any = {
    id: 10, nombre: 'Gerardo Lima Lopez', seleccionado: true
  };


  constructor(
    private readonly formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
  }

  ngOnInit(): void {

  }

}
