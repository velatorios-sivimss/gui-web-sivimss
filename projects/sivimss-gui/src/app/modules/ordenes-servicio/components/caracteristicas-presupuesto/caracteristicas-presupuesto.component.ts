import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OverlayPanel } from "primeng-lts/overlaypanel";

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
    private readonly formBuilder: FormBuilder
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

  get f() {
    return this.form.controls;
  }

  get fa() {
    return this.formAgregarAtaud.controls;
  }

}
