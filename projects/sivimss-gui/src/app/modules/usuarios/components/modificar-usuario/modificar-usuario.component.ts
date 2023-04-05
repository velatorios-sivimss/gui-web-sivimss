import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Usuario} from '../../models/usuario.interface';
import * as moment from "moment/moment";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UsuarioService} from "../../services/usuario.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {PATRON_CORREO} from "../../../../utils/constantes";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {CATALOGOS} from "../../constants/catalogos_dummies";
import {RespuestaModalUsuario} from "../../models/respuestaModal.interface";
import {diferenciaUTC} from "../../../../utils/funciones";
import {Catalogo} from 'projects/sivimss-gui/src/app/models/catalogos.interface';
import {ActivatedRoute} from '@angular/router';

type UsuarioModificado = Omit<Usuario, "password">

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss']
})
export class ModificarUsuarioComponent implements OnInit {

  modificarUsuarioForm!: FormGroup;
  usuarioModificado!: UsuarioModificado;
  opciones: TipoDropdown[] = CATALOGOS;
  indice: number = 0;
  catRol: TipoDropdown[] = [];
  fechaActual: Date = new Date();
  rolResumen: string = "";
  nivelResumen: string = "";

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private alertaService: AlertaService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
  }

  ngOnInit(): void {
    const usuario = this.config.data;
    const roles = this.route.snapshot.data["respuesta"].datos;
    this.catRol = roles.map((rol: Catalogo) => ({label: rol.nombre, value: rol.id})) || [];
    this.inicializarModificarUsuarioForm(usuario);
  }

  inicializarModificarUsuarioForm(usuario: Usuario): void {
    this.modificarUsuarioForm = this.formBuilder.group({
      id: [{value: usuario.id, disabled: true}, [Validators.required]],
      curp: [{value: usuario.curp, disabled: true}, [Validators.required, Validators.maxLength(18)]],
      matricula: [{value: usuario.matricula, disabled: true}, [Validators.required, Validators.maxLength(10)]],
      nombre: [{value: usuario.nombre, disabled: true}, [Validators.required, Validators.maxLength(50)]],
      primerApellido: [{value: usuario.paterno, disabled: true}, [Validators.required, Validators.maxLength(50)]],
      segundoApellido: [{value: usuario.materno, disabled: true}, [Validators.required, Validators.maxLength(50)]],
      correoElectronico: [{value: usuario.correo, disabled: false},
        [Validators.required, Validators.email, Validators.pattern(PATRON_CORREO)]],
      fechaNacimiento: [{value: new Date(diferenciaUTC(usuario.fecNacimiento)), disabled: false},
        [Validators.required]],
      nivel: [{value: usuario.idOficina, disabled: false}, [Validators.required]],
      delegacion: [{value: usuario.idDelegacion, disabled: false}, [Validators.required]],
      velatorio: [{value: usuario.idVelatorio, disabled: false}, [Validators.required]],
      rol: [{value: usuario.idRol, disabled: false}, [Validators.required]],
      estatus: [{value: usuario.estatus, disabled: false}, [Validators.required]]
    });
  }

  crearUsuarioModificado(): UsuarioModificado {
    const rol = this.modificarUsuarioForm.get("rol")?.value;
    const nivel = this.modificarUsuarioForm.get("nivel")?.value;
    this.rolResumen = this.catRol.find(r => r.value === rol)?.label || "";
    this.nivelResumen = this.opciones.find(o => o.value === nivel)?.label || "";
    return {
      id: this.modificarUsuarioForm.get("id")?.value,
      materno: this.modificarUsuarioForm.get("segundoApellido")?.value,
      nombre: this.modificarUsuarioForm.get("nombre")?.value,
      correo: this.modificarUsuarioForm.get("correoElectronico")?.value,
      curp: this.modificarUsuarioForm.get("curp")?.value,
      claveMatricula: this.modificarUsuarioForm.get("matricula")?.value,
      fecNacimiento: this.modificarUsuarioForm.get('fechaNacimiento')?.value &&
        moment(this.modificarUsuarioForm.get('fechaNacimiento')?.value).format('YYYY-MM-DD'),
      paterno: this.modificarUsuarioForm.get("primerApellido")?.value,
      estatus: this.modificarUsuarioForm.get("estatus")?.value ? 1 : 0,
      idOficina: this.modificarUsuarioForm.get("nivel")?.value,
      idVelatorio: this.modificarUsuarioForm.get("velatorio")?.value,
      idRol: rol,
      idDelegacion: this.modificarUsuarioForm.get("delegacion")?.value,
      matricula: this.modificarUsuarioForm.get("matricula")?.value
    };
  }

  modificarUsuario(): void {
    const respuesta: RespuestaModalUsuario = {mensaje: "Usuario modificado correctamente", actualizar: true}
    this.usuarioService.actualizar(this.usuarioModificado).subscribe(
      () => {
        this.ref.close(respuesta)
      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar(TipoAlerta.Error, 'Actualización incorrecta');
        console.error("ERROR: ", error)
      }
    );
  }

  get fmu() {
    return this.modificarUsuarioForm.controls;
  }

  cancelar(): void {
    if (this.indice === 1) {
      this.indice--;
      return;
    }
    const respuesta: RespuestaModalUsuario = {};
    this.ref.close(respuesta);
  }

  confirmarModificacion(): void {
    if (this.indice === 0) {
      this.indice++;
      this.usuarioModificado = this.crearUsuarioModificado();
      return;
    }
    this.modificarUsuario();
  }
}
