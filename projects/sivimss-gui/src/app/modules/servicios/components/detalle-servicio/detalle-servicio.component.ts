import {Component, Input, OnInit, Output, ViewChild,EventEmitter} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {Servicio} from "../../models/servicio.interface";
import {OverlayPanel} from "primeng-lts/overlaypanel";

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.scss']
})
export class DetalleServicioComponent implements OnInit {

  @Input() servicioSeleccionado!: Servicio;
  @Input() origen!: string;
  @Output() confirmacionAgregarServicio = new EventEmitter<boolean>();

  @ViewChild(OverlayPanel)
  overlayPanel: OverlayPanel | undefined;

  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    if(this.config?.data){
      this.servicioSeleccionado = this.config.data.servicio;
      this.origen = "detalle";
    }


  }

  abrirModalModificarServicio():void{

  }

  aceptar():void {
    if(this.origen == "detalle"){
      this.ref.close();
    }
    this.confirmacionAgregarServicio.emit(false);
  }

  regresar(): void{
    this.confirmacionAgregarServicio.emit(true);
  }

  cerrar(): void {
    this.ref.close();
    // this.confirmacionAgregarServicio.emit(false);
  }
}
