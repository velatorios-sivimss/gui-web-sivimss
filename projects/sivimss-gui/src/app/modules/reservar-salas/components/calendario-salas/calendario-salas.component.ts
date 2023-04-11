import {Component, OnInit} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {MENU_SALAS} from "../../constants/menu-salas";
import interactionPlugin from "@fullcalendar/interaction";
import {DialogService, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {Calendario} from "../../models/calendario.interface";
import {VerActividadSalasComponent} from "../ver-actividad-salas/ver-actividad-salas.component";

@Component({
  selector: 'app-calendario-salas',
  templateUrl: './calendario-salas.component.html',
  styleUrls: ['./calendario-salas.component.scss'],
  providers: [DialogService]
})
export class CalendarioSalasComponent implements OnInit {

  calendarOptions!: CalendarOptions;
  mesAnterior: Date = this.obtenerMesAnterior()
  mesAnteriorUltimoDia: Date = this.obtenerMesAnterior(true)
  velatorios: TipoDropdown[] = [];
  menu: string[] = MENU_SALAS;

  fechaSeleccionada: string = "";
  actividadRef!: DynamicDialogRef;

  registroCalendario: Calendario[] = [];

  tituloSalas: Calendario[] = [];

  constructor(
    public dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.registroCalendario = this.inicializarRegistros();
    this.tituloSalas = this.inicializarTitulosCalendario();
    this.inicializarCalendario();
  }

  obtenerMesAnterior(ultimoDia: boolean = false): Date {
    const fecha = new Date();
    fecha.setDate(0);
    if (ultimoDia) return fecha;
    fecha.setDate(1);
    return fecha;
  }

  inicializarCalendario(): void {
    // this.calendarOptions = {
      // headerToolbar: { end: "", start: "" },
      // validRange: {
      //   start: this.mesAnterior,
      //   end: this.mesAnteriorUltimoDia
      // },
      // initialView: 'dayGridMonth',
      // plugins: [dayGridPlugin],
      //initialEvents: this.registros,
      // defaultAllDay: true,
      // select: this.mostrarModal.bind(this),
      // locale: 'es-MX',
      // selectable: this.camposHabilitados,
      // editable: false,
      // eventsSet: this.handleEvents.bind(this),
      // eventClick: this.mostrarEvento.bind(this)
    // };

      this.calendarOptions = {
        headerToolbar: { end: "next", center: "title", start: "prev" },
        initialView: 'dayGridMonth',
        plugins: [interactionPlugin, dayGridPlugin],
        initialEvents: this.registroCalendario,
        defaultAllDay: true,
        editable: false,
        select: this.mostrarModal.bind(this),
        locale: 'es-MX',
        selectable: true,
        dayHeaders:false,
        eventClick: this.mostrarEvento.bind(this),
        dayMaxEventRows:3,
        titleFormat: { year: 'numeric', month: 'long' }
      };
    }

    mostrarModal(selectInfo: DateSelectArg): void {
      this.fechaSeleccionada = selectInfo.startStr;
      this.actividadRef = this.dialogService.open(VerActividadSalasComponent,{
        header: 'Ver actividad del día',
        width: "920px",
        data: this.fechaSeleccionada
      })
    }

  mostrarEvento(clickInfo: EventClickArg): void {
    this.fechaSeleccionada = clickInfo.event._def.publicId;
  }

  inicializarRegistros(): Calendario[] {
    return [
      { title: 'Ignacio Allende', date: '2023-04-04',textColor:"#217A6B", color:"#fff", borderColor: '#217A6B' },
      { title: 'Ignacio Allende', date: '2023-04-04',textColor:"#217A6B", color:"#fff", borderColor: '#217A6B' },
      { title: 'Ignacio Allende', date: '2023-04-04',textColor:"#217A6B", color:"#fff", borderColor: '#217A6B' },
      { title: 'Miguel Hidalgo', date: '2023-04-04',textColor:"#5E217A", color:"#fff", borderColor: '#5E217A' },
      { title: 'Ignacio Allende', date: '2023-04-04',textColor:"#217A6B", color:"#fff", borderColor: '#217A6B' },
      { title: 'Sor Juana Inés', date: '2023-04-04',textColor:"#E18F2D", color:"#fff", borderColor: '#E18F2D' },
      { title: 'Ignacio Allende', date: '2023-04-04',textColor:"#217A6B", color:"#fff", borderColor: '#217A6B' },
      { title: 'Miguel Hidalgo', date: '2023-04-05',textColor:"#5E217A", color:"#fff", borderColor: '#5E217A' },
      { title: 'Sor Juana Inés', date: '2023-04-06',textColor:"#E18F2D", color:"#fff", borderColor: '#E18F2D' }]
  }

  inicializarTitulosCalendario(): Calendario[] {
    return [
      { title: 'Ignacio Allende', textColor:"#217A6B",borderColor: '#217A6B' },
      { title: 'Miguel Hidalo', textColor:"#5E217A", borderColor: '#5E217A' },
      { title: 'Sor Juana Inés', textColor:"#E18F2D", borderColor: '#E18F2D' },
    ]
  }
}
