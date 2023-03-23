import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {UsuarioContratante} from "../../models/usuario-contratante.interface";
import {OverlayPanel} from "primeng-lts/overlaypanel";
import {DetalleServicioComponent} from "../../../servicios/components/detalle-servicio/detalle-servicio.component";

@Component({
  selector: 'app-detalle-contratantes',
  templateUrl: './detalle-contratantes.component.html',
  styleUrls: ['./detalle-contratantes.component.scss'],
  providers: [DialogService]
})
export class DetalleContratantesComponent implements OnInit {
  @Input() contratante!: UsuarioContratante;
  @Input() origen!: string;

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  cambiarEstatusRef!: DynamicDialogRef;

  // contratante: UsuarioContratante = {};

  mensaje: string = "";

  tipoMensaje: string[] =[
    "¿Estás seguro que deseas activar este contratante?",
    "¿Estás seguro que deseas desactivar este contratante?",
    "¿Estás seguro que deseas modificar este contratante?",
  ];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    debugger;
    if(this.config?.data){
        this.contratante = this.config.data.contratante;
        this.origen = this.config.data.origen;
        if(this.origen == "estatus"){
          this.mensaje = this.contratante.estatus?this.tipoMensaje[0]:this.tipoMensaje[1];
        }
    }
  }

  cambiarEstatus(contratante?: UsuarioContratante): void {
    this.cambiarEstatusRef = this.dialogService.open(DetalleContratantesComponent, {
      header:contratante?.estatus? "Activar contratante":"Desactivar contratante",
      width:"920px",
      data: {contratante:contratante, origen: "estatus"},
    })
  }

  aceptar(): void {
    this.ref.close(true);
  }

  cancelar(): void {
    this.ref.close();
  }

  abrirModalModificarContratante(): void {

  }

}
