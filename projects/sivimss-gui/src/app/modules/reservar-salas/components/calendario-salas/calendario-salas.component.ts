import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {MENU_SALAS} from "../../constants/menu-salas";
import interactionPlugin from "@fullcalendar/interaction";
import {DialogService, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {Calendario} from "../../models/calendario.interface";
import {VerActividadSalasComponent} from "../ver-actividad-salas/ver-actividad-salas.component";
import {ActivatedRoute} from "@angular/router";
import {VelatorioInterface} from "../../models/velatorio.interface";
import {HttpRespuesta} from "../../../../models/http-respuesta.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {LoaderService} from "../../../../shared/loader/services/loader.service";
import {ReservarSalasService} from "../../services/reservar-salas.service";
import {FullCalendar} from "primeng-lts/fullcalendar";
import * as moment from 'moment';

@Component({
  selector: 'app-calendario-salas',
  templateUrl: './calendario-salas.component.html',
  styleUrls: ['./calendario-salas.component.scss'],
  providers: [DialogService]
})
export class CalendarioSalasComponent implements OnInit {

  @ViewChild('fullcalendar') calendarioCremacion!: FullCalendar;
  @ViewChild('fullcalendar') calendarioEmbalsamamiento!: FullCalendar;

  readonly POSICION_CATALOGO_VELATORIOS = 0;

  calendarOptions!: CalendarOptions;
  velatorios: TipoDropdown[] = [];
  menu: string[] = MENU_SALAS;

  posicionPestania: number = 0;
  velatorio: number = 0 ;

  fechaSeleccionada: string = "";
  actividadRef!: DynamicDialogRef;

  registroCalendario: any[] = [];

  tituloSalas: Calendario[] = [];
  currentEvents: EventApi[] = [];



  constructor(
    private alertaService: AlertaService,
    public dialogService: DialogService,
    private readonly loaderService: LoaderService,
    private route: ActivatedRoute,
    private reservarSalasService:ReservarSalasService
  ) {
  }

  ngOnInit(): void {
    const respuesta = this.route.snapshot.data['respuesta'];
    this.velatorios = respuesta[this.POSICION_CATALOGO_VELATORIOS]!.datos.map((velatorio: VelatorioInterface) => (
      {label: velatorio.nomVelatorio, value: velatorio.idVelatorio} )) || [];
    this.registroCalendario = this.inicializarRegistros();
    // this.tituloSalas = this.inicializarTitulosCalendario();
    this.inicializarCalendario();
  }

  inicializarCalendario(): void {
      this.calendarOptions = {
        headerToolbar: { end: "next", center: "title", start: "prev" },
        initialView: 'dayGridMonth',
        plugins: [interactionPlugin, dayGridPlugin],
        initialEvents: this.registroCalendario,
        defaultAllDay: true,
        editable: false,
        // select: this.mostrarModal.bind(this),
        locale: 'es-MX',
        selectable: true,
        dayHeaders:false,
        eventClick: this.mostrarEvento.bind(this),
        eventsSet: this.handleEvents.bind(this),
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
    const idSala: number = +clickInfo.event._def.publicId;
    this.fechaSeleccionada =  moment(clickInfo.event._instance?.range.end).format('yyyy-MM-DD');



    this.actividadRef = this.dialogService.open(VerActividadSalasComponent,{
      header: 'Ver actividad del día',
      width: "920px",
      data: {fecha:this.fechaSeleccionada, idSala: idSala}
    })


  }

  inicializarRegistros(): any[] {
    return [
      { id:"1",title: 'Ignacio Allende', date: '2023-04-21',textColor:"#217A6B", color:"#fff", borderColor: '#217A6B' },

      {id:'1', title: 'Ignacio Allende', date: '2023-04-04',textColor:"#217A6B", color:"#fff", borderColor: '#217A6B' },
      {id:'2', title: 'Miguel Hidalgo', date: '2023-04-04',textColor:"#5E217A", color:"#fff", borderColor: '#5E217A' },
      {id:'1', title: 'Ignacio Allende', date: '2023-04-04',textColor:"#217A6B", color:"#fff", borderColor: '#217A6B' },
      { id:'4',title: 'Sor Juana Inés', date: '2023-04-21',textColor:"#E18F2D", color:"#fff", borderColor: '#E18F2D' },
      {id:'1', title: 'Ignacio Allende', date: '2023-04-04',textColor:"#217A6B", color:"#fff", borderColor: '#217A6B' },
      { id:'2',title: 'Miguel Hidalgo', date: '2023-04-05',textColor:"#5E217A", color:"#fff", borderColor: '#5E217A' },
      {id:'3', title: 'Sor Juana Inés', date: '2023-04-06',textColor:"#E18F2D", color:"#fff", borderColor: '#E18F2D' }
    ]
  }

  inicializarTitulosCalendario(): Calendario[] {
    return [
      { title: 'Ignacio Allende', textColor:"#217A6B",borderColor: '#217A6B' },
      { title: 'Miguel Hidalo', textColor:"#5E217A", borderColor: '#5E217A' },
      { title: 'Sor Juana Inés', textColor:"#E18F2D", borderColor: '#E18F2D' },
    ]
  }

  handleEvents(events: EventApi[]) {
    // debugger;
    this.currentEvents = events;
  }

  cambiarPestania(pestania: any): void {
    this.posicionPestania = pestania.index;
    this.consultaSalas();
  }

  consultaSalas(): void {
    console.log(this.posicionPestania);
    console.log(this.velatorio);
    this.loaderService.activar();
    this.reservarSalasService.consultarSalas(this.velatorio,this.posicionPestania).subscribe(
      (respuesta: HttpRespuesta<any>) => {
        this.loaderService.desactivar();
        if(this.posicionPestania == 0){


          // this.salasCremacion = respuesta.datos;



        }else{


          // this.salasEmbalsamamiento = respuesta.datos;


        }
      },
      (error:HttpErrorResponse) => {
        this.loaderService.desactivar();
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
  }

}
