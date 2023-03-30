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

  formFuncionalidad!: FormGroup;
  permisos : any;

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
    this.inicializarAgregarRolForm();
  }

  inicializarAgregarRolForm(): void {
    this.agregarRolForm = this.formBuilder.group({
      nombre: [{value: null, disabled: false}, [Validators.required, Validators.maxLength(100)]],
      nivel: [{value: null, disabled: false}, [Validators.required]]
    });
  }

  crearNuevoRol(): any {
    debugger
    return {
      desRol : this.agregarRolForm.get("nombre")?.value,
      nivel: this.agregarRolForm.get("nivel")?.value
    };
  }

  agregarRol(): void {
    debugger
    const rolBo: NuevoRol = this.crearNuevoRol();
   // const solicitudRol: string = JSON.stringify(rolBo);
    this.rolService.guardar(rolBo).subscribe(
      () => {
        this.alertaService.mostrar(TipoAlerta.Exito, 'Alta satisfactoria');
      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar(TipoAlerta.Error, 'Alta incorrecta');
        console.error("ERROR: ", error.message)
      }
    );
  }

  get f() {
    return this.agregarRolForm.controls;
  }

  get funcionalidad() {
    return this.formFuncionalidad.controls;
  }

}
