import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {SalaVelatorio} from "../../models/sala-velatorio.interface";
import {ReservarSalasService} from "../../services/reservar-salas.service";
import {HttpRespuesta} from "../../../../models/http-respuesta.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {LoaderService} from "../../../../shared/loader/services/loader.service";
import {finalize} from 'rxjs/operators';
import {EntradaSala} from "../../models/registro-sala.interface";
import * as moment from 'moment';

@Component({
  selector: 'app-registrar-entrada',
  templateUrl: './registrar-entrada.component.html',
  styleUrls: ['./registrar-entrada.component.scss']
})
export class RegistrarEntradaComponent implements OnInit {

  registroEntradaForm!: FormGroup;
  salaSeleccionada: SalaVelatorio = {};

  indice: number = 0;
  idOds:number = 0;
  tipoSala:number = 0;
  folioValido: boolean = false;

  opcionesInicio: TipoDropdown[] = [{label: 'Mantenimiento', value: '1'}, {label: 'Servicio de ODS', value: '2'}];


  constructor(
    private alertaService: AlertaService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private readonly loaderService: LoaderService,
    private reservarSalasService:ReservarSalasService
  ) {
    this.iniciarFormRegistroEntrada();
  }

  iniciarFormRegistroEntrada(): void {
    this.registroEntradaForm = this.formBuilder.group({
      inicioDe: [{value: null, disabled: false}, [Validators.required]],
      descripcionMantenimiento: [{value: null, disabled: false}],
      folioODS: [{value: null, disabled: false}, [Validators.required]],
      nombreContratante: [{value: null, disabled: true}, [Validators.required]],
      nombreFinado: [{value: null, disabled: true}, [Validators.required]],
      nombreResponsable: [{value: null, disabled: false}, [Validators.required]],
      nivelGas: [{value: null, disabled: false}, [Validators.required]],
      fecha: [{value: null, disabled: false}, [Validators.required]],
      hora: [{value: null, disabled: false}, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.salaSeleccionada = this.config.data.sala;
    this.tipoSala = this.config.data.tipoSala;
    this.confFormTipoSala(this.tipoSala);
  }

  consultaODS(): void {
    this.loaderService.activar();
    const folioODS = +this.entradaF.folioODS.value;
    if(!folioODS){
      this.loaderService.desactivar();
      return;
    }
    this.reservarSalasService.consultarODS(folioODS).pipe(
      finalize(() => this.loaderService.desactivar())
    ).subscribe(
    (respuesta: HttpRespuesta<any>) => {
        if (respuesta.datos){
          this.folioValido = true;
          this.idOds = respuesta.datos[0]?.idODS;
          this.entradaF.nombreContratante.setValue(respuesta.datos[0]?.nombreContratante);
          this.entradaF.nombreFinado.setValue(respuesta.datos[0]?.nombreFinado);
        }else{
          this.folioValido = false;
          this.entradaF.nombreContratante.patchValue(null);
          this.entradaF.nombreFinado.patchValue(null);
          this.alertaService.mostrar(TipoAlerta.Precaucion, "El número de folio no existe.\n" +
            "Verifica tu información.\n")
        }
      },
    (error:HttpErrorResponse) => {
      console.error(error);
      this.alertaService.mostrar(TipoAlerta.Error, error.message);
      }
    );
  }

  cambioInicioDe(event:any): void {
    console.log(this.registroEntradaForm);
    console.log(this.registroEntradaForm.get('descripcionMantenimiento'));
    console.log(this.registroEntradaForm.get('nivelGas'));
    if(event.value == 2){
      this.entradaF.descripcionMantenimiento.disabled;
      this.entradaF.descripcionMantenimiento.clearValidators();
      this.entradaF.descripcionMantenimiento.setValue(null);

    }else{
      this.entradaF.descripcionMantenimiento.enabled;
      this.entradaF.descripcionMantenimiento.setValidators([Validators.required]);
    }
  }

  guardar(): void {
    if (this.indice === 0) {
      this.indice++;
      return;
    }
    this.loaderService.activar();
    this.reservarSalasService.guardar(this.datosGuardar()).pipe(
      finalize(() => this.loaderService.desactivar())
    ).subscribe(
      (respuesta: HttpRespuesta<any>) => {
        this.alertaService.mostrar(TipoAlerta.Exito, 'Has registrado la entrada/inicio del servicio correctamente.');
        this.ref.close(true);
      },
      (error : HttpErrorResponse) => {
        console.error("ERROR: ", error.message);
        this.alertaService.mostrar(TipoAlerta.Error, 'Error al guardar la información. Intenta nuevamente.');
      }
    );
  }

  datosGuardar(): EntradaSala {
    return {
      idSala: this.salaSeleccionada.idSala,
      idOds: this.idOds,
      idTipoOcupacion: +this.entradaF.inicioDe.value,
      fechaEntrada: moment(this.entradaF.fecha.value).format('yyyy/MM/DD'),
      horaEntrada: moment(this.entradaF.hora.value).format('HH:mm'),
      cantidadGasInicial: this.entradaF.nivelGas.value,
      descripcionMantenimiento: this.entradaF.descripcionMantenimiento.value,
    }
  }

  confFormTipoSala(sala: number): void {
    if(sala){
      this.entradaF.nivelGas.disabled;
      this.entradaF.nivelGas.clearValidators();
      this.entradaF.nivelGas.setValue("");
    }
  }


  cancelar(): void {
    if (this.indice === 1) {
      this.indice--;
      return;
    }
    this.ref.close()
  }

  get entradaF() {
    return this.registroEntradaForm.controls;
  }

}
