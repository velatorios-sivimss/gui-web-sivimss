import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng-lts/api/lazyloadevent';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { AlertaService, TipoAlerta } from 'projects/sivimss-gui/src/app/shared/alerta/services/alerta.service';
import { Accion } from 'projects/sivimss-gui/src/app/utils/constantes';
import { Sala } from '../../models/salas.interface';

@Component({
  selector: 'app-ver-detalle-salas',
  templateUrl: './ver-detalle-salas.component.html',
  styleUrls: ['./ver-detalle-salas.component.scss']
})
export class VerDetalleSalasComponent implements OnInit {
  readonly MENSAJE_SALA_AGREGADA = 'Sala se ha agregado correctamente';
  readonly MENSAJE_SALA_MODIFICADA = 'Sala se ha modificado correctamente';
  readonly MENSAJE_SALA_ACTIVADA = 'Sala se ha activado correctamente';
  readonly MENSAJE_SALA_DESACTIVADA = 'Sala se ha desactivado correctamente';

  salaSeleccionado!: Sala;
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
    this.salaSeleccionado = this.config.data?.sala;
    this.accionEntrada = this.config.data?.modo;
  }

  ngOnInit(): void {
    this.inicializarModo();
  }

  inicializarModo() {
    switch (this.accionEntrada) {
      case Accion.Agregar:
        this.preguntaConfirmacion = '¿Estás seguro de agregar esta nueva sala?';
        this.mensajeConfirmacion = this.MENSAJE_SALA_AGREGADA;
        break;
      case Accion.Modificar:
        this.preguntaConfirmacion = '¿Estás seguro de modificar esta sala?';
        this.mensajeConfirmacion = this.MENSAJE_SALA_MODIFICADA;
        break;
      case Accion.Activar:
        this.preguntaConfirmacion = '¿Estás seguro de activar esta sala?';
        this.mensajeConfirmacion = this.MENSAJE_SALA_ACTIVADA;
        break;
      case Accion.Desactivar:
        this.preguntaConfirmacion = '¿Estás seguro de desactivar esta sala?';
        this.mensajeConfirmacion = this.MENSAJE_SALA_DESACTIVADA;
        break;
      default:
        break;
    }
  }

  cerrarDialogo(sala?: Sala) {
    this.ref.close({
      respuesta: 'Ok',
      sala,
    });
  }

  // Para activar o desactivar
  cambiarEstatusSala() {
    const nuevoSala: Sala = {
      ...this.salaSeleccionado,
      estatus: !this.salaSeleccionado.estatus,
    }
    // TO DO Integrar servicio de back para Actualizar Estatus
    this.cerrarDialogo(nuevoSala);
    this.alertaService.mostrar(TipoAlerta.Exito, this.mensajeConfirmacion);
  }

  agregarSala() {
    const nuevoSala: Sala = { ...this.salaSeleccionado }
    // TO DO Integrar servicio de back para Guardar
    this.cerrarDialogo(nuevoSala);
    this.alertaService.mostrar(TipoAlerta.Exito, this.mensajeConfirmacion);
  }
}
