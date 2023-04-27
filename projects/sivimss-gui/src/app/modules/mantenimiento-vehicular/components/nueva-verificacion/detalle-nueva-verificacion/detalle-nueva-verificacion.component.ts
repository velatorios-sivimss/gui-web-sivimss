import {Component, OnInit} from '@angular/core';
import {tablaRin} from "../../../constants/tabla-rines";

@Component({
  selector: 'app-detalle-nueva-verificacion',
  templateUrl: './detalle-nueva-verificacion.component.html',
  styleUrls: ['./detalle-nueva-verificacion.component.scss']
})
export class DetalleNuevaVerificacionComponent implements OnInit {

  data = tablaRin;

  constructor() {
  }

  ngOnInit(): void {

  }

}
