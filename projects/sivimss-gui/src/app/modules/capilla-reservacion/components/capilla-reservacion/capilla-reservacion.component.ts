import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BreadcrumbService} from "../../../../shared/breadcrumb/services/breadcrumb.service";
import {DialogService, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {SERVICIO_BREADCRUMB} from "../../constants/breadcrumb";
import {SelectButtonModule} from "primeng-lts/selectbutton";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {CATALOGOS_DUMMIES} from "../../../servicios-funerarios/constants/dummies";
import {RegistrarEntradaComponent} from "../registrar-entrada/registrar-entrada.component";
import {RegistrarSalidaComponent} from "../registrar-salida/registrar-salida.component";
import { ActivatedRoute } from '@angular/router';
import { mapearArregloTipoDropdown } from 'projects/sivimss-gui/src/app/utils/funciones';
import { CapillaReservacionService } from '../../services/capilla-reservacion.service';
import { LoaderService } from 'projects/sivimss-gui/src/app/shared/loader/services/loader.service';
import { HttpRespuesta } from 'projects/sivimss-gui/src/app/models/http-respuesta.interface';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-capilla-reservacion',
  templateUrl: './capilla-reservacion.component.html',
  styleUrls: ['./capilla-reservacion.component.scss'],
  providers: [DialogService]
})
export class CapillaReservacionComponent implements OnInit {

  fechaEntrada: any
  horaEntrada: any
  fechaSalida: any
  horaSalida: any

  registrarEntradaForm!: FormGroup;
  registrarSalidaForm!: FormGroup;
  calendarioForm!: FormGroup;

  creacionRef!: DynamicDialogRef
  detalleRef!: DynamicDialogRef;
  modificacionRef!: DynamicDialogRef;

  agregarEntradaRef!: DynamicDialogRef;
  agregarSalidaRef!: DynamicDialogRef;

  posicionPestania: number = 0;
  velatorioPosicion!: number ;

  capilla: any[] = [];

  opciones: SelectButtonModule[] = [
    {icon: 'pi pi-align-left' , value: '0'},
    {icon: 'pi pi-align-left', value: '1'}
  ];


  value: number = 0;

  velatorio:TipoDropdown[] = [];




  constructor(
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    public dialogService: DialogService,
    private alertaService: AlertaService,
    private route: ActivatedRoute,
    private capillaReservacionService: CapillaReservacionService,
    private readonly loaderService: LoaderService,
  ) { }

  ngOnInit(): void {

     this.actualizarBreadcrumb();
     this.inicializarRegistroEntradaForm();
     this.inicializarRegistroSalidaForm();
     this.inicializarCalendarioForm();
    let respuesta = this.route.snapshot.data['respuesta']
    this.velatorio = mapearArregloTipoDropdown(
      respuesta[0]?.datos,
      'velatorio',
      'id',
    )

  }

  actualizarBreadcrumb(): void{
    this.breadcrumbService.actualizar(SERVICIO_BREADCRUMB);
  }

  inicializarRegistroEntradaForm(): void {
    this.registrarEntradaForm = this.formBuilder.group({
      velatorio: [{value: null, disabled: false}],
      fechaEntrada: [{value: null, disabled: false}, [Validators.required]],
      horaEntrada: [{value: null, disabled: false}, [Validators.required]],
    })
  }

  inicializarRegistroSalidaForm(): void {
    this.registrarSalidaForm = this.formBuilder.group({
      capilla: [{value: null, disabled: false}],
      fechaSalida: [{value: null, disabled: false}, [Validators.required]],
      horaSalida: [{value: null, disabled: false}, [Validators.required]],
    })
  }

  inicializarCalendarioForm(): void {
    this.calendarioForm = this.formBuilder.group( {
      velatorio: [{value: null, disabled: false}],
    });
  }


  obtenerObjetoParaRegistrarEntrada() {
    let fechaHasta = this.registrarEntradaForm.get('fechaEntrada')?.value
    if (fechaHasta == null) {
      this.fechaEntrada = fechaHasta
    } else {
      let fechaHastaSinHora = fechaHasta.toISOString().substring(0, 10)
      this.fechaEntrada = fechaHastaSinHora
    }
    let fechaDesde = this.registrarEntradaForm.get('horaEntrada')?.value;
    if (fechaDesde == null) {
      this.horaEntrada = fechaDesde;
    } else {
      let horaEntradaSinSegundos = fechaDesde.toISOString().substring(11, 16);
      this.horaEntrada = horaEntradaSinSegundos;
    }

    return {
      idVelatorio: parseInt(this.registrarEntradaForm.get('velatorio')?.value),
      fechaEntrada: this.fechaEntrada,
      registroEntrada:  this.horaEntrada
    }
  }

  obtenerObjetoParaRegistrarSalida() {
    let fechaHasta = this.registrarSalidaForm.get('fechaSalida')?.value
    if (fechaHasta == null) {
      this.fechaSalida = fechaHasta
    } else {
      let fechaHastaSinHora = fechaHasta.toISOString().substring(0, 10)
      this.fechaSalida = fechaHastaSinHora
    }
    let fechaDesde = this.registrarSalidaForm.get('horaSalida')?.value;
    if (fechaDesde == null) {
      this.horaSalida = fechaDesde;
    } else {
      let horaSalidaSinSegundos = fechaDesde.toISOString().substring(11, 16);
      this.horaSalida = horaSalidaSinSegundos;
    }

    return {
      idCapilla: parseInt(this.registrarSalidaForm.get('capilla')?.value),
      fechaSalida: this.fechaSalida,
      horaSalida:  this.horaSalida
    }
  }


  abrirModalAgregarEntrada(): void {
    let objParaRegistrarEntrada = this.obtenerObjetoParaRegistrarEntrada();
    this.creacionRef = this.dialogService.open(RegistrarEntradaComponent, {
      data: objParaRegistrarEntrada,
      header: "Registrar entrada",
      width: "920px",
    })
  }

  abrirModalAgregarSalida(): void {
    debugger
    let objParaRegistrarSalida = this.obtenerObjetoParaRegistrarSalida();
    this.agregarSalidaRef = this.dialogService.open(RegistrarSalidaComponent,{
      data: objParaRegistrarSalida,
      header: 'Registrar salida',
      width: "920px",
    });
  }

  obtenerCapillaPorIdVelatorio(){
    let idVelatorio = this.registrarEntradaForm.get('velatorio')?.value
    this.capillaReservacionService.buscarPorIdVelatorio(idVelatorio).subscribe(
     (respuesta) => {
       if (respuesta.datos) {
       this.capilla = respuesta!.datos.map((capilla: any) => {
         return { label: capilla.nomCapilla, value: capilla.idCapilla };
       });
     }
     },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
   }


  get fe() {
    return this.registrarEntradaForm.controls;
  }

  get fs() {
    return this.registrarSalidaForm.controls;
  }


}
