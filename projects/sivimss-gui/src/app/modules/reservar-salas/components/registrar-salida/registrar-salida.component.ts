import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {SalaVelatorio} from "../../models/sala-velatorio.interface";
import {LoaderService} from "../../../../shared/loader/services/loader.service";
import {SalidaSala} from "../../models/registro-sala.interface";
import * as moment from 'moment';
import {ReservarSalasService} from "../../services/reservar-salas.service";
import {finalize} from "rxjs/operators";
import {HttpRespuesta} from "../../../../models/http-respuesta.interface";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-registrar-salida',
  templateUrl: './registrar-salida.component.html',
  styleUrls: ['./registrar-salida.component.scss']
})
export class RegistrarSalidaComponent implements OnInit {

  registroSalidaForm!: FormGroup;

  indice: number = 0;
  tipoSala:number = 0;

  salaSeleccionada: SalaVelatorio = {};


  constructor(
    private alertaService: AlertaService,
    private formBuilder: FormBuilder,
    private readonly loaderService: LoaderService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private reservarSalasService:ReservarSalasService
  ) { }

  ngOnInit(): void {
    this.salaSeleccionada = this.config.data.sala;
    this.tipoSala = this.config.data.tipoSala;
    this.inicializarFormRegistroSalida();
    this.confFormTipoSala(this.tipoSala);
  }

  inicializarFormRegistroSalida(): void {
    this.registroSalidaForm = this.formBuilder.group({
      nivelGas: [{value: null, disabled: false}, [Validators.required]],
      fecha: [{value: null, disabled: false}, [Validators.required]],
      hora: [{value: null, disabled: false}, [Validators.required]],
    })
  }

  confFormTipoSala(sala: number): void {
    if(sala){
      this.salidaF.nivelGas.disabled;
      this.salidaF.nivelGas.clearValidators();
      this.salidaF.nivelGas.setValue("");
    }
  }

  cancelar(): void {
    if (this.indice === 1) {
      this.indice--;
      return;
    }
    this.ref.close()
  }

  get salidaF() {
    return this.registroSalidaForm.controls;
  }

  guardar(): void {
    if (this.indice === 0) {
      this.indice++;
      return;
    }
    this.loaderService.activar();
    this.reservarSalasService.actualizar(this.datosGuardar()).pipe(
      finalize(() => this.loaderService.desactivar())
    ).subscribe(
      (respuesta: HttpRespuesta<any>) => {
        this.alertaService.mostrar(TipoAlerta.Exito, 'Has registrado la salida/término del servicio correctamente.');
        this.ref.close(true);
      },
      (error : HttpErrorResponse) => {
        console.error("ERROR: ", error.message);
        this.alertaService.mostrar(TipoAlerta.Error, 'Error al guardar la información. Intenta nuevamente.');
      }
    );

  }

  datosGuardar(): SalidaSala {
    return {
        idSala: this.salaSeleccionada.idSala,
        fechaSalida: moment(this.salidaF.fecha.value).format('yyyy/MM/DD') ,
        horaSalida: moment(this.salidaF.hora.value).format('HH:mm'),
        cantidadGasFinal: this.salidaF.nivelGas.value,
        idRegistro: this.salaSeleccionada.idRegistroBitacora
    }
  }
}
