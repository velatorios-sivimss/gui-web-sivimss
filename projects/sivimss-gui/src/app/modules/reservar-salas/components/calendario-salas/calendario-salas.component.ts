import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, EventApi, EventClickArg} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {MENU_SALAS} from "../../constants/menu-salas";
import interactionPlugin from "@fullcalendar/interaction";
import {DialogService, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {CalendarioSalas} from "../../models/calendario-salas.interface";
import {VerActividadSalasComponent} from "../ver-actividad-salas/ver-actividad-salas.component";
import {ActivatedRoute} from "@angular/router";
import {VelatorioInterface} from "../../models/velatorio.interface";
import {HttpRespuesta} from "../../../../models/http-respuesta.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {LoaderService} from "../../../../shared/loader/services/loader.service";
import {ReservarSalasService} from "../../services/reservar-salas.service";
import * as moment from 'moment';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {finalize} from "rxjs/operators";
import {Moment} from "moment";

@Component({
  selector: 'app-calendario-salas',
  templateUrl: './calendario-salas.component.html',
  styleUrls: ['./calendario-salas.component.scss'],
  providers: [DialogService]
})
export class CalendarioSalasComponent implements OnInit{

  @ViewChild('calendarioCremacion') calendarioCremacion!: FullCalendarComponent;
  @ViewChild('calendarioEmbalsamamiento') calendarioEmbalsamamiento!: FullCalendarComponent;

  readonly POSICION_CATALOGO_VELATORIOS = 0;

  fechaCalendario!: Moment;
  calendarApi:any;
  calendarOptions!: CalendarOptions;
  velatorios: TipoDropdown[] = [];
  menu: string[] = MENU_SALAS;

  posicionPestania: number = 0;
  velatorio!: number ;

  fechaSeleccionada: string = "";
  actividadRef!: DynamicDialogRef;

  registroCalendario: any[] = [];
  tituloSalas: CalendarioSalas[] = [];
  salasDetalle: CalendarioSalas[] = [];
  currentEvents: EventApi[] = [];



  constructor(
    private alertaService: AlertaService,
    public dialogService: DialogService,
    private readonly loaderService: LoaderService,
    private route: ActivatedRoute,
    private reservarSalasService:ReservarSalasService,
    // public calendarioConsulta: FullCalendarComponent
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
        plugins: [dayGridPlugin,interactionPlugin],
        initialEvents: "",
        defaultAllDay: true,
        editable:false,

        // select: this.mostrarModal.bind(this),
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
          if(this.velatorio) {this.cambiarMes()}
        },
      };
    }

  cambiarMes(): void {

    this.salasDetalle = [];
    let anio = moment(this.fechaCalendario).format('YYYY').toString();
    let mes = moment(this.fechaCalendario).format('MM').toString();


    if(!this.posicionPestania){
      this.calendarApi = this.calendarioCremacion.getApi()
    }
    if(this.posicionPestania){
      this.calendarApi = this.calendarioEmbalsamamiento.getApi()
    }

    if(this.velatorio) {
      this.reservarSalasService.consultaMes(+mes,+anio,this.posicionPestania,this.velatorio).pipe(
      ).subscribe(
        (respuesta: HttpRespuesta<any>) => {
          respuesta.datos.forEach((sala: any) => {

            if(!this.posicionPestania){
                this.calendarioCremacion.getApi().addEvent(
                  {id: sala.idSala,title: sala.nombreSala,start: sala.fechaEntrada},
                );
            }else{

            }
            if(!this.tituloSalas.includes(sala.idSala)){
              this.tituloSalas.push(
                {
                  borderColor: sala.colorSala,
                  textColor: sala.colorSala,
                  title: sala.nombreSala
                }
              )
            }


          })

          this.tituloSalas =  respuesta.datos.filter((elemenetoFil: any) => {
            return elemenetoFil
          });
        },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
        }
      )



    }
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
      { id:"1",title: 'sala no 45', date: '2023-04-18',textColor:"#217A6B", color:"#fff", borderColor: '#217A6B' },
      {id:'1', title: 'Ignacio Allende', date: '2023-04-05',textColor:"#217A6B", color:"#fff", borderColor: '#217A6B' },
      {id:'2', title: 'Miguel Hidalgo', date: '2023-04-04',textColor:"#5E217A", color:"#fff", borderColor: '#5E217A' },
      {id:'1', title: 'Ignacio Allende', date: '2023-04-06',textColor:"#217A6B", color:"#fff", borderColor: '#217A6B' },
      { id:'4',title: 'sala no 2', date: '2023-04-21',textColor:"#E18F2D", color:"#fff", borderColor: '#E18F2D' },
      {id:'1', title: 'Ignacio Allende', date: '2023-04-04',textColor:"#217A6B", color:"#fff", borderColor: '#217A6B' },
      { id:'2',title: 'Miguel Hidalgo', date: '2023-04-05',textColor:"#5E217A", color:"#fff", borderColor: '#5E217A' },
      {id:'3', title: 'Sor Juana Inés', date: '2023-04-06',textColor:"#E18F2D", color:"#fff", borderColor: '#E18F2D' }
    ]
  }

  inicializarTitulosCalendario(): CalendarioSalas[] {
    return [
      { title: 'Sala no 45', textColor:"#0000FF",borderColor: '#0000FF' },
      { title: 'Sala no 2', textColor:"#7FFF00", borderColor: '#7FFF00' },
    ];
  }

  handleEvents(events: EventApi[]) {
    // debugger;
    // console.log(events);
    this.currentEvents = events;
  }

  cambiarPestania(pestania: any): void {
    this.posicionPestania = pestania.index;
    this.consultaSalas();
  }

  consultaSalas(): void {
    this.loaderService.activar();
    this.reservarSalasService.consultarSalas(this.velatorio,this.posicionPestania).pipe(
      finalize(() => this.loaderService.desactivar())
    ).subscribe(
      (respuesta: HttpRespuesta<any>) => {
        this.loaderService.desactivar();
        if(this.posicionPestania == 0){


          // this.salasCremacion = respuesta.datos;



        }else{


          // this.salasEmbalsamamiento = respuesta.datos;


        }
      },
      (error:HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
  }

}
