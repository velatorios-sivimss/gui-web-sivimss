import {Component, OnInit, ViewChild} from '@angular/core';
import {TipoDropdown} from '../../../../models/tipo-dropdown';
import {MENU_SALAS} from '../../constants/menu-salas';
import {SalaVelatorio} from '../../models/sala-velatorio.interface';
import {DIEZ_ELEMENTOS_POR_PAGINA} from 'projects/sivimss-gui/src/app/utils/constantes';
import {DialogService, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {RegistrarEntradaComponent} from "../registrar-entrada/registrar-entrada.component";
import {RegistrarSalidaComponent} from "../registrar-salida/registrar-salida.component";
import {HttpRespuesta} from "../../../../models/http-respuesta.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {ReservarSalasService} from "../../services/reservar-salas.service";
import {Catalogo} from "../../../../models/catalogos.interface";
import {VelatorioInterface} from "../../models/velatorio.interface";
import {ActivatedRoute} from "@angular/router";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {TabView} from "primeng-lts/tabview";
import {LoaderService} from "../../../../shared/loader/services/loader.service";

@Component({
  selector: 'app-listado-salas',
  templateUrl: './listado-salas.component.html',
  styleUrls: ['./listado-salas.component.scss'],
  providers: [DialogService]
})
export class ListadoSalasComponent implements OnInit {

  readonly POSICION_CATALOGO_VELATORIOS = 0;

  velatorios: TipoDropdown[] = [];

  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  menu: string[] = MENU_SALAS;
  numPaginaActual: number = 0;
  posicionPestania: number = 0;
  totalElementos: number = 0;
  velatorio: number = 0 ;

  salasCremacion: SalaVelatorio[] = [];
  salasEmbalsamamiento: SalaVelatorio[] = [];

  registrarEntradaRef!: DynamicDialogRef;
  registrarSalidaRef!: DynamicDialogRef;


  constructor(
    private route: ActivatedRoute,
    private alertaService: AlertaService,
    public dialogService: DialogService,
    private readonly loaderService: LoaderService,
    private reservarSalasService:ReservarSalasService) {
  }

  ngOnInit(): void {
    const respuesta = this.route.snapshot.data['respuesta'];
    this.velatorios = respuesta[this.POSICION_CATALOGO_VELATORIOS]!.datos.map((velatorio: VelatorioInterface) => (
      {label: velatorio.nomVelatorio, value: velatorio.idVelatorio} )) || [];
    }

  registrarActividad(sala: SalaVelatorio): void {
    if (sala.estadoSala != "Disponible") {
      this.registrarSalida(sala);
      return;
    }
    this.registrarEntrada(sala);
  }

  registrarEntrada(sala: SalaVelatorio): void {
    this.registrarEntradaRef = this.dialogService.open(RegistrarEntradaComponent, {
      header: 'Registrar Entrada',
      width: '920px',
      data: {sala:sala, tipoSala: this.posicionPestania},
    });
    this.registrarEntradaRef.onClose.subscribe((respuesta) => {
      if(respuesta){
        this.consultaSalasCremacion();
      }
    });
  }

  private registrarSalida(sala:SalaVelatorio): void {
    this.registrarSalidaRef =this.dialogService.open(RegistrarSalidaComponent, {
      header: 'Registrar Salida',
      width: '920px',
      data: {sala:sala, tipoSala: this.posicionPestania},
    });
    this.registrarSalidaRef.onClose.subscribe((respuesta) => {
      if(respuesta){
        this.consultaSalasCremacion();
      }
    });
  }

  cambiarPestania(pestania: any): void {
    this.posicionPestania = pestania.index;
    this.consultaSalasCremacion();
  }



  consultaSalasCremacion(): void {
    this.loaderService.activar();
    this.reservarSalasService.consultarSalas(this.velatorio,this.posicionPestania).subscribe(
      (respuesta: HttpRespuesta<any>) => {
        this.loaderService.desactivar();
        if(this.posicionPestania == 0){
          this.salasCremacion = respuesta.datos;
        }else{
          this.salasEmbalsamamiento = respuesta.datos;
        }
      },
      (error:HttpErrorResponse) => {
        this.loaderService.desactivar();
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
  }

  retornarColor(estatus:string): string {

    if(estatus === "Disponible"){return "#83b727"}
    if(estatus === "Ocupada"){return "#9d2449"}
    if(estatus === "En mantenimiento"){return "#ffff00"}
    return "";
  }
}
