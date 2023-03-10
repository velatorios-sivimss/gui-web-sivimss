import { Articulos } from './../../models/articulos.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { OverlayPanel } from 'primeng-lts/overlaypanel';
import { DIEZ_ELEMENTOS_POR_PAGINA } from 'projects/sivimss-gui/src/app/utils/constantes';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TipoDropdown } from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import { CATALOGOS_DUMMIES } from '../../constants/dummies';
import { BreadcrumbService } from 'projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service';
import { AlertaService } from 'projects/sivimss-gui/src/app/shared/alerta/services/alerta.service';
import { LazyLoadEvent } from 'primeng-lts/api';
import { SERVICIO_BREADCRUMB } from '../../constants/breadcrumb';

@Component({
  selector: 'app-administrar-articulos',
  templateUrl: './administrar-articulos.component.html',
  styleUrls: ['./administrar-articulos.component.scss'],
  providers: [DialogService]
})
export class AdministrarArticulosComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;


  articulos:Articulos[] = [];
  articuloSeleccionado:Articulos = {};

  filtroForm!: FormGroup;

  modificarArticuloForm!: FormGroup;

  mostrarModalModificarArticulo: boolean = false;
  mostrarModalDetalleArticulo: boolean = false;
  mostrarModalEstatusArticulo: boolean = false;

  creacionRef!: DynamicDialogRef;
  detalleRef!:DynamicDialogRef;
  modificacionRef!:DynamicDialogRef;

  opciones:TipoDropdown[] = CATALOGOS_DUMMIES;
  tipoServicio:TipoDropdown[] = CATALOGOS_DUMMIES;
  partidaPresupuestal: TipoDropdown[] = CATALOGOS_DUMMIES;
  cuentaContable: TipoDropdown[] = CATALOGOS_DUMMIES;
  niveles: TipoDropdown[] = CATALOGOS_DUMMIES;
  velatorios: TipoDropdown[] = CATALOGOS_DUMMIES;

  constructor(
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private alertaService: AlertaService,
    public dialogService: DialogService,
  ) { }


  ngOnInit(): void {
    this.actualizarBreadcrumb();
    this.inicializarFiltroForm();
  }

  actualizarBreadcrumb(): void{
    this.breadcrumbService.actualizar(SERVICIO_BREADCRUMB);
  }

  inicializarFiltroForm(){
    this.filtroForm = this.formBuilder.group({
      nivel:[{value: null, disabled:false}],
      velatorio:[{value: null, disabled:false}],
      servicio:[{value: null, disabled:false}],
    });
  }

  abrirModalAgregarServicio(): void {
    // this.creacionRef = this.dialogService.open(AgregarServicioComponent,{
    //   header:"Agregar servicio",
    //   width:"920px"
    // });
    // this.creacionRef.onClose.subscribe((estatus:boolean) => {
    //   if(estatus){
    //     this.alertaService.mostrar(TipoAlerta.Exito, 'Servicio agregado correctamente');
    //   }
    // })
  }

  abrirModalModificarServicio(): void {
    // this.creacionRef = this.dialogService.open(ModificarServicioComponent, {
    //   header:"Modificar servicio",
    //   width:"920px",
    // })

    // this.creacionRef.onClose.subscribe((estatus:boolean) => {
    //   if(estatus){
    //     this.alertaService.mostrar(TipoAlerta.Exito, 'Servicio modificado correctamente');
    //   }
    // })
  }

  abrirModalDetalleCapilla(servicio:Articulos){
    // this.creacionRef = this.dialogService.open(DetalleServicioComponent, {
    //   header:"Detalle",
    //   width:"920px",
    //   data: {servicio:servicio, origen: "detalle"},
    // })
  }

  abrirModalCambioEstatus(servicio:Articulos){
    /*Preguntar si se puede usar 'let'*/
    // let header:string = "" ;
    // servicio.estatus?header="Activar servicio":header="Desactivar servicio";
    // this.creacionRef = this.dialogService.open(DetalleServicioComponent, {
    //   header:header,
    //   width:"920px",
    //   data: {servicio:servicio, origen: "estatus"},
    // })

    // this.creacionRef.onClose.subscribe((servicio:Servicio) => {
    //   if(servicio.estatus){
    //     this.alertaService.mostrar(TipoAlerta.Exito, 'Servicio activado correctamente');
    //   }else{
    //     this.alertaService.mostrar(TipoAlerta.Exito, 'Servicio desactivado correctamente');
    //   }
    // })

  }

  abrirPanel(event:MouseEvent,articuloSeleccionado:Articulos):void{
    this.articuloSeleccionado = articuloSeleccionado;
    this.overlayPanel.toggle(event);
  }

  paginar(event: LazyLoadEvent): void{
    console.log(event);
    setTimeout(() =>{
      this.articulos = [
        {
          id: 1,
          servicio: "Transporte de ataúdes",
          descripcionServicio: "Transporte de ataúdes en la totalidad del terriotorio nacional Mexicano",
          tipoServicio: 1,
          descTipoServicio : this.tipoServicio[0].label,
          partidaPresupuestal: 1,
          descPartidaPresupuestal: this.partidaPresupuestal[0].label,
          cuentaContable: 1,
          descCuentaContable: this.cuentaContable[0].label,
          observaciones: "Sin observaciones",
          claveSAT:"111111",
          estatus: true,
        },
        {
          id: 2,
          servicio: "Transporte de ataúdes",
          descripcionServicio: "Transporte de ataúdes en la totalidad del terriotorio nacional Mexicano",
          tipoServicio: 1,
          descTipoServicio : this.tipoServicio[1].label,
          partidaPresupuestal: 1,
          descPartidaPresupuestal: this.partidaPresupuestal[1].label,
          cuentaContable: 1,
          descCuentaContable: this.cuentaContable[1].label,
          observaciones: "Sin observaciones",
          claveSAT:"2222",
          estatus: true,
        },
        {
          id: 3,
          servicio: "Transporte de ataúdes",
          descripcionServicio: "Transporte de ataúdes en la totalidad del terriotorio nacional Mexicano",
          tipoServicio: 1,
          descTipoServicio : this.tipoServicio[2].label,
          partidaPresupuestal: 1,
          descPartidaPresupuestal: this.partidaPresupuestal[2].label,
          cuentaContable: 1,
          descCuentaContable: this.cuentaContable[2].label,
          observaciones: "Sin observaciones",
          claveSAT:"3333",
          estatus: false,
        }
      ];
      this.totalElementos = this.articulos.length;
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

}
