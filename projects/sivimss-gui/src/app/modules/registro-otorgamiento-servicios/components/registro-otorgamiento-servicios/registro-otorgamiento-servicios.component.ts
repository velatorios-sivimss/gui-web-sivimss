import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {OverlayPanel} from "primeng-lts/overlaypanel";
import {DIEZ_ELEMENTOS_POR_PAGINA} from "../../../../utils/constantes";

import {BreadcrumbService} from "../../../../shared/breadcrumb/services/breadcrumb.service";
import {SERVICIO_BREADCRUMB} from "../../constants/breadcrumb";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegistroOtorgamientoServicios} from "../../models/registro-otorgamiento-servicios-interface";
import {LazyLoadEvent} from "primeng-lts/api";
import {Servicio} from "../../../servicios/models/servicio.interface";
import {
  ModificarServicioComponent
} from "../../../servicios/components/modificar-servicio/modificar-servicio.component";
import {TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {
  DetalleRegistroOtorgamientoServiciosComponent
} from "../detalle-registro-otorgamiento-servicios/detalle-registro-otorgamiento-servicios.component";

@Component({
  selector: 'app-registro-otorgamiento-servicios',
  templateUrl: './registro-otorgamiento-servicios.component.html',
  styleUrls: ['./registro-otorgamiento-servicios.component.scss'],
  providers: [DialogService]
})
export class RegistroOtorgamientoServiciosComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;

  filtroForm!: FormGroup;

  mostrarRegistros:boolean = false;
  registroOtorgamientoServicios: RegistroOtorgamientoServicios[]=[];
  registroOtorgamientoSeleccionado: RegistroOtorgamientoServicios = {};

  quitarServicioRef!: DynamicDialogRef;
  situarServicioRef!: DynamicDialogRef;

  constructor(
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.actualizarBreadcrumb();
    this.inicializarFiltroForm();
  }

  actualizarBreadcrumb(): void{
    this.breadcrumbService.actualizar(SERVICIO_BREADCRUMB);
  }

  inicializarFiltroForm():void {
    this.filtroForm = this.formBuilder.group({
      folioODS:[{value: null, disabled:false},[Validators.required]]
    });
  }

  consultaOtorgamientoServicios(): void {
    this.paginar({first:0});
  }

  paginar(event: LazyLoadEvent): void{
    this.mostrarRegistros = true;
    console.log(event);
    setTimeout(()=>{
      this.registroOtorgamientoServicios = [
        {
          descTipoServicio: "Desc tipo servicio",
          certificadoCremacion: true,
          fecha:"2022/02/02",
          hora:"11:12",
          notasServicio:"Nota de servicio"
        }
      ];
    },0);
  }

  abrirModalSituarServicios(): void{
    this.quitarServicioRef = this.dialogService.open(DetalleRegistroOtorgamientoServiciosComponent,{
      header:"Otorgamiento de un servicio",
      width:"920px"
    })
  }

  abrirModalQuitarServicio(): void{
    // this.creacionRef = this.dialogService.open(ModificarServicioComponent, {
    //   header:"Modificar servicio",
    //   width:"920px",
    // })
    //
    // this.creacionRef.onClose.subscribe((estatus:boolean) => {
    //   if(estatus){
    //     this.alertaService.mostrar(TipoAlerta.Exito, 'Servicio modificado correctamente');
    //   }
    // })

    this.quitarServicioRef = this.dialogService.open(DetalleRegistroOtorgamientoServiciosComponent,{
      header:"Quitar servicio",
      width:"920px"
    })


  }

  abrirPanel(event:MouseEvent,registroOtorgamientoServicios:RegistroOtorgamientoServicios):void{
    this.registroOtorgamientoSeleccionado = registroOtorgamientoServicios;
    this.overlayPanel.toggle(event);
  }

  limpiar(): void {
    this.filtroForm.reset();
    this.mostrarRegistros = false;
  }

  get f(){
    return this.filtroForm?.controls;
  }

}
