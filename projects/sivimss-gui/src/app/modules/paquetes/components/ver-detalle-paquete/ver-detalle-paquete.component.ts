import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng-lts/api/lazyloadevent';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { DIEZ_ELEMENTOS_POR_PAGINA } from 'projects/sivimss-gui/src/app/utils/constantes';
import { Articulo } from '../../models/articulos.interface';
import { Paquete } from '../../models/paquetes.interface';
import { Servicio } from '../../models/servicios.interface';

@Component({
  selector: 'app-ver-detalle-paquete',
  templateUrl: './ver-detalle-paquete.component.html',
  styleUrls: ['./ver-detalle-paquete.component.scss']
})
export class VerDetallePaqueteComponent implements OnInit {

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementosServicios: number = 0;
  totalElementosArticulos: number = 0;

  paqueteSeleccionado!: Paquete;
  servicios: Servicio[] = [];
  articulos: Articulo[] = [];

  constructor(public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {
    console.log(this.config.data)
    this.paqueteSeleccionado = this.config.data;
  }

  ngOnInit(): void { }

  paginar(event: LazyLoadEvent): void {
    setTimeout(() => {
      this.servicios = [
        {
          servicio: 'Traslado',
          costo: '$1,500.00',
          precio: '$25,000.00',
        },
        {
          servicio: 'Cremación',
          costo: '$4,700.00',
          precio: '$25,000.00',
        },
      ];
      this.totalElementosServicios = this.servicios.length;
    }, 0);

    setTimeout(() => {
      this.articulos = [
        {
          articulo: 'Velas con estampados religiosos',
          costo: '$1,500.00',
          precio: '$25,000.00',
        },
        {
          articulo: 'Sillas de acero para velatorios',
          costo: '$4,700.00',
          precio: '$25,000.00',
        },
      ];
      this.totalElementosArticulos = this.articulos.length;
    }, 0);
  }

  cerrarDialogo() {
    this.ref.close({
      respuesta: 'Ok'
    });
  }

}
