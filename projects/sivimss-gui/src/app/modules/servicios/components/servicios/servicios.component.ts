import { Component, OnInit, ViewChild } from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BreadcrumbService} from "../../../../shared/breadcrumb/services/breadcrumb.service";
import {AlertaService,TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {OverlayPanel} from "primeng-lts/overlaypanel";
import {Servicio} from "../../models/servicio.interface";
import { LazyLoadEvent } from "primeng-lts/api";
import {DIEZ_ELEMENTOS_POR_PAGINA} from "../../../../utils/constantes";

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
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
  agregarServicioForm: FormGroup;
  modificarServicioForm: FormGroup;

  mostrarModalAgregarServicio: boolean = false;
  mostrarModalModificarServicio: boolean = false;
  mostrarModalDetalleServicio: boolean = false;
  mostrarModalEstatusServicio: boolean = false;

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
    private alertaService: AlertaService
  ) { }

  ngOnInit(): void {
    this.breadcrumbService.actualizar([
      {
        icono: 'imagen-icono-operacion-sivimss.svg',
        titulo: 'Administración de catálogos'
      },
      {
        icono: '',
        titulo: 'Administración de servicios'
      }
    ]);
    this.inicializarFiltroForm();
  }

  inicializarFiltroForm(){
    this.filtroForm = this.formBuilder.group({
      nivel:[{value: null, disabled:false}],
      velatorio:[{value: null, disabled:false}],
      servicio:[{value: null, disabled:false}],
    });
  }

  inicializarAgregarServicioForm():void{
    this.agregarServicioForm = this.formBuilder.group({
      id: [{value:null, disabled:true}],
      servicio: [{value:null,disabled:false},[Validators.required]],
      descripcion: [{value:null,disabled:false},[Validators.required]],
      tipoServicio: [{value:null,disabled:false},[Validators.required]],
      partidaPresupuestal: [{value:null,disabled:false},[Validators.required]],
      cuentaContable: [{value:null,disabled:false},[Validators.required]],
      observaciones: [{value:null,disabled:false},[Validators.required]],
      estatus: [{value:true,disabled:false},[Validators.required]],
      claveSAT: [{value:null,disabled:false},[Validators.required]],
    });
  }

  inicializarModificarServicioForm(): void{
    this.modificarServicioForm = this.formBuilder.group({
      // id: [{value:null, disabled:true},[Validators.required]],
      servicio: [{value:null,disabled:false},[Validators.required]],
      descripcion: [{value:null,disabled:false},[Validators.required]],
      tipoServicio: [{value:null,disabled:false},[Validators.required]],
      partidaPresupuestal: [{value:null,disabled:false},[Validators.required]],
      cuentaContable: [{value:null,disabled:false},[Validators.required]],
      observaciones: [{value:null,disabled:false},[Validators.required]],
      estatus: [{value:true,disabled:false},[Validators.required]],
      claveSAT: [{value:null,disabled:false},[Validators.required]],
    });
  }

  abrirModalAgregarServicio(): void {
    this.inicializarAgregarServicioForm();
    this.mostrarModalAgregarServicio = true;
  }

  abrirModalModificarServicio(): void {
    this.inicializarModificarServicioForm();
    this.mostrarModalModificarServicio = true;
  }

  abrirModalDetalleCapilla(servicio:Servicio){
    this.servicioSeleccionado = {...servicio};
    this.mostrarModalDetalleServicio = true;
    // return 0;
  }

  abrirPanel(event:MouseEvent,servicioSeleccionado:Servicio):void{
    this.servicioSeleccionado = servicioSeleccionado;
    this.overlayPanel.toggle(event);
  }

  paginar(event: LazyLoadEvent): void{
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

  agregarServicio(): void {
    this.mostrarModalAgregarServicio = false;
    this.alertaService.mostrar(TipoAlerta.Exito, 'Servicio agregado correctamente');
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
  }

  limpiar(): void {
    this.filtroForm.reset();
  }

  get f(){
    return this.filtroForm.controls;
  }

  get fas(){
    return this.agregarServicioForm.controls;
  }

  get fms(){
    return this.modificarServicioForm.controls;
  }
}
