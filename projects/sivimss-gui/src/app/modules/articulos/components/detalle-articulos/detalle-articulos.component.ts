import { ModificarArticulosComponent } from './../modificar-articulos/modificar-articulos.component';
import { Articulos, ConfirmacionServicio } from './../../models/articulos.interface';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { OverlayPanel } from 'primeng-lts/overlaypanel';
import { AlertaService } from 'projects/sivimss-gui/src/app/shared/alerta/services/alerta.service';
export enum TipoAlerta {
  Exito = 'success',
  Info = 'info',
  Precaucion = 'warning',
  Error = 'error'
}

@Component({
  selector: 'app-detalle-articulos',
  templateUrl: './detalle-articulos.component.html',
  styleUrls: ['./detalle-articulos.component.scss']
})
export class DetalleArticulosComponent implements OnInit {

  @Input() articuloSeleccionado!: Articulos;
  @Input() origen!: string;
  @Output() confirmacionAceptar = new EventEmitter<ConfirmacionServicio>();

  creacionRef!: DynamicDialogRef;

  @ViewChild(OverlayPanel)
  overlayPanel: OverlayPanel | undefined;

  abrirModificar: boolean = false;

  constructor(public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private alertaService: AlertaService) { }

ngOnInit(): void {

//Escenario selección ícono 'ojo' detalle o cambio estatus vista rápida
if(this.config?.data){
this.articuloSeleccionado = this.config.data.servicio;
this.origen = this.config.data.origen;
}
}

abrirModalModificarServicio():void{
  this.creacionRef = this.dialogService.open(ModificarArticulosComponent, {
    header:"Modificar servicio",
    width:"920px",
  })

  this.creacionRef.onClose.subscribe((estatus:boolean) => {
    if(estatus){
       this.alertaService.mostrar(TipoAlerta.Exito, 'Servicio modificado correctamente');
      this.ref.close();
    }
  })
}

aceptar():void {
  if(this.origen == "detalle"){
    this.ref.close();
  }
  if(this.origen == "agregar" || this.origen == "modificar" ){
    this.confirmacionAceptar.emit({estatus:true,origen:this.origen});
  }
  if(this.origen == "estatus"){
    this.ref.close(this.articuloSeleccionado);
  }
}

regresar(): void{
  this.confirmacionAceptar.emit({estatus:true,origen:"regresar"});
}

cerrar(): void {
  this.ref.close();
}

}
