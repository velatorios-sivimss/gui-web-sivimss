import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Rol} from '../../models/rol.interface';
import {Funcionalidad} from '../../models/funcionalidad.interface';
import * as moment from "moment/moment";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {HttpErrorResponse} from "@angular/common/http";
import {RolPermisosService} from "../../services/rol-permisos.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {PATRON_CORREO} from "../../../../utils/constantes";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
//import {CATALOGOS} from "../../constants/catalogos_dummies";
import {RespuestaModalRol} from "../../models/respuestaModal.interface";
import {diferenciaUTC} from "../../../../utils/funciones";
import {Catalogo} from 'projects/sivimss-gui/src/app/models/catalogos.interface';
import {ActivatedRoute} from '@angular/router';

type RolPermisosModificado = Omit<Funcionalidad, "password">

@Component({
  selector: 'app-modificar-rol-permisos',
  templateUrl: './modificar-rol-permisos.component.html',
  styleUrls: ['./modificar-rol-permisos.component.scss']
})
export class ModificarRolPermisosComponent implements OnInit {

  formFuncionalidad!: FormGroup;
  modificarRolPermisoForm!: FormGroup;
  rolPermisosModificado!: RolPermisosModificado;
 // opciones: TipoDropdown[] = CATALOGOS;
 readonly POSICION_CATALOGO_ROL = 0;
 readonly POSICION_CATALOGO_FUNCIONALIDAD = 1;
 listaPermisos:any;
 permisos:any;
 rolPermisos: any="";

 catRol: TipoDropdown[] = [];
 catFuncionalidad: TipoDropdown[] = [];
  indice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private rolPermisoService: RolPermisosService,
    private alertaService: AlertaService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
  }

  ngOnInit(): void {
    debugger
    const rolPermisos = this.config.data;
    const roles = this.route.snapshot.data["respuesta"];
    this.catRol = roles[this.POSICION_CATALOGO_ROL].datos.map((rol: Catalogo) => ({label: rol.des_rol, value: rol.id})) || [];
    const funcionalidades = this.route.snapshot.data["respuesta"];
    this.catFuncionalidad = funcionalidades[this.POSICION_CATALOGO_FUNCIONALIDAD].datos.map((funcionalidad: Catalogo) => ({label: funcionalidad.nombre, value: funcionalidad.id})) || [];
    this.inicializarModificarRolPermisoForm(rolPermisos);
  }

  inicializarModificarRolPermisoForm(rolPermisos: Rol): void {
    this.modificarRolPermisoForm = this.formBuilder.group({
      idRol: [{value: rolPermisos.idRol, disabled: true}, [Validators.required]],
      id: [{value: rolPermisos.idFuncionalidad, disabled: true}, [Validators.required]],
      alta: [{value: rolPermisos.permiso.includes('ALTA')? true: false, disabled: false}, [Validators.required]],
      baja: [{value: rolPermisos.permiso.includes('BAJA')? true: false, disabled: false}, [Validators.required]],
      aprobacion: [{value: rolPermisos.permiso.includes('APROBACIÓN')? true: false, disabled: false}, [Validators.required]],
      consulta: [{value: rolPermisos.permiso.includes('CONSULTA')? true: false, disabled: false}, [Validators.required]],
      modificar: [{value: rolPermisos.permiso.includes('MODIFICAR')? true: false, disabled: false}, [Validators.required]],
      imprimir: [{value: rolPermisos.permiso.includes('IMPRIMIR')? true: false, disabled: false}, [Validators.required]]
    });
    this.listaPermisos= rolPermisos.permiso;

  }

  crearRolPermisosModificado(): any {
    return {
      id: this.modificarRolPermisoForm.get("id")?.value,
      alta: this.modificarRolPermisoForm.get("alta")?.value,
      baja: this.modificarRolPermisoForm.get("baja")?.value,
      aprobacion: this.modificarRolPermisoForm.get("aprobacion")?.value,
      consulta: this.modificarRolPermisoForm.get("consulta")?.value,
      modificar: this.modificarRolPermisoForm.get("modificar")?.value,
      imprimir: this.modificarRolPermisoForm.get("imprimir")?.value
    };
  }

  modificarUsuario(): void {
    const respuesta: RespuestaModalRol = {mensaje: "Actualización satisfactoria", actualizar: true}
    this.permisos="";
    this.permisos = this.rolPermisosModificado.alta==true? this.permisos="1,":  this.permisos;
    this.permisos = this.rolPermisosModificado.baja==true? this.permisos+="2,":  this.permisos;
    this.permisos = this.rolPermisosModificado.consulta==true? this.permisos+="3,":  this.permisos;
    this.permisos = this.rolPermisosModificado.modificar==true? this.permisos+="4,":  this.permisos;
    this.permisos = this.rolPermisosModificado.aprobacion==true? this.permisos+="5,":  this.permisos;
    this.permisos = this.rolPermisosModificado.imprimir==true? this.permisos+="6":  this.permisos;
   this.rolPermisos = {
       idRol: this.modificarRolPermisoForm.get("idRol")?.value,
       idFuncionalidad: this.modificarRolPermisoForm.get("id")?.value,
       permiso: this.permisos
     }
    this.rolPermisoService.actualizar(this.rolPermisos).subscribe(
      () => {
        this.ref.close(respuesta);
      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar(TipoAlerta.Error, 'Actualización incorrecta');
        console.error("ERROR: ", error)
      }
    );
  }


  get fmu() {
    return this.modificarRolPermisoForm.controls;
  }


  cancelar(): void {
    if (this.indice === 1) {
      this.indice--;
      return;
    }
    const respuesta: RespuestaModalRol = {};
    this.ref.close(respuesta);
  }

  confirmarModificacion(): void {
    if (this.indice === 0) {
      this.indice++;
      this.rolPermisosModificado = this.crearRolPermisosModificado();
      this.modificarUsuario();
      return;
    }
  }
  
}
