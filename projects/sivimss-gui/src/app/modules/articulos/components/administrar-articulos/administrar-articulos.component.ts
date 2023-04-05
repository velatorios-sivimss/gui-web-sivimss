import { DetalleArticulosComponent } from './../detalle-articulos/detalle-articulos.component';
import { ModificarArticulosComponent } from './../modificar-articulos/modificar-articulos.component';
import { AgregarArticulosComponent } from './../agregar-articulos/agregar-articulos.component';
import { Articulos } from './../../models/articulos.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { OverlayPanel } from 'primeng-lts/overlaypanel';
import { DIEZ_ELEMENTOS_POR_PAGINA } from 'projects/sivimss-gui/src/app/utils/constantes';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TipoDropdown } from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import { CATALOGOS_DUMMIES } from '../../constants/dummies';
import { BreadcrumbService } from 'projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service';
import { AlertaService, TipoAlerta } from 'projects/sivimss-gui/src/app/shared/alerta/services/alerta.service';
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
      delegacion:[{value: null, disabled:false}],
      velatorio:[{value: null, disabled:false}],
      nombreArticulo:[{value: null, disabled:false}],
    });
  }

  abrirModalAgregarServicio(): void {
    this.creacionRef = this.dialogService.open(AgregarArticulosComponent,{
      header:"Agregar artículo",
      width:"920px"
    });
    this.creacionRef.onClose.subscribe((estatus:boolean) => {
      if(estatus){
        this.alertaService.mostrar(TipoAlerta.Exito, 'Artículo agregado correctamente');
      }
    })
  }

  abrirModalModificarServicio(): void {
     this.creacionRef = this.dialogService.open(ModificarArticulosComponent, {
       header:"Modificar artículo",
       width:"920px",
     })

     this.creacionRef.onClose.subscribe((estatus:boolean) => {
       if(estatus){
         this.alertaService.mostrar(TipoAlerta.Exito, 'Artículo modificado correctamente');
       }
     })
  }

  abrirModalDetalleArticulo(servicio:Articulos){
     this.creacionRef = this.dialogService.open(DetalleArticulosComponent, {
       header:"Detalle",
       width:"920px",
       data: {servicio:servicio, origen: "detalle"},
     })
  }

  abrirModalCambioEstatus(servicio:Articulos){
    /*Preguntar si se puede usar 'let'*/
     let header:string = "" ;
     servicio.estatus?header="Activar artículo":header="Desactivar artículo";
     this.creacionRef = this.dialogService.open(DetalleArticulosComponent, {
       header:header,
       width:"920px",
       data: {servicio:servicio, origen: "estatus"},
     })

     this.creacionRef.onClose.subscribe((servicio:Articulos) => {
       if(servicio.estatus){
         this.alertaService.mostrar(TipoAlerta.Exito, 'Artículo activado correctamente');
       }else{
         this.alertaService.mostrar(TipoAlerta.Exito, 'Servicio desactivado correctamente');
       }
     })

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
          categoria:"ataúd",
          tipoDeArticulo:"Artículo complementario",
          tipoDeMaterial:"Madera ecológica MDF",
          tamanio:"Tambora",
          clasificacionDeProducto:"Intermediaria",
          modeloDeArticulo:"Ataudes contra humedad en la totalidad del territorio nacional Mexicano",
          descripcionDeProducto:"Empaques contra humedad ",
          largo:"10m",
          ancho:"2m",
          alto:"01m" ,
          claveSAT:"253453453",
          estatus: true ,
          partidaPresupuestal: "21101",
          cuentaContable: "12349876345687653",
        },
        {
          id: 2,
          categoria:"ataúd",
          tipoDeArticulo:"Artículo complementario",
          tipoDeMaterial:"Madera ecológica MDF",
          tamanio:"Tambora",
          clasificacionDeProducto:"Intermediaria",
          modeloDeArticulo:"Ataudes contra humedad en la totalidad del territorio nacional Mexicano",
          descripcionDeProducto:"Empaques contra humedad ",
          largo:"10m",
          ancho:"2m",
          alto:"01m" ,
          claveSAT:"253453453",
          estatus: true ,
          partidaPresupuestal: "21101",
          cuentaContable: "12349876345687653",
        },
        {
          id: 3,
          categoria:"ataúd",
          tipoDeArticulo:"Artículo complementario",
          tipoDeMaterial:"Madera ecológica MDF",
          tamanio:"Tambora",
          clasificacionDeProducto:"Intermediaria",
          modeloDeArticulo:"Ataudes contra humedad en la totalidad del territorio nacional Mexicano",
          descripcionDeProducto:"Empaques contra humedad ",
          largo:"10m",
          ancho:"2m",
          alto:"01m" ,
          claveSAT:"253453453",
          estatus: true ,
          partidaPresupuestal: "21101",
          cuentaContable: "12349876345687653",
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
