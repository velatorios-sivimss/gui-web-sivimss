import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng-lts/api/lazyloadevent';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { AlertaService, TipoAlerta } from 'projects/sivimss-gui/src/app/shared/alerta/services/alerta.service';
import { DIEZ_ELEMENTOS_POR_PAGINA, Accion } from 'projects/sivimss-gui/src/app/utils/constantes';
import { Articulo } from '../../models/articulos.interface';
import { Paquete } from '../../models/paquetes.interface';
import { Servicio } from '../../models/servicios.interface';

@Component({
  selector: 'app-ver-detalle-paquetes',
  templateUrl: './ver-detalle-paquetes.component.html',
  styleUrls: ['./ver-detalle-paquetes.component.scss']
})
export class VerDetallePaquetesComponent implements OnInit {
  readonly MENSAJE_PAQUETE_AGREGADO = 'Paquete agregado correctamente';
  readonly MENSAJE_PAQUETE_ACTIVADO = 'Paquete activado correctamente';
  readonly MENSAJE_PAQUETE_DESACTIVADO = 'Paquete desactivado correctamente';

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementosServicios: number = 0;
  totalElementosArticulos: number = 0;

  paqueteSeleccionado!: Paquete;
  servicios: Servicio[] = [];
  articulos: Articulo[] = [];
  preguntaConfirmacion: string = '';
  mensajeConfirmacion: string = '';
  Accion = Accion;
  accionEntrada: Accion;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private alertaService: AlertaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    // console.log(this.config.data);
    this.paqueteSeleccionado = this.config.data?.paquete;
    this.accionEntrada = this.config.data?.modo;
  }

  ngOnInit(): void {
    this.inicializarModo();
  }

  inicializarModo() {
    switch (this.accionEntrada) {
      case Accion.Agregar:
        this.preguntaConfirmacion = '¿Estás seguro de agregar este nuevo paquete?';
        this.mensajeConfirmacion = this.MENSAJE_PAQUETE_AGREGADO;
        break;
      case Accion.Activar:
        this.preguntaConfirmacion = '¿Estás seguro de activar este paquete?';
        this.mensajeConfirmacion = this.MENSAJE_PAQUETE_ACTIVADO;
        break;
      case Accion.Desactivar:
        this.preguntaConfirmacion = '¿Estás seguro de desactivar este paquete?';
        this.mensajeConfirmacion = this.MENSAJE_PAQUETE_DESACTIVADO;
        break;
      default:
        break;
    }
  }

  paginar(event: LazyLoadEvent): void {
    setTimeout(() => {
      this.servicios = this.paqueteSeleccionado.servicios || [];
      this.totalElementosServicios = this.servicios.length;
    }, 0);

    setTimeout(() => {
      this.articulos = this.paqueteSeleccionado.articulos || [];
      this.totalElementosArticulos = this.articulos.length;
    }, 0);
  }

  cerrarDialogo(paquete?: Paquete) {
    this.ref.close({
      respuesta: 'Ok',
      paquete,
    });
  }

  // Para activar o desactivar
  cambiarEstatusPaquete() {
    const nuevoPaquete: Paquete = {
      ...this.paqueteSeleccionado,
      estatus: !this.paqueteSeleccionado.estatus,
    }
    // TO DO Integrar servicio de back para Actualizar Estatus
    this.cerrarDialogo(nuevoPaquete);
    this.alertaService.mostrar(TipoAlerta.Exito, this.mensajeConfirmacion);
  }

  agregarPaquete() {
    const nuevoPaquete: Paquete = { ...this.paqueteSeleccionado }
    // TO DO Integrar servicio de back para Guardar
    this.cerrarDialogo(nuevoPaquete);
    this.alertaService.mostrar(TipoAlerta.Exito, this.mensajeConfirmacion);
    this.router.navigate(['/paquetes'], {
      relativeTo: this.activatedRoute
    });
  }
}
