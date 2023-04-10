import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PATRON_CORREO, PATRON_CURP} from "../../../../utils/constantes";
import {Usuario} from "../../models/usuario.interface";
import * as moment from "moment/moment";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UsuarioService} from "../../services/usuario.service";
import {DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {CATALOGOS} from "../../constants/catalogos_dummies";
import {RespuestaModalUsuario} from "../../models/respuestaModal.interface";
import {MENSAJES_CURP} from "../../constants/validacionCURP";
import {MENSAJES_MATRICULA} from "../../constants/validacionMatricula";
import {ActivatedRoute} from '@angular/router';
import {Catalogo} from 'projects/sivimss-gui/src/app/models/catalogos.interface';

type NuevoUsuario = Omit<Usuario, "id" | "password" | "estatus" | "matricula">;
type SolicitudCurp = Pick<Usuario, "curp">;
type SolicitudMatricula = Pick<Usuario, "claveMatricula">;

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss']
})
export class AgregarUsuarioComponent implements OnInit {

  agregarUsuarioForm!: FormGroup;
  opciones: TipoDropdown[] = CATALOGOS;
  indice: number = 0;
  curpValida: boolean = false;
  matriculaValida: boolean = false;
  catRol: TipoDropdown[] = [];
  fechaActual: Date = new Date();
  nuevoUsuario!: NuevoUsuario;
  rolResumen: string = "";
  nivelResumen: string = "";
  delegacionResumen: string = "";
  velatorioResumen: string = "";

  constructor(
    private route: ActivatedRoute,
    private alertaService: AlertaService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    private usuarioService: UsuarioService,
  ) {
  }

  ngOnInit(): void {
    this.inicializarAgregarUsuarioForm();
    const roles = this.route.snapshot.data["respuesta"].datos;
    this.catRol = roles.map((rol: Catalogo) => ({label: rol.nombre, value: rol.id})) || [];
  }

  inicializarAgregarUsuarioForm(): void {
    this.agregarUsuarioForm = this.formBuilder.group({
      curp: [{value: null, disabled: false},
        [Validators.required, Validators.maxLength(18), Validators.pattern(PATRON_CURP)]],
      matricula: [{value: null, disabled: false}, [Validators.required, Validators.maxLength(10)]],
      nombre: [{value: null, disabled: false}, [Validators.required, Validators.maxLength(50)]],
      primerApellido: [{value: null, disabled: false}, [Validators.required, Validators.maxLength(50)]],
      segundoApellido: [{value: null, disabled: false}, [Validators.required, Validators.maxLength(50)]],
      correoElectronico: [{value: null, disabled: false},
        [Validators.required, Validators.email, Validators.pattern(PATRON_CORREO)]],
      fechaNacimiento: [{value: null, disabled: false}, [Validators.required]],
      nivel: [{value: null, disabled: false}, [Validators.required]],
      delegacion: [{value: null, disabled: false}, [Validators.required]],
      velatorio: [{value: null, disabled: false}, [Validators.required]],
      rol: [{value: null, disabled: false}, [Validators.required]],
      estatus: [{value: true, disabled: false}]
    });
  }

  crearUsuario(): NuevoUsuario {
    return {
      materno: this.agregarUsuarioForm.get("segundoApellido")?.value,
      nombre: this.agregarUsuarioForm.get("nombre")?.value,
      correo: this.agregarUsuarioForm.get("correoElectronico")?.value,
      curp: this.agregarUsuarioForm.get("curp")?.value,
      claveMatricula: this.agregarUsuarioForm.get("matricula")?.value,
      fecNacimiento: this.agregarUsuarioForm.get('fechaNacimiento')?.value &&
        moment(this.agregarUsuarioForm.get('fechaNacimiento')?.value).format('YYYY-MM-DD'),
      paterno: this.agregarUsuarioForm.get("primerApellido")?.value,
      idOficina: this.agregarUsuarioForm.get("nivel")?.value,
      idVelatorio: this.agregarUsuarioForm.get("velatorio")?.value,
      idRol: this.agregarUsuarioForm.get("rol")?.value,
      idDelegacion: this.agregarUsuarioForm.get("delegacion")?.value,
    };
  }

  creacionVariablesResumen(): void {
    const rol = this.agregarUsuarioForm.get("rol")?.value;
    const nivel = this.agregarUsuarioForm.get("nivel")?.value;
    const delegacion = this.agregarUsuarioForm.get("delegacion")?.value;
    const velatorio = this.agregarUsuarioForm.get("velatorio")?.value;
    this.rolResumen = this.catRol.find(r => r.value === rol)?.label || "";
    this.nivelResumen = this.opciones.find(o => o.value === nivel)?.label || "";
    this.delegacionResumen = this.opciones.find(o => o.value === delegacion)?.label || "";
    this.velatorioResumen = this.opciones.find(o => o.value === velatorio)?.label || "";
  }


  validarCurp(): void {
    const curp: SolicitudCurp = {curp: this.agregarUsuarioForm.get("curp")?.value};
    if (!curp.curp) return;
    if (!PATRON_CURP.test(curp.curp)) return;
    this.usuarioService.validarCurp(curp).subscribe(
      (respuesta) => {
        if (!respuesta.datos || respuesta.datos.length === 0) return;
        const {valor} = respuesta.datos[0];
        if (!MENSAJES_CURP.has(valor)) return;
        const {mensaje, tipo, valido} = MENSAJES_CURP.get(valor);
        this.curpValida = valido;
        this.alertaService.mostrar(tipo, mensaje);
      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar(TipoAlerta.Error, 'Ocurrio un error');
        console.error("ERROR: ", error.message)
      }
    );
  }

  validarMatricula(): void {
    const matricula: SolicitudMatricula = {claveMatricula: this.agregarUsuarioForm.get("matricula")?.value};
    if (!matricula.claveMatricula) return;
    this.usuarioService.validarMatricula(matricula).subscribe(
      (respuesta) => {
        if (!respuesta.datos || respuesta.datos.length === 0) return;
        const {valor} = respuesta.datos[0];
        if (!MENSAJES_MATRICULA.has(valor)) return;
        const {mensaje, tipo, valido} = MENSAJES_MATRICULA.get(valor);
        this.matriculaValida = valido;
        this.alertaService.mostrar(tipo, mensaje);
      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar(TipoAlerta.Error, 'Matricula no valida');
        console.error("ERROR: ", error.message)
      }
    );
  }

  agregarUsuario(): void {
    const respuesta: RespuestaModalUsuario = {mensaje: "Usuario agregado correctamente", actualizar: true}
    this.usuarioService.guardar(this.nuevoUsuario).subscribe(
      () => {
        this.ref.close(respuesta)
      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar(TipoAlerta.Error, 'Alta incorrecta');
        console.error("ERROR: ", error.message)
      }
    );
  }

  cancelar(): void {
    const respuesta: RespuestaModalUsuario = {};
    this.ref.close(respuesta);
  }

  confirmarCreacion(): void {
    if (this.indice === 0) {
      this.indice++;
      this.nuevoUsuario = this.crearUsuario();
      this.creacionVariablesResumen();
      return;
    }
    this.agregarUsuario();
  }

  get fau() {
    return this.agregarUsuarioForm?.controls;
  }

}
