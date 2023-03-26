import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DialogService } from "primeng-lts/dynamicdialog";
import { OverlayPanel } from "primeng-lts/overlaypanel";
import { AgregarServicioComponent } from "projects/sivimss-gui/src/app/modules/ordenes-servicio/components/agregar-servicio/agregar-servicio.component";
import { VerKilometrajeComponent } from "projects/sivimss-gui/src/app/modules/ordenes-servicio/components/ver-kilometraje/ver-kilometraje.component";
import { VerTarjetaIdentificacionComponent } from "projects/sivimss-gui/src/app/modules/ordenes-servicio/components/ver-tarjeta-identificacion/ver-tarjeta-identificacion.component";

@Component({
  selector: 'app-caracteristicas-presupuesto',
  templateUrl: './caracteristicas-presupuesto.component.html',
  styleUrls: ['./caracteristicas-presupuesto.component.scss']
})
export class CaracteristicasPresupuestoComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  paqueteSeleccionado: any;
  form!: FormGroup;
  mostrarModalAgregarPresupuesto: boolean = false;
  mostrarModalAgregarPaquete: boolean = false;
  mostrarModalAgregarAtaud: boolean = false;
  formAgregarAtaud!: FormGroup;

  paquetes:any[] = [
    {
      id:0,
      noConsecutivo:'1029384',
      grupo:'Traslado',
      concepto:'Traslado nacional',
      cantidad:1,
      importe:'$6,000.00',
      proveedor:'Logística y movilidad S.A. de C.V.',
      totalPaquete:'$7,000.00',
      deseaUtilizarArtServ:true
    },
    {
      id:1,
      noConsecutivo:'5463723',
      grupo:'Cremación',
      concepto:'Cremación familiar',
      cantidad:1,
      importe:'$3,000.00',
      proveedor:'Logística y movilidad S.A. de C.V.',
      totalPaquete:'$4,000.00',
      deseaUtilizarArtServ:true
    },
    {
      id:2,
      noConsecutivo:'4534664',
      grupo:'Ataúd',
      concepto:'Ataúd',
      cantidad:1,
      importe:'$4,000.00',
      proveedor:'Logística y movilidad S.A. de C.V.',
      totalPaquete:'$7,000.00',
      deseaUtilizarArtServ:true
    }
  ]

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      observaciones: [{value: null, disabled: false}, [Validators.required]],
      notasServicio: [{value: null, disabled: false}, [Validators.required]]
    });
  }

  abrirPanel(event: MouseEvent, paqueteSeleccionado: any): void {
    this.paqueteSeleccionado = paqueteSeleccionado;
    this.overlayPanel.toggle(event);
  }

  abrirModalAgregarPrespuesto(event: MouseEvent) {
    event.stopPropagation();
    this.mostrarModalAgregarPresupuesto = true;
  }

  abrirModalAgregarPaquete(event: MouseEvent) {
    event.stopPropagation();
    this.mostrarModalAgregarPaquete = true;
  }

  abrirModalAgregarAtaud(): void {
    this.mostrarModalAgregarPaquete = false;
    this.mostrarModalAgregarPresupuesto = false;
    this.formAgregarAtaud = this.formBuilder.group({
      ataud: [{value: null, disabled: false}, [Validators.required]],
      proveedor: [{value: null, disabled: false}, [Validators.required]]
    });
    this.mostrarModalAgregarAtaud = true;
  }

  abrirModalAgregarServicio() {
    this.mostrarModalAgregarPaquete = false;
    this.mostrarModalAgregarPresupuesto = false;
    const ref = this.dialogService.open(AgregarServicioComponent, {
      header: 'Agregar servicio',
      style: {maxWidth: '876px', width: '100%'},
      data: {
        dummy: '' //Pasa info a VerTarjetaIdentificacionComponent
      }
    });
    ref.onClose.subscribe((val: boolean) => {
      if (val) { //Obtener info cuando se cierre el modal en VerTarjetaIdentificacionComponent
      }
    });
  }

  abrirModalVerKm():void{
    const ref = this.dialogService.open(VerKilometrajeComponent, {
      header: 'Ver kilometraje',
      style: {maxWidth: '876px', width: '100%'},
      data: {
        dummy: '' //Pasa info a VerKilometrajeComponent
      }
    });
    ref.onClose.subscribe((val: boolean) => {
      if (val) { //Obtener info cuando se cierre el modal en VerKilometrajeComponent
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  get fa() {
    return this.formAgregarAtaud.controls;
  }

}
