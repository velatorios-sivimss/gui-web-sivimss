import { Component, OnInit } from '@angular/core';
import * as moment from "moment/moment";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {SalaVelatorioConsultaDia} from "../../models/sala-velatorio.interface";
import {ReservarSalasService} from "../../services/reservar-salas.service";
import {finalize,map} from "rxjs/operators";
import {LoaderService} from "../../../../shared/loader/services/loader.service";
import {HttpRespuesta} from "../../../../models/http-respuesta.interface";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-ver-actividad-salas',
  templateUrl: './ver-actividad-salas.component.html',
  styleUrls: ['./ver-actividad-salas.component.scss']
})
export class VerActividadSalasComponent implements OnInit {

  fechaSeleccionada: string = "";
  idSala:number = 0;
  salas: SalaVelatorioConsultaDia[] = [];

  constructor(
    private readonly ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private reservarSalasService:ReservarSalasService,
    private readonly loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.fechaSeleccionada = this.config.data.fecha;
    this.idSala = this.config.data.idSala;
    this.consultarDetalleDia();
  }

  consultarDetalleDia(): void {
    this.loaderService.activar();
    this.reservarSalasService.consultarDetalleDia(this.fechaSeleccionada,this.idSala).pipe(
      // map((elemento) => {
      //   debugger;
      //   elemento.datos.forEach(((sala:SalaVelatorioConsultaDia) => {
      //     sala.horaEntrada = moment(sala.horaSalida).format('HH:mm')
      //   }));
      // }),
      finalize(() => this.loaderService.desactivar())
    ).subscribe(
      (respuesta: HttpRespuesta<any>) => {
        this.salas = respuesta.datos;
      },
      (error:HttpErrorResponse) => {
        console.error("ERROR: ", error.message);
      }
    );
  }

  aceptar(): void {
    this.ref.close();
  }

}
