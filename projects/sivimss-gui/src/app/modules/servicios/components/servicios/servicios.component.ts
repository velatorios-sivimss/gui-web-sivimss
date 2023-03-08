import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

import { LazyLoadEvent } from "primeng-lts/api";
import {OverlayPanel} from "primeng-lts/overlaypanel";

import {AlertaService,TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {BreadcrumbService} from "../../../../shared/breadcrumb/services/breadcrumb.service";

import {Servicio} from "../../models/servicio.interface";

import {DIEZ_ELEMENTOS_POR_PAGINA} from "../../../../utils/constantes";

import {SERVICIO_BREADCRUMB} from "../constants/breadcrumb";
import {DynamicDialogRef,DialogService} from "primeng-lts/dynamicdialog";
import {AgregarServicioComponent} from "../agregar-servicio/agregar-servicio.component";
import {ModificarServicioComponent} from "../modificar-servicio/modificar-servicio.component";
import {DetalleServicioComponent} from "../detalle-servicio/detalle-servicio.component";


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
  providers: [DialogService]
})
export class ServiciosComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel: OverlayPanel;

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;

  encabezadoEstatusServicio:String = "";

  servicios:Servicio[] = [];
  servicioSeleccionado:Servicio = null;

  filtroForm: FormGroup;
  // agregarServicioForm: FormGroup;
  modificarServicioForm: FormGroup;

  // mostrarModalAgregarServicio: boolean = false;
  mostrarModalModificarServicio: boolean = false;
  mostrarModalDetalleServicio: boolean = false;
  mostrarModalEstatusServicio: boolean = false;

  creacionRef: DynamicDialogRef;
  detalleRef:DynamicDialogRef;
  modificacionRef:DynamicDialogRef;

  /**
   * INICIO VARIABLES DOOMY PARA USO DE MAQUETADO
   */

  opciones: any[] = [
    {
      label: 'Opción 1',
      value: 0,
    },
    {
      label: 'Opción 2',
      value: 1,
    },
    {
      label: 'Opción 3',
      value: 2,
    }
  ];

  tipoServicio:any[] = [
    {id: 1,descripcion: "Renta de capilla"},
    {id: 2,descripcion: "Renta de equipo para velación en domicilio"},
    {id: 3,descripcion: "Cremación"},
    {id: 4,descripcion: "Traslado"},
    {id: 5,descripcion: "Embalsamiento"},
    {id: 6,descripcion: "Arreglo"},
    {id: 7,descripcion: "Apoyo para trámites funerarios"},
    {id: 8,descripcion: "Otros"}
  ];

  partidaPresupuestal: any[] = [
    {id: 31101, descripcion: 31101},
    {id: 34301, descripcion: 34301},
    {id: 37201, descripcion: 37201},
    {id: 37504, descripcion: 37504},
    {id: 31801, descripcion: 31801}
  ];

  cuentaContable: any[] = [
    {id:1,descripcion: "258964"}
  ];

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
    this.creacionRef = this.dialogService.open(AgregarServicioComponent,{
      header:"Agregar servicio",
      width:"920px"
    });
  }

  abrirModalModificarServicio(): void {
    this.creacionRef = this.dialogService.open(ModificarServicioComponent, {
      header:"Modificar servicio",
      width:"920px",
    })
  }

  abrirModalDetalleCapilla(servicio:Servicio){
    this.creacionRef = this.dialogService.open(DetalleServicioComponent, {
      header:"Detalle",
      width:"920px",
      data: {servicio:servicio, origen: "detalle"},
    })
  }

  abrirPanel(event:MouseEvent,servicioSeleccionado:Servicio):void{
    this.servicioSeleccionado = servicioSeleccionado;
    this.overlayPanel.toggle(event);
  }

  paginar(event: LazyLoadEvent): void{
    console.log(event);
    setTimeout(() =>{
      this.servicios = [
        {
          id: 1,
          servicio: "Transporte de ataúdes",
          descripcionServicio: "Transporte de ataúdes en la totalidad del terriotorio nacional Mexicano",
          tipoServicio: this.tipoServicio[0].id,
          descTipoServicio : this.tipoServicio[0].descripcion,
          partidaPresupuestal: this.partidaPresupuestal[0].id,
          descPartidaPresupuestal: this.partidaPresupuestal[0].descripcion,
          cuentaContable: this.cuentaContable[0].id,
          descCuentaContable: this.cuentaContable[0].descripcion,
          observaciones: "Sin observaciones",
          claveSAT:"111111",
          estatus: true,
        },
        {
          id: 2,
          servicio: "Transporte de ataúdes",
          descripcionServicio: "Transporte de ataúdes en la totalidad del terriotorio nacional Mexicano",
          tipoServicio: this.tipoServicio[1].id,
          descTipoServicio : this.tipoServicio[1].descripcion,
          partidaPresupuestal: this.partidaPresupuestal[1].id,
          descPartidaPresupuestal: this.partidaPresupuestal[1].descripcion,
          cuentaContable: this.cuentaContable[0].id,
          descCuentaContable: this.cuentaContable[0].descripcion,
          observaciones: "Sin observaciones",
          claveSAT:"2222",
          estatus: true,
        },
        {
          id: 3,
          servicio: "Transporte de ataúdes",
          descripcionServicio: "Transporte de ataúdes en la totalidad del terriotorio nacional Mexicano",
          tipoServicio: this.tipoServicio[2].id,
          descTipoServicio : this.tipoServicio[2].descripcion,
          partidaPresupuestal: this.partidaPresupuestal[2].id,
          descPartidaPresupuestal: this.partidaPresupuestal[2].descripcion,
          cuentaContable: this.cuentaContable[0].id,
          descCuentaContable: this.cuentaContable[0].descripcion,
          observaciones: "Sin observaciones",
          claveSAT:"3333",
          estatus: false,
        }
      ];
      this.totalElementos = this.servicios.length;
    },0)
  }

  modificarServicio(): void{
    this.mostrarModalModificarServicio = false;
    this.mostrarModalDetalleServicio = false;
    this.alertaService.mostrar(TipoAlerta.Exito, 'Servicio modificado correctamente');
  }

  seleccionarEstatus(event:MouseEvent,servicioSeleccionado:Servicio):void{
    this.mostrarModalEstatusServicio = true;
    this.servicioSeleccionado = {...servicioSeleccionado};
    servicioSeleccionado.estatus?this.encabezadoEstatusServicio = "Desactivar servicio":this.encabezadoEstatusServicio = "Activar servicio";
  }

  cambiarEstatus(servicio:Servicio, estatus: boolean): void {
    /**
     * Validar con el equipo si cuando se da cancelar se manda a llamar al paginar()
     */
    this.mostrarModalEstatusServicio = false;
    if(estatus){
      this.alertaService.mostrar(TipoAlerta.Exito, 'Servicio modificado correctamente');
    }else{
      servicio.estatus = !servicio.estatus;
    }
    this.paginar(null);
  }

  consultaServicioEspecifico():void{
    const servicio = this.filtroForm.get("servicio").value;
    console.log(servicio);
  }

  limpiar(): void {
    this.filtroForm.reset();
  }

  get f(){
    return this.filtroForm.controls;
  }
}
