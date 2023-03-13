import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng-lts/api/lazyloadevent';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { AlertaService, TipoAlerta } from 'projects/sivimss-gui/src/app/shared/alerta/services/alerta.service';
import { Accion } from 'projects/sivimss-gui/src/app/utils/constantes';
import { Panteon } from '../../models/panteones.interface';

@Component({
  selector: 'app-ver-detalle-panteones',
  templateUrl: './ver-detalle-panteones.component.html',
  styleUrls: ['./ver-detalle-panteones.component.scss']
})
export class VerDetallePanteonesComponent implements OnInit {
  readonly MENSAJE_PANTEON_AGREGADO = 'Panteon agregado correctamente';
  readonly MENSAJE_PANTEON_MODIFICADO = 'Panteon modificado correctamente';
  readonly MENSAJE_PANTEON_ACTIVADO = 'Panteon activado correctamente';
  readonly MENSAJE_PANTEON_DESACTIVADO = 'Panteon desactivado correctamente';

  panteonSeleccionado!: Panteon;
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
    this.panteonSeleccionado = this.config.data?.panteon;
    this.accionEntrada = this.config.data?.modo;
  }

  ngOnInit(): void {
    this.inicializarModo();
  }

  inicializarModo() {
    switch (this.accionEntrada) {
      case Accion.Agregar:
        this.preguntaConfirmacion = '¿Estás seguro de agregar este nuevo panteon?';
        this.mensajeConfirmacion = this.MENSAJE_PANTEON_AGREGADO;
        break;
      case Accion.Modificar:
        this.preguntaConfirmacion = '¿Estás seguro de modificar este panteon?';
        this.mensajeConfirmacion = this.MENSAJE_PANTEON_MODIFICADO;
        break;
      case Accion.Activar:
        this.preguntaConfirmacion = '¿Estás seguro de activar este panteon?';
        this.mensajeConfirmacion = this.MENSAJE_PANTEON_ACTIVADO;
        break;
      case Accion.Desactivar:
        this.preguntaConfirmacion = '¿Estás seguro de desactivar este panteon?';
        this.mensajeConfirmacion = this.MENSAJE_PANTEON_DESACTIVADO;
        break;
      default:
        break;
    }
  }

  cerrarDialogo(panteon?: Panteon) {
    this.ref.close({
      respuesta: 'Ok',
      panteon,
    });
  }

  // Para activar o desactivar
  cambiarEstatusPanteon() {
    const nuevoPanteon: Panteon = {
      ...this.panteonSeleccionado,
      estatus: !this.panteonSeleccionado.estatus,
    }
    // TO DO Integrar servicio de back para Actualizar Estatus
    this.cerrarDialogo(nuevoPanteon);
    this.alertaService.mostrar(TipoAlerta.Exito, this.mensajeConfirmacion);
  }

  agregarPanteon() {
    const nuevoPanteon: Panteon = { ...this.panteonSeleccionado }
    // TO DO Integrar servicio de back para Guardar
    this.cerrarDialogo(nuevoPanteon);
    this.alertaService.mostrar(TipoAlerta.Exito, this.mensajeConfirmacion);
  }
}
