import {Component, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/core";
import interactionPlugin from '@fullcalendar/interaction';
import {DialogService, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {DetalleActividadDiaComponent} from "../detalle-actividad-dia/detalle-actividad-dia.component";
import {FullCalendarComponent} from "@fullcalendar/angular";
import { LoaderService } from 'projects/sivimss-gui/src/app/shared/loader/services/loader.service';
import { AlertaService, TipoAlerta } from 'projects/sivimss-gui/src/app/shared/alerta/services/alerta.service';
import { ActivatedRoute } from '@angular/router';
import { CapillaReservacionService } from '../../services/capilla-reservacion.service';
import { HttpRespuesta } from 'projects/sivimss-gui/src/app/models/http-respuesta.interface';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { TipoDropdown } from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import { CalendarioCapillas } from '../../models/capilla-reservacion.interface';
// import { MENU_SALAS } from '../../../reservar-salas/constants/menu-salas';
import { mapearArregloTipoDropdown } from 'projects/sivimss-gui/src/app/utils/funciones';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

import {Moment} from 'moment';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
  providers: [DialogService]
})

export class CalendarioComponent implements OnInit {

  @ViewChild('calendarioCapillas')calendarioCapillas!: FullCalendarComponent;

  calendarOptions!: CalendarOptions;

  fechaSeleccionada: string = "";
  calendarApi:any;

  actividadRef!: DynamicDialogRef;

  velatorios: TipoDropdown[] = [];

  posicionPestania: number = 0;
  velatorioPosicion!: number ;
  velatorio!: number ;
  filtroCalendarForm!: FormGroup;
    registroCalendario: any[] = [];
    tituloCapillas: CalendarioCapillas[] = [];
    capillasDetalle: CalendarioCapillas[] = [];
    currentEvents: EventApi[] = [];




  fechaCalendario!: Moment;

  constructor(
    public dialogService: DialogService,
    private readonly loaderService: LoaderService,
    private alertaService: AlertaService,
    private route: ActivatedRoute,
    private capillaReservacionService: CapillaReservacionService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.inicializarCalendario();
    this.inicializarCalendarioForm();

    let respuesta = this.route.snapshot.data['respuesta']
    this.velatorios = mapearArregloTipoDropdown(
      respuesta[0]?.datos,
      'velatorio',
      'id',
    );

  }

  inicializarCalendarioForm(): void {
    this.filtroCalendarForm = this.formBuilder.group({
      velatorio: [{value: null, disabled: false}],
    })
  }


  inicializarCalendario(): void {
    console.log('se está inicializando el calendar ')
    this.calendarOptions = {
      headerToolbar: { end: "next", center: "title", start: "prev" },

      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin,interactionPlugin],
      initialEvents: "",
      defaultAllDay: true,
      editable:false,

      locale: 'es-MX',
      selectable: true,
      dayHeaders:false,
      eventClick: this.mostrarEvento.bind(this),
      eventsSet: this.handleEvents.bind(this),
      dayMaxEventRows:3,
      titleFormat: { year: 'numeric', month: 'long' },
      datesSet: event => {

        let mesInicio = +moment(event.start).format("MM");
        let mesFinal =  +moment(event.end).format("MM");
        if(mesFinal - mesInicio == 2){
          this.fechaCalendario = moment(event.start).add(1,'month');
        }else{
          this.fechaCalendario = moment(event.start);
        }

        if(this.velatorio) {this.cambiarMes("cambio mes")}
      },
    };
  }


  cambiarMes(origen:string): void {
    this.capillasDetalle = [];
    this.tituloCapillas = [];
    let anio = moment(this.fechaCalendario).format('YYYY').toString();
    let mes = moment(this.fechaCalendario).format('MM').toString();
      this.calendarApi = this.calendarioCapillas.getApi()
      this.calendarApi.removeAllEvents();
    if(this.velatorio) {
      this.capillaReservacionService.consultaMes(+mes,+anio,this.velatorio).pipe(
      ).subscribe(
        (respuesta: HttpRespuesta<any>) => {
          this.loaderService.desactivar();
          this.calendarApi = this.calendarioCapillas.getApi();
          respuesta.datos.forEach((capilla: any) => {
            let bandera: boolean = false;
            this.calendarApi.getApi().addEvent(
              {id: capilla.idCapilla, title: capilla.nomCapilla, start: capilla.fechaEntrada, color:capilla.color}
          )
            this.tituloCapillas.forEach((tituloCapillas : any) => {
              if(tituloCapillas.id == capilla.idCapilla){
                bandera = true;
                return;
              }
            });
            if(!bandera){
              this.tituloCapillas.push(
                {
                  borderColor: capilla.color,
                  textColor: capilla.color,
                  title: capilla.nomCapilla,
                  id:capilla.idCapilla
                }
              )
            }
          })
          this.tituloCapillas = [...this.tituloCapillas]
        },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
        }
      )
    }
  }

  mostrarModal(selectInfo: DateSelectArg) {
    this.fechaSeleccionada = selectInfo.startStr;
    this.actividadRef = this.dialogService.open(DetalleActividadDiaComponent,{
      header: 'Ver actividad del día',
      width: "920px",
      data: this.fechaSeleccionada
    })
  }

  mostrarEvento(clickInfo: EventClickArg) {
    this.fechaSeleccionada = clickInfo.event._def.publicId;
  }

  handleEvents(events: EventApi[]) {
    // debugger;
    // console.log(events);
    this.currentEvents = events;
  }

  cambiarPestania(pestania: any): void {
    this.posicionPestania = pestania.index;
    this.consultarCapillas();
  }

  consultarCapillas(): void {
    let parametros = {
      anio: "2023",
      mes: "Abril",
      idVelatorio:  this.filtroCalendarForm.get('velatorio')?.value
    }

    this.loaderService.activar();
    this.capillaReservacionService.consultarCapillas(parametros).pipe(
      finalize(() => this.loaderService.desactivar())
      ).subscribe(
        (respuesta: HttpRespuesta<any>) => {
          respuesta.datos.forEach((capilla: any) => {
            let bandera: boolean = false;
            this.calendarioCapillas.getApi().addEvent(
              {id: capilla.idCapilla, title: capilla.nomCapilla, start: capilla.fechaEntrada, color:capilla.color})

              this.tituloCapillas.forEach((tituloCapillas : any) => {
                if(tituloCapillas.id == capilla.idCapilla){
                  bandera = true;
                  return;
                }
          });
          if(!bandera){
            this.tituloCapillas.push(
              {
                borderColor: capilla.color,
                textColor: capilla.color,
                title: capilla.nomCapilla,
                id:capilla.idCapilla
              }
            )
          }
       }
          );
      },

      (error:HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
  }
}



