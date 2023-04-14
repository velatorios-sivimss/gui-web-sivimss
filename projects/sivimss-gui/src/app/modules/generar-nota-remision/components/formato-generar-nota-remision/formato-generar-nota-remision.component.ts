import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formato-generar-nota-remision',
  templateUrl: './formato-generar-nota-remision.component.html',
  styleUrls: ['./formato-generar-nota-remision.component.scss']
})
export class FormatoGenerarNotaRemisionComponent implements OnInit {

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
