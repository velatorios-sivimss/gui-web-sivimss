import { Component, OnInit, ViewChild } from '@angular/core'
import { OverlayPanel } from 'primeng-lts/overlaypanel'
import { DIEZ_ELEMENTOS_POR_PAGINA } from 'projects/sivimss-gui/src/app/utils/constantes'
import { Vehiculos } from '../../models/vehiculos.interface'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog'
import { CATALOGOS_DUMMIES } from '../../../inventario-vehicular/constants/dummies'
import { TipoDropdown } from 'projects/sivimss-gui/src/app/models/tipo-dropdown'
import { BreadcrumbService } from 'projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service'
import { AlertaService, TipoAlerta } from 'projects/sivimss-gui/src/app/shared/alerta/services/alerta.service'
import { LazyLoadEvent } from 'primeng-lts/api'
import { ActivatedRoute, Router } from '@angular/router'
import { NuevaVerificacionComponent } from '../nueva-verificacion/nueva-verificacion/nueva-verificacion.component'
import { RegistroMantenimientoComponent } from '../registro-mantenimiento/registro-mantenimiento/registro-mantenimiento.component'
import { DetalleRegistroMantenimientoComponent } from '../registro-mantenimiento/detalle-registro-mantenimiento/detalle-registro-mantenimiento.component'

@Component({
  selector: 'app-programar-mantenimiento-vehicular',
  templateUrl: './programar-mantenimiento-vehicular.component.html',
  styleUrls: ['./programar-mantenimiento-vehicular.component.scss'],
  providers: [DialogService]
})
export class ProgramarMantenimientoVehicularComponent implements OnInit {
  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel

  numPaginaActual: number = 0
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA
  totalElementos: number = 0

  vehiculos: Vehiculos[] = []
  vehiculoSeleccionado: Vehiculos = {}

  filtroForm!: FormGroup

  creacionRef!: DynamicDialogRef
  detalleRef!: DynamicDialogRef
  modificacionRef!: DynamicDialogRef

  opciones: TipoDropdown[] = CATALOGOS_DUMMIES
  tipoServicio: TipoDropdown[] = CATALOGOS_DUMMIES
  partidaPresupuestal: TipoDropdown[] = CATALOGOS_DUMMIES
  cuentaContable: TipoDropdown[] = CATALOGOS_DUMMIES
  niveles: TipoDropdown[] = CATALOGOS_DUMMIES
  velatorios: TipoDropdown[] = CATALOGOS_DUMMIES

  constructor(
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private alertaService: AlertaService,
    public dialogService: DialogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // this.actualizarBreadcrumb();
    this.inicializarFiltroForm()
  }

  inicializarFiltroForm() {
    this.filtroForm = this.formBuilder.group({
      nivel: [{ value: null, disabled: false }, [Validators.required]],
      delegacion: [{ value: null, disabled: false }, [Validators.required]],
      velatorio: [{ value: null, disabled: false }, [Validators.required]],
      placa: [{ value: null, disabled: false }, [Validators.required]],
    })
  }


  paginar(event: LazyLoadEvent): void{
    console.log(event);
    setTimeout(() =>{
      this.vehiculos = [
     {
      id: 1,
      velatorio:"Hermanos Ramires",
      fecha:"prueba",
      tamanio:"prueba",
      hora:"prueba",
      vehiculo:"prueba",
      placas:"prueba",
      nivelAceite: 2,
      nivelAgua: true,
      calibracionNeumaticosTraseros: 0,
      calibracionNeumaticosDelanteros: 1,
      nivelCombustible: 2,
      nivelBateria: 2,
      limpiezaExterior: 1,
      limpiezaInterior: 2,
      codigoFalla: 0,
      estatusText:"prueba",
      estatus: true,
      estatusNumber: 1,
      kilometraje: "quilometraje",
      tipoMantenimiento: "Preventivo",
      modalidad: "Reuqerida",
      fechaMantenimiento: "20/06/1996"
     },
     {
      id: 1,
      velatorio:"Hermanos Ramires",
      fecha:"prueba",
      tamanio:"prueba",
      hora:"prueba",
      vehiculo:"prueba",
      placas:"prueba",
      nivelAceiteBajo: true,
      nivelAgua: true,
      calibracionNeumaticosTraseros: 0,
      calibracionNeumaticosDelanteros: 1,
      nivelCombustible: 2,
      nivelBateria: 2,
      limpiezaExterior: 1,
      limpiezaInterior: 2,
      codigoFalla: 0,
      estatusText:"prueba",
      estatus: true,
      estatusNumber: 1,
      kilometraje: "quilometraje",
      tipoMantenimiento: "Preventivo",
      modalidad: "Reuqerida",
      fechaMantenimiento: "20/06/1996"
     },
     {
      id: 1,
      velatorio:"Hermanos Ramires",
      fecha:"prueba",
      tamanio:"prueba",
      hora:"prueba",
      vehiculo:"prueba",
      placas:"prueba",
      nivelAceiteBajo: true,
      nivelAgua: true,
      calibracionNeumaticosTraseros: 0,
      calibracionNeumaticosDelanteros: 1,
      nivelCombustible: 2,
      nivelBateria: 2,
      limpiezaExterior: 1,
      limpiezaInterior: 2,
      codigoFalla: 0,
      estatusText:"prueba",
      estatus: true,
      estatusNumber: 1,
      kilometraje: "quilometraje",
      tipoMantenimiento: "Preventivo",
      modalidad: "Reuqerida",
      fechaMantenimiento: "20/06/1996"
     },
      ];
      this.totalElementos = this.vehiculos.length;
    },0)
  }

