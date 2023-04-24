import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { TipoDropdown } from '../../../../models/tipo-dropdown'
import { CATALOGOS_DUMMIES } from '../../../servicios-funerarios/constants/dummies'
import {
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng-lts/dynamicdialog'
import {
  AlertaService,
  TipoAlerta,
} from '../../../../shared/alerta/services/alerta.service'
import { RespuestaModalUsuario } from '../../../usuarios/models/respuestaModal.interface'
import { registrarEntrada } from '../../models/capilla-reservacion.interface'
import { OverlayPanel } from 'primeng-lts/overlaypanel'
import { CapillaReservacionService } from '../../services/capilla-reservacion.service'
import { HttpErrorResponse } from '@angular/common/http'
import { mapearArregloTipoDropdown } from 'projects/sivimss-gui/src/app/utils/funciones'
import { ActivatedRoute } from '@angular/router'
type NuevaEntrada = Omit<registrarEntrada, 'idRol'>

@Component({
  selector: 'app-registrar-entrada',
  templateUrl: './registrar-entrada.component.html',
  styleUrls: ['./registrar-entrada.component.scss'],
})
export class RegistrarEntradaComponent implements OnInit {
  @Input() entradaRegistrada!: registrarEntrada
  @Input() origen!: string
  @Output() confirmacionAceptar = new EventEmitter<registrarEntrada>()

  creacionRef!: DynamicDialogRef
  acordionAbierto: boolean = false

  @ViewChild(OverlayPanel)
  overlayPanel: OverlayPanel | undefined
  horaEntrada: any

  registrarEntradaForm!: FormGroup

  confirmacion: boolean = false

  registros: any[] = [
    { value: 1, label: 'Registro 1' },
    { value: 2, label: 'Registro 2' },
    { value: 3, label: 'Registro 3' },
    { value: 4, label: 'Registro 4' },
    { value: 5, label: 'Registro 5' },
  ];

  registros2: any[] = [];

  // selectedRegistro: Registro;

  velatorios: TipoDropdown[] = []
  capilla: TipoDropdown[] = []

  constructor(
    // private breadcrumbService: BreadcrumbService,
    private alertaService: AlertaService,
    private formBuilder: FormBuilder,
    private readonly refModal: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public capillaReservacionService: CapillaReservacionService,
    private route: ActivatedRoute,
  ) {
    this.entradaRegistrada = this.config.data
    this.inicializarRegistrarEntradaForm(this.entradaRegistrada)
  }

  ngOnInit(): void {
    this.actualizarBreadcrumb();
    this.inicializarRegistrarEntradaForm(this.entradaRegistrada);
    this.obtenerCapillaPorIdVelatorio();
  }

  actualizarBreadcrumb(): void { }
  inicializarRegistrarEntradaForm(datosEntrada: registrarEntrada): void {
    this.registrarEntradaForm = this.formBuilder.group({
      capilla: [{ value: null, disabled: false }, [Validators.required]],
      folioODS: [{ value: null, disabled: false }, [Validators.required]],
      nombreContratante: [{ value: null, disabled: false }, [Validators.required]],
      nombreFinado: [{ value: null, disabled: false }, [Validators.required]],
      registroEntrada: [{ value: null, disabled: false }, [Validators.required]],
      fechaEntrada: [{ value: datosEntrada.fechaEntrada, disabled: false }],
      horaEntrada: [{ value: datosEntrada.horaEntrada, disabled: false }],
      idVelatorio: [{ value: datosEntrada.idVelatorio, disabled: false }],
    })
  }



  obtenerCapillaPorIdVelatorio() {
    let idVelatorio = this.registrarEntradaForm.get('idVelatorio')?.value
    this.capillaReservacionService.buscarPorIdVelatorio(idVelatorio).subscribe(
      (respuesta) => {
        if (respuesta.datos) {
          this.registros2 = respuesta!.datos.map((capilla: any) => {
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


  crearEntradaModificado(): registrarEntrada {
    let fechaDesde = this.registrarEntradaForm.get('registroEntrada')?.value
    if (fechaDesde == null) {
      this.horaEntrada = fechaDesde
    } else {
      let horaEntradaSinSegundos = fechaDesde.toISOString().substring(11, 16)
      this.horaEntrada = horaEntradaSinSegundos
    }

    return {
      idCapilla: this.registrarEntradaForm.get('capilla')?.value,
      // folioODS: this.registrarEntradaForm.get('folioODS')?.value,
      // nombreContratante: this.registrarEntradaForm.get('nombreContratante')?.value,
      // nombreFinado: this.registrarEntradaForm.get('nombreFinado')?.value,
      fechaEntrada: this.registrarEntradaForm.get('fechaEntrada')?.value,
      horaEntrada: this.horaEntrada,
      // idVelatorio: this.registrarEntradaForm.get('idVelatorio')?.value,
      idOrdenServicio: this.registrarEntradaForm.get('capilla')?.value,
      // registroEntrada: this.horaEntrada,
    }
  }

  confirmarEntrada(valor?: boolean): void {
    this.confirmacion = true
  }

  guardar(): void {
    const registrarEntradaBo: NuevaEntrada = this.crearEntradaModificado()
    const solicitudEntrada: string = JSON.stringify(registrarEntradaBo)
    this.capillaReservacionService.guardar(solicitudEntrada).subscribe(
      () => {
        this.alertaService.mostrar(
          TipoAlerta.Exito,
          'Has registrado la entrada/inicio del servicio correctamente.',
        )
        this.refModal.close()
      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar(TipoAlerta.Error, 'Alta incorrecta')
        console.error('ERROR: ', error.message)
        this.refModal.close()
      },
    )
  }

  cancelar(): void {
    this.refModal.close()
  }

  get ref() {
    return this.registrarEntradaForm.controls
  }
}
