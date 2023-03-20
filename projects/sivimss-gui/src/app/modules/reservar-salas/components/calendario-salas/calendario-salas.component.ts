import {Component, OnInit} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {MENU_SALAS} from "../../constants/menu-salas";

@Component({
  selector: 'app-calendario-salas',
  templateUrl: './calendario-salas.component.html',
  styleUrls: ['./calendario-salas.component.scss']
})
export class CalendarioSalasComponent implements OnInit {

  calendarOptions!: CalendarOptions;
  mesAnterior: Date = this.obtenerMesAnterior()
  mesAnteriorUltimoDia: Date = this.obtenerMesAnterior(true)
  velatorios: TipoDropdown[] = [];
  menu: string[] = MENU_SALAS;

  constructor() {
  }

  ngOnInit(): void {
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
    this.calendarOptions = {
      // headerToolbar: { end: "", start: "" },
      // validRange: {
      //   start: this.mesAnterior,
      //   end: this.mesAnteriorUltimoDia
      // },
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin],
      //initialEvents: this.registros,
      // defaultAllDay: true,
      // select: this.mostrarModal.bind(this),
      locale: 'es-MX',
      // selectable: this.camposHabilitados,
      editable: false,
      // eventsSet: this.handleEvents.bind(this),
      // eventClick: this.mostrarEvento.bind(this)
    };
  }
}
