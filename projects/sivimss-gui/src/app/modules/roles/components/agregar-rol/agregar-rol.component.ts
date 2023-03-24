import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OverlayPanel } from "primeng-lts/overlaypanel";
import { Funcionalidad } from "projects/sivimss-gui/src/app/modules/roles/models/funcionalidad.interface";
import { AlertaService, TipoAlerta } from "projects/sivimss-gui/src/app/shared/alerta/services/alerta.service";
import { BreadcrumbService } from "projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {ActivatedRoute} from '@angular/router';
import { RespuestaModalUsuario } from '../../../usuarios/models/respuestaModal.interface';
import {HttpErrorResponse} from "@angular/common/http";
import {CATALOGOS} from '../../../usuarios/constants/catalogos_dummies';
import {RolService} from '../../services/rol.service';
import {Rol} from "../../models/rol.interface";
import {Catalogo} from 'projects/sivimss-gui/src/app/models/catalogos.interface';
import {USUARIOS_BREADCRUMB} from '../../../usuarios/constants/breadcrumb';

type NuevoRol = Omit<Rol, "idRol" >;

@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.component.html',
  styleUrls: ['./agregar-rol.component.scss']
})
export class AgregarRolComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  opciones: TipoDropdown[] = CATALOGOS;
  catRol: TipoDropdown[] = [];
  agregarRolForm!: FormGroup;
  modificarRolForm!: FormGroup;

  mostrarModalAgregarFunc: boolean = false;
  mostrarModalModificarFunc: boolean = false;

  formFuncionalidad!: FormGroup;

  funcionalidades: Funcionalidad[] = [];
  funcionalidadSeleccionada!: Funcionalidad;

  contadorFuncionalidades = 1;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private rolService: RolService,
    private alertaService: AlertaService
  ) {
  }

  ngOnInit(): void {
    debugger
    this.breadcrumbService.actualizar(USUARIOS_BREADCRUMB);
    const roles = this.route.snapshot.data["respuesta"].datos;
    this.catRol = roles.map((rol: Catalogo) => ({label: rol.des_rol, value: rol.id})) || [];
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

  crearNuevoRol(): any {
    debugger
    return {
      nivel: this.agregarRolForm.get("nivel")?.value
    };
  }

  agregarRol(): void {
    debugger
   // const respuesta: RespuestaModalrol = {mensaje: "Alta satisfactoria", actualizar: true}
    const rolBo: NuevoRol = this.crearNuevoRol();
    const solicitudRol: string = JSON.stringify(rolBo);
    this.rolService.guardar(solicitudRol).subscribe(
      () => {
        this.alertaService.mostrar(TipoAlerta.Exito, 'Alta satisfactoria');
      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar(TipoAlerta.Error, 'Alta incorrecta');
        console.error("ERROR: ", error.message)
      }
    );
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

}
