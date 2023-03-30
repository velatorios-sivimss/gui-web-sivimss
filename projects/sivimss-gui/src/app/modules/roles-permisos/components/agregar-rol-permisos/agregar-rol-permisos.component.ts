import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OverlayPanel } from "primeng-lts/overlaypanel";
import { Funcionalidad } from "projects/sivimss-gui/src/app/modules/roles/models/funcionalidad.interface";
import { AlertaService, TipoAlerta } from "projects/sivimss-gui/src/app/shared/alerta/services/alerta.service";
import { BreadcrumbService } from "projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {ActivatedRoute, Router} from '@angular/router';
import { RespuestaModalUsuario } from '../../../usuarios/models/respuestaModal.interface';
import {HttpErrorResponse} from "@angular/common/http";
import {CATALOGOS} from '../../../usuarios/constants/catalogos_dummies';
import {RolPermisosService} from '../../services/rol-permisos.service';
import {Rol} from "../../models/rol.interface";
import {Catalogo} from 'projects/sivimss-gui/src/app/models/catalogos.interface';
import {USUARIOS_BREADCRUMB} from '../../../usuarios/constants/breadcrumb';
import { concat } from 'rxjs';

type NuevoRol = Omit<Rol, "idRol" >;

@Component({
  selector: 'app-agregar-rol-permisos',
  templateUrl: './agregar-rol-permisos.component.html',
  styleUrls: ['./agregar-rol-permisos.component.scss']
})
export class AgregarRolPermisosComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  readonly POSICION_CATALOGO_ROL = 0;
  readonly POSICION_CATALOGO_FUNCIONALIDAD = 1;
  rolPermisos: any="";
  opciones: TipoDropdown[] = CATALOGOS;
  catRol: TipoDropdown[] = [];
  catFuncionalidad: TipoDropdown[] = [];
  agregarRolForm!: FormGroup;
  modificarRolForm!: FormGroup;

  mostrarModalAgregarFunc: boolean = false;
  mostrarModalModificarFunc: boolean = false;

  formFuncionalidad!: FormGroup;
  permisos : any;

  funcionalidades: Funcionalidad[] = [];
  funcionalidadSeleccionada!: Funcionalidad;

  contadorFuncionalidades = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private rolPermisosService: RolPermisosService,
    private alertaService: AlertaService
  ) {
  }

  ngOnInit(): void {
    debugger
    this.breadcrumbService.actualizar(USUARIOS_BREADCRUMB);
    const roles = this.route.snapshot.data["respuesta"];
    this.catRol = roles[this.POSICION_CATALOGO_ROL].datos.map((rol: Catalogo) => ({label: rol.des_rol, value: rol.id})) || [];
    const funcionalidades = this.route.snapshot.data["respuesta"];
    this.catFuncionalidad = funcionalidades[this.POSICION_CATALOGO_FUNCIONALIDAD].datos.map((funcionalidad: Catalogo) => ({label: funcionalidad.nombre, value: funcionalidad.id})) || [];
    this.inicializarAgregarRolForm();
  }

  inicializarAgregarRolForm(): void {
    this.agregarRolForm = this.formBuilder.group({
      rol: [{value: null, disabled: false}, [Validators.required]],
      estatus: [{value: true, disabled: false}],
      funcionalidades: this.formBuilder.array([])
    });
  }

  agregarRolPermisos(): void {
    debugger
     this.funcionalidades.forEach(funcionalidad => {
      this.permisos="";
       this.permisos = funcionalidad.alta==true? this.permisos="1,":  this.permisos;
       this.permisos = funcionalidad.baja==true? this.permisos+="2,":  this.permisos;
       this.permisos = funcionalidad.consulta==true? this.permisos+="3,":  this.permisos;
       this.permisos = funcionalidad.modificar==true? this.permisos+="4,":  this.permisos;
       this.permisos = funcionalidad.aprobacion==true? this.permisos+="5,":  this.permisos;
       this.permisos = funcionalidad.imprimir==true? this.permisos+="6":  this.permisos;
      this.rolPermisos = {
          idRol: this.agregarRolForm.get("rol")?.value,
          idFuncionalidad:  funcionalidad.id,
          permiso: this.permisos
        }
        this.rolPermisosService.guardar(this.rolPermisos).subscribe(
          () => {
            this.alertaService.mostrar(TipoAlerta.Exito, 'Alta satisfactoria');
            this.router.navigate(["../"], { relativeTo: this.route });
          },
          (error: HttpErrorResponse) => {
            this.alertaService.mostrar(TipoAlerta.Error, 'Alta incorrecta');
            console.error("ERROR: ", error.message)
          }
        );
      })
    }

  abrirPanel(event: MouseEvent, funcionalidadSeleccionada: Funcionalidad): void {
    this.funcionalidadSeleccionada = funcionalidadSeleccionada;
    this.overlayPanel.toggle(event);
  }

  abrirModalAgregarFuncionalidad(): void {
    debugger
    this.crearFormGroupFuncionalidad();
    this.mostrarModalAgregarFunc = true;
  }

  abrirModalModificarFuncionalidad(): void {
    this.formFuncionalidad = this.formBuilder.group({
      id: [{value: this.funcionalidadSeleccionada.id, disabled: false}, [Validators.required]],
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
    debugger
    this.formFuncionalidad = this.formBuilder.group({
      id: [{value: null, disabled: false}, [Validators.required]],
      nombre: [{value: null, disabled: false}],
      alta: [{value: false, disabled: false}],
      baja: [{value: false, disabled: false}],
      aprobacion: [{value: false, disabled: false}],
      consulta: [{value: false, disabled: false}],
      modificar: [{value: false, disabled: false}],
      imprimir: [{value: false, disabled: false}],
    });
  }

  agregarFuncionalidad(): void {
    debugger
    this.formArrayFuncionalidades.push(this.formFuncionalidad);
    //this.alertaService.mostrar(TipoAlerta.Exito, 'Exito');
    this.funcionalidades = this.obtenerFuncionalidadesDeFormArray();
    this.mostrarModalAgregarFunc = false;
    //  this.contadorFuncionalidades++;
  }

  modificarFuncionalidad(): void {
    debugger
    let indiceFuncionalidad: number = this.buscarIndiceFuncionalidadEnFormArray();
    this.reemplazarFuncionalidadEnFormArray(indiceFuncionalidad, this.formFuncionalidad);
    this.funcionalidades = this.obtenerFuncionalidadesDeFormArray();
    this.mostrarModalModificarFunc = false;
  }

  reemplazarFuncionalidadEnFormArray(indice: number, formGroup: FormGroup) {
    this.formArrayFuncionalidades.setControl(indice, formGroup);
  }

  buscarIndiceFuncionalidadEnFormArray(): number {
    debugger
    return this.formArrayFuncionalidades.controls.findIndex((control: AbstractControl) => control.value.id === this.formFuncionalidad.value.id);
  }

  obtenerFuncionalidadesDeFormArray(): Funcionalidad[] {
    debugger
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
