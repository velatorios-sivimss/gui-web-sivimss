import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OverlayPanel } from "primeng-lts/overlaypanel";
import { Funcionalidad } from "projects/sivimss-gui/src/app/modules/roles/models/funcionalidad.interface";
import { AlertaService, TipoAlerta } from "projects/sivimss-gui/src/app/shared/alerta/services/alerta.service";
import { BreadcrumbService } from "projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service";

@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.component.html',
  styleUrls: ['./agregar-rol.component.scss']
})
export class AgregarRolComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel: OverlayPanel;

  opciones:any[] = [
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

  agregarRolForm: FormGroup;

  mostrarModalAgregarFunc: boolean = false;
  mostrarModalModificarFunc: boolean = false;

  formFuncionalidad: FormGroup;

  funcionalidades: Funcionalidad[] = [];
  funcionalidadSeleccionada: Funcionalidad = null;

  contadorFuncionalidades = 1;

  constructor(
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private alertaService: AlertaService
  ) {
  }

  ngOnInit(): void {
    this.breadcrumbService.actualizar([
      {
        icono: 'imagen-icono-operacion-sivimss.svg',
        titulo: 'Administración de catálogos'
      },
      {
        icono: '',
        titulo: 'Roles'
      },
      {
        icono: '',
        titulo: 'Agregar rol'
      }
    ]);
    this.inicializarAgregarRolForm();
  }

  inicializarAgregarRolForm(): void {
    this.agregarRolForm = this.formBuilder.group({
      rol: [{value: null, disabled: false}, [Validators.required]],
      delegacion: [{value: null, disabled: false}, [Validators.required]],
      nivel: [{value: null, disabled: false}, [Validators.required]],
      velatorio: [{value: null, disabled: false}, [Validators.required]],
      estatus: [{value: true, disabled: false}],
      funcionalidades: this.formBuilder.array([])
    });
  }

  abrirPanel(event: MouseEvent, funcionalidadSeleccionada: Funcionalidad): void {
    this.funcionalidadSeleccionada = funcionalidadSeleccionada;
    this.overlayPanel.toggle(event);
  }

  abrirModalAgregarFuncionalidad(): void {
    this.crearFormGroupFuncionalidad();
    this.mostrarModalAgregarFunc = true;
  }

  abrirModalModificarFuncionalidad(): void {
    this.formFuncionalidad = this.formBuilder.group({
      id: [{value: this.funcionalidadSeleccionada.id, disabled: false}, [Validators.required]],
      nombre: [{value: this.funcionalidadSeleccionada.nombre, disabled: false}, [Validators.required]],
      alta: [{value: this.funcionalidadSeleccionada.alta, disabled: false}],
      baja: [{value: this.funcionalidadSeleccionada.baja, disabled: false}],
      aprobacion: [{value: this.funcionalidadSeleccionada.aprobacion, disabled: false}],
      consulta: [{value: this.funcionalidadSeleccionada.consulta, disabled: false}],
      modificar: [{value: this.funcionalidadSeleccionada.modificar, disabled: false}],
      imprimir: [{value: this.funcionalidadSeleccionada.imprimir, disabled: false}],
    });
    this.mostrarModalModificarFunc = true;
  }

  crearFormGroupFuncionalidad(): void {
    this.formFuncionalidad = this.formBuilder.group({
      id: [{value: this.contadorFuncionalidades, disabled: false}, [Validators.required]],
      nombre: [{value: null, disabled: false}, [Validators.required]],
      alta: [{value: false, disabled: false}],
      baja: [{value: false, disabled: false}],
      aprobacion: [{value: false, disabled: false}],
      consulta: [{value: false, disabled: false}],
      modificar: [{value: false, disabled: false}],
      imprimir: [{value: false, disabled: false}],
    });
  }

  agregarFuncionalidad(): void {
    this.formArrayFuncionalidades.push(this.formFuncionalidad);
    this.alertaService.mostrar(TipoAlerta.Exito, 'Exito');
    this.funcionalidades = this.obtenerFuncionalidadesDeFormArray();
    this.mostrarModalAgregarFunc = false;
    this.contadorFuncionalidades++;
  }

  modificarFuncionalidad(): void {
    let indiceFuncionalidad: number = this.buscarIndiceFuncionalidadEnFormArray();
    this.reemplazarFuncionalidadEnFormArray(indiceFuncionalidad, this.formFuncionalidad);
    this.funcionalidades = this.obtenerFuncionalidadesDeFormArray();
    this.mostrarModalModificarFunc = false;
  }

  reemplazarFuncionalidadEnFormArray(indice: number, formGroup: FormGroup) {
    this.formArrayFuncionalidades.setControl(indice, formGroup);
  }

  buscarIndiceFuncionalidadEnFormArray(): number {
    return this.formArrayFuncionalidades.controls.findIndex((control: AbstractControl) => control.value.id === this.formFuncionalidad.value.id);
  }

  obtenerFuncionalidadesDeFormArray(): Funcionalidad[] {
    return this.formArrayFuncionalidades.controls.map((formGroup: AbstractControl) => formGroup.value as Funcionalidad);
  }

  get f() {
    return this.agregarRolForm.controls;
  }

  get funcionalidad() {
    return this.formFuncionalidad.controls;
  }

  get formArrayFuncionalidades() {
    return this.agregarRolForm.controls.funcionalidades as FormArray;
  }

  guardarRol() {

  }

}
