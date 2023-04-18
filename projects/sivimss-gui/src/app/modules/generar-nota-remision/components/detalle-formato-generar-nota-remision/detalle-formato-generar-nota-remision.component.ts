import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OverlayPanel } from 'primeng-lts/overlaypanel';

@Component({
  selector: 'app-detalle-formato-generar-nota-remision',
  templateUrl: './detalle-formato-generar-nota-remision.component.html',
  styleUrls: ['./detalle-formato-generar-nota-remision.component.scss']
})
export class DetalleFormatoGenerarNotaRemisionComponent implements OnInit {
  @ViewChild(OverlayPanel)
  overlayPanel: OverlayPanel | undefined;

  @Output() regresar = new EventEmitter();

  @Output() aceptar = new EventEmitter();

  notaRemisionForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.inicializarNotaRemisionForm();
  }

  inicializarNotaRemisionForm() {
    this.notaRemisionForm = this.formBuilder.group({
      versionDocumento: [{ value: "1.2", disabled: true }],
      fecha: [{ value: new Date(), disabled: true }],
      velatorio: [{ value: 'No. 22 Villahermosa', disabled: true }],
      remisionServicios: [{ value: 'DOC-000001', disabled: true }],
      direccion: [{ value: 'Prolongación Av. México No. 1203, Col. Sabina, C.P. 86153, Villahermosa, San Luis Potosí.', disabled: true }],
      nombreSolicitante: [{ value: 'Miranda Fernendez Guisa', disabled: true }],
      direccionSolicitante: [{ value: 'Av. Congreso de la Unión, Iztacalco, CP 201, CDMX', disabled: true }],
      curpSolicitante: [{ value: 'FEGM560117MDFMPRO7', disabled: true }],
      velatorioSolicitante: [{ value: 'No. 22 Villahermosa', disabled: true }],
      finado: [{ value: 'Pedro Lomas Morales', disabled: true }],
      parentesco: [{ value: 'Abuelo', disabled: true }],
      folioOds: [{ value: 'DOC-000001', disabled: true }],
      nombreConformidad: [{ value: null, disabled: true }],
      nombreRepresentante: [{ value: null, disabled: true }],
    });
  }

  btnRegresar() {
    this.regresar.emit();
  }

  btnAceptar() {
    this.aceptar.emit();
  }

}