  consultaServicioEspecifico():string{
    return "";
  }

  limpiar(): void {
    this.filtroForm.reset();
  }

  get f(){
    return this.filtroForm?.controls;
  }

  abrirModalnuevaVerificacion(): void {
    this.detalleRef = this.dialogService.open(NuevaVerificacionComponent, {
      data: { vehiculo: this.vehiculoSeleccionado },
      header: "Nueva verificación",
      width: "920px"
    });
  }

  abrirModalSolicitudMantenimiento():void{
    this.creacionRef = this.dialogService.open(RegistroMantenimientoComponent, {
     header:"Solicitud de mantenimiento",
     width:"920px",
     data: { vehiculo: this.vehiculoSeleccionado },
   })
 }
  abrirModalRegistroMantenimiento():void{
    this.creacionRef = this.dialogService.open(DetalleRegistroMantenimientoComponent , {
      header:"Registro de mantenimiento vehicular",
   width:"920px",
   data: { vehiculo: this.vehiculoSeleccionado },
    })
 }
  abrirModalModificar():void{
    //  this.creacionRef = this.dialogService.open(DetalleArticulosComponent, {
    //  header:"Detalle",
    //  width:"920px",
    // data: {vehiculo:vehiculo, origen: "detalle"},
    // })
 }
  abrirModalExportarPDF():void{
    // this.creacionRef = this.dialogService.open(DetalleArticulosComponent, {
    //   header:"Detalle",
    //   width:"920px",
    //   data: {vehiculo:vehiculo, origen: "detalle"},
    // })
 }
  abrirModalExportarExcel():void{
    // this.creacionRef = this.dialogService.open(DetalleArticulosComponent, {
    //   header:"Detalle",
    //   width:"920px",
    //   data: {vehiculo:vehiculo, origen: "detalle"},
    // })
 }
 abrirModalDetalleArticulo(articulo:Vehiculos){
    // this.creacionRef = this.dialogService.open(DetalleArticulosComponent, {
    //   header:"Detalle",
    //   width:"920px",
    //   data: {vehiculo:vehiculo, origen: "detalle"},
    // })
 }

 abrirPanel(event:MouseEvent,vehiculoSeleccionado:Vehiculos):void{
  this.vehiculoSeleccionado = vehiculoSeleccionado;
  this.overlayPanel.toggle(event);
}



abrirModalModificarServicio(): void {
  // this.creacionRef = this.dialogService.open(ModificarArticulosComponent, {
  //   header:"Modificar artículo",
  //   width:"920px",
  // })

  // this.creacionRef.onClose.subscribe((estatus:boolean) => {
  //   if(estatus){
  //     this.alertaService.mostrar(TipoAlerta.Exito, 'Artículo modificado correctamente');
  //   }
  // })
}


abrirReporteEncargado(): void {
  this.router.navigate(['reporte-encargado'], { relativeTo: this.activatedRoute });
}
abrirMantenimientoPredictivo(): void {
  this.router.navigate(['mantenimiento-predictivo'], { relativeTo: this.activatedRoute });
}


}
