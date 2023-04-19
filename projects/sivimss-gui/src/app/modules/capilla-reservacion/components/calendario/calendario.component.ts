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
import { MENU_SALAS } from '../../../reservar-salas/constants/menu-salas';
import { mapearArregloTipoDropdown } from 'projects/sivimss-gui/src/app/utils/funciones';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
  providers: [DialogService]
})

export class CalendarioComponent implements OnInit {

  @ViewChild('calendarioCapillas')
  calendarComponent!: FullCalendarComponent;
  menu: string[] = MENU_SALAS;

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


  // currentEvents: EventApi[] = [];
  constructor(
    public dialogService: DialogService,
    private readonly loaderService: LoaderService,
    private alertaService: AlertaService,
    private route: ActivatedRoute,
    private capillaReservacionService: CapillaReservacionService,
    private formBuilder: FormBuilder,
    // public calendarioConsulta: FullCalendarComponent
  ) { }

  ngOnInit(): void {
    this.inicializarCalendario();
    this.inicializarCalendarioForm();
    // this.registroCalendario = this.inicializarRegistros();

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
    this.calendarOptions = {
    headerToolbar: { end: "", start: "prev,next" },
      initialView: 'dayGridMonth',
      plugins: [interactionPlugin, dayGridPlugin],
      initialEvents: this.calendarApi,
      defaultAllDay: true,
      select: this.mostrarModal.bind(this),
      locale: 'es-MX',
      selectable: true,
      editable: false,
      dayHeaders:false,
      eventClick: this.mostrarEvento.bind(this),
      dayMaxEventRows:3,
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

    debugger
    this.loaderService.activar();
    this.capillaReservacionService.consultarCapillas(parametros).pipe(
      finalize(() => this.loaderService.desactivar())
    ).subscribe(
      (respuesta: HttpRespuesta<any>) => {

        this.loaderService.desactivar();
          this.calendarApi = this.calendarComponent.getApi();
          respuesta.datos.forEach((capilla: any) => {
            this.calendarApi.getApi().addEvent(
              {id: capilla.idCapilla, title: capilla.nomCapilla, start: capilla.fechaEntrada, color:capilla.color}
          )
          });
      },
      (error:HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
  }




}



