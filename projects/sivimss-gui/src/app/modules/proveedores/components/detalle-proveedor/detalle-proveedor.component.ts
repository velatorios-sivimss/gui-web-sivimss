import { Proveedores } from './../../models/proveedores.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng-lts/dynamicdialog';

@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.component.html',
  styleUrls: ['./detalle-proveedor.component.scss']
})
export class DetalleProveedorComponent implements OnInit {

  @Input() proveedorSeleccionado!: Proveedores;
  @Input() estatus: boolean = false;
  @Input() overlay: boolean = false;
  @Input() tipoEstatus: 'texto' | 'switch' = 'texto';
  @Output() modificar: EventEmitter<boolean> = new EventEmitter()

  constructor( public ref: DynamicDialogRef) { }

  ngOnInit(): void { }

  abrirModalModificacionProveedor() {
    this.modificar.emit(true)
  }

  cancelar(): void {
    this.ref.close()
  }


}
