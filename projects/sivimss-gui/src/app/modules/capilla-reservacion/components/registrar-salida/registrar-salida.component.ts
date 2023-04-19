import { registrarSalida } from './../../models/capilla-reservacion.interface';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import { OverlayPanel } from 'primeng-lts/overlaypanel';
import { FormBuilder } from '@angular/forms';
import { CapillaReservacionService } from '../../services/capilla-reservacion.service';
import { HttpErrorResponse } from '@angular/common/http';
type NuevaSalida = Omit<registrarSalida, 'idSalida'>
@Component({
  selector: 'app-registrar-salida',
  templateUrl: './registrar-salida.component.html',
  styleUrls: ['./registrar-salida.component.scss']
})
export class RegistrarSalidaComponent implements OnInit {



  @Input() registrarSalida!: registrarSalida;
  @Input() origen!: string;
  @Output() confirmacionAceptar = new EventEmitter<registrarSalida>();

  creacionRef!: DynamicDialogRef;
  acordionAbierto: boolean = false;

  @ViewChild(OverlayPanel)
  overlayPanel: OverlayPanel | undefined;
  horaEntrada: any;

  idCapilla: any;
  idDisponibilidad: any;
  fechaSalida: any;
  horaSalida: any;

  constructor(
    private alertaService: AlertaService,
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    private readonly ref: DynamicDialogRef,
    public capillaReservacionService: CapillaReservacionService,
  ) {
    this.registrarSalida = this.config.data;
     this.crearSalidaModificada()
  }

  ngOnInit(): void {
    this. crearSalidaModificada();
    this.idCapilla =  this.registrarSalida.idCapilla;
    this.idDisponibilidad =  this.registrarSalida.idCapilla;
    this.fechaSalida =  this.registrarSalida.fechaSalida;
    this.horaSalida =  this.registrarSalida.horaSalida;

  }

  crearSalidaModificada(): registrarSalida{
    return {
      idCapilla:   this.registrarSalida.idCapilla,
      idDisponibilidad:   1,
      fechaSalida:  this.registrarSalida.fechaSalida,
      horaSalida:   this.registrarSalida.horaSalida
  }
}


  guardar(): void {
    const registrarEntradaBo: NuevaSalida = this.crearSalidaModificada()
    const solicitudEntrada: string = JSON.stringify(registrarEntradaBo)
    this.capillaReservacionService.registrarSalida(solicitudEntrada).subscribe(
      () => {
        this.alertaService.mostrar(
          TipoAlerta.Exito,
          'Has registrado la entrada/inicio del servicio correctamente.',
        )
        this.ref.close()
      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar(TipoAlerta.Error, 'Alta incorrecta')
        console.error('ERROR: ', error.message)
      },
    )
  }

  cancelar(): void {
    this.ref.close();
  }

}
