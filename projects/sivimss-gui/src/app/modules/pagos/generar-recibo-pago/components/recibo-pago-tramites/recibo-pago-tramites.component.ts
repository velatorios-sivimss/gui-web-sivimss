import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReciboPago } from '../../models/recibo-pago.interface';

@Component({
  selector: 'app-recibo-pago-tramites',
  templateUrl: './recibo-pago-tramites.component.html',
  styleUrls: ['./recibo-pago-tramites.component.scss']
})
export class ReciboPagoTramitesComponent implements OnInit {
  modificarArticuloForm!: FormGroup;
  reciboPago: ReciboPago = {};
  ventanaConfirmacion: boolean = false;
  reciboPagoSeleccionado!: ReciboPago;
  estatus: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  get fma() {
    return this.modificarArticuloForm.controls;
  }

}
