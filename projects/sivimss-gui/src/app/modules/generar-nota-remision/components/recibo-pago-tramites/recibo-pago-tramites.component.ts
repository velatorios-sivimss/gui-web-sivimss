import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recibo-pago-tramites',
  templateUrl: './recibo-pago-tramites.component.html',
  styleUrls: ['./recibo-pago-tramites.component.scss']
})
export class ReciboPagoTramitesComponent implements OnInit {

  notaRemisionForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void { }

  inicializarNotaRemisionForm() {
    this.notaRemisionForm = this.formBuilder.group({
      versionDocumento: [{ value: null, disabled: false }],
      fecha: [{ value: null, disabled: false }],
    });
  }

}
