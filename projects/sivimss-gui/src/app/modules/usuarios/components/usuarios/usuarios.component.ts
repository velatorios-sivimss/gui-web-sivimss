import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {DIEZ_ELEMENTOS_POR_PAGINA} from "../../../../utils/constantes";
import {LazyLoadEvent} from "primeng-lts/api";
import {OverlayPanel} from "primeng-lts/overlaypanel";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {BreadcrumbService} from "../../../../shared/breadcrumb/services/breadcrumb.service";


import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../../models/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { HttpRespuesta } from '../../../../models/http-respuesta.interface';

type nuevoUsuario = Omit<Usuario, "ID_USUARIO"> 
import * as moment from 'moment';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  respuesta!: HttpRespuesta<any> | null;
  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;
  
  opciones: any[] = [
    {
      label: 'Opción 1',
      value: 1,
    },
    {
      label: 'Opción 2',
      value: 2,
    },
    {
      label: 'Opción 3',
      value: 3,
    }
  ];

  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario = {};
  usuarioModificado: Usuario = {};
  valorValidacion: number = 0;

  filtroForm!: FormGroup;
  agregarUsuarioForm!: FormGroup;
  modificarUsuarioForm!: FormGroup;

  mostrarModalAgregarUsuario: boolean = false;
  mostrarModalModificarUsuario: boolean = false;
  mostrarModalDetalleUsuario: boolean = false;
  mostrarModalConfModUsuario: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private alertaService: AlertaService,
    private breadcrumbService: BreadcrumbService
  ) {
  }

  ngOnInit(): void {
    this.respuesta = this.route.snapshot.data["respuesta"];
    this.usuarios = this.respuesta!.datos.content;
    this.breadcrumbService.actualizar([
      {
        icono: 'imagen-icono-operacion-sivimss.svg',
        titulo: 'Administración de catálogos'
      },
      {
        icono: '',
        titulo: 'Administrar usuarios'
      }
    ]);
    this.inicializarFiltroForm();
  }

  abrirPanel(event:MouseEvent, usuario: any):void {
    this.usuarioSeleccionado = usuario;
    this.inicializarModificarUsuarioForm(usuario);
    this.overlayPanel.toggle(event);
  }

  abrirModalAgregarUsuario(): void {
    this.inicializarAgregarUsuarioForm();
    this.mostrarModalAgregarUsuario = true;
  }

  abrirModalModificarUsuario():void {
    this.mostrarModalModificarUsuario = true;
  }

  abrirModalDetalleUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = {...usuario};
    this.mostrarModalDetalleUsuario = true;
  }

  inicializarFiltroForm() {
    this.filtroForm = this.formBuilder.group({
      nivel: [{value: null, disabled: false}, Validators.required],
      velatorio: [{value: null, disabled: false}],
      delegacion: [{value: null, disabled: false}],
      rol: [{value: null, disabled: false}]
    });
  }

  inicializarAgregarUsuarioForm() {
    this.agregarUsuarioForm = this.formBuilder.group({
      curp: [{value: null, disabled: false}, [Validators.required,Validators.maxLength(18)]],
      matricula: [{value: null, disabled: false}, [Validators.required,Validators.maxLength(10)]],
      nombre: [{value: null, disabled: false}, [Validators.required,Validators.maxLength(50)]],
      primerApellido: [{value: null, disabled: false}, [Validators.required,Validators.maxLength(50)]],
      segundoApellido: [{value: null, disabled: false}, [Validators.required,Validators.maxLength(50)]],
      correoElectronico: [{value: null, disabled: false}, [Validators.required,Validators.email, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      fechaNacimiento: [{value: null, disabled: false}, [Validators.required]],
      nivel: [{value: null, disabled: false}, [Validators.required]],
      delegacion: [{value: null, disabled: false}, [Validators.required]],
      velatorio: [{value: null, disabled: false}, [Validators.required]],
      rol: [{value: null, disabled: false}, [Validators.required]],
      estatus: [{value: true, disabled: false}]
    });
  }

  inicializarModificarUsuarioForm(usuario: any): void {
    this.modificarUsuarioForm = this.formBuilder.group({
      id: new FormControl(usuario.id, Validators.required),
      curp: new FormControl(usuario.curp, [Validators.required,Validators.maxLength(18)]),
      matricula: new FormControl(usuario.matricula, [Validators.required,Validators.maxLength(10)]),
      nombre: new FormControl(usuario.nombre, [Validators.required,Validators.maxLength(50)]),
      primerApellido: new FormControl(usuario.paterno, [Validators.required,Validators.maxLength(50)]),
      segundoApellido: new FormControl(usuario.materno, [Validators.required,Validators.maxLength(50)]),
      correoElectronico: new FormControl(usuario.correo,[Validators.required, Validators.email, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      fechaNacimiento: new FormControl(usuario.fecNacimiento, Validators.required),
      nivel: new FormControl(usuario.idOficina, Validators.required),
      delegacion: new FormControl(usuario.idDelegacion, Validators.required),
      velatorio: new FormControl(usuario.idVelatorio, Validators.required),
      rol: new FormControl(usuario.idRol, Validators.required),
      estatus: new FormControl(usuario.estatus, Validators.required)
    });
  }

  
  paginar(event: any): void {
    let inicio = event.first;
    let pagina = Math.floor(inicio / 10);
    let tamanio = event.rows;
    this.usuarioService.buscarPorPagina(pagina, tamanio).subscribe(
      (respuesta) => {
        this.usuarios = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.usuarios = this.respuesta!.datos.content;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  buscar(): void {
  let filtros: any = {
    idOficina: this.filtroForm.get("nivel")?.value,
    idVelatorio: this.filtroForm.get("velatorio")?.value,
    idRol: this.filtroForm.get("rol")?.value,
    idDelegacion: this.filtroForm.get("delegacion")?.value
  };

    this.usuarioService.buscarPorFiltros(JSON.stringify(filtros), 0, 10).subscribe(
      (respuesta) => {
        this.usuarios = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.usuarios = this.respuesta!.datos.content;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar( TipoAlerta.Error, error.message);
      }
    );
  }

  limpiar():void {
    this.filtroForm = this.formBuilder.group({
      nivel: [{value: null, disabled: false}, Validators.required],
      velatorio: [{value: null, disabled: false}],
      delegacion: [{value: null, disabled: false}],
      rol: [{value: null, disabled: false}]
    });
    let filtros: any = {}
    this.usuarioService.buscarPorFiltros(JSON.stringify(filtros), 0, 10).subscribe(
      (respuesta) => {
        this.usuarios = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.usuarios = this.respuesta!.datos.content;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar( TipoAlerta.Error, error.message);
      }
    );
  }



  agregarUsuario():void {
    let usuario: Usuario = {
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
    this.usuarioService.guardar(JSON.stringify(usuario)).subscribe(
      (respuesta) => {
        this.mostrarModalAgregarUsuario = false;
        this.alertaService.mostrar(TipoAlerta.Exito, 'Alta satisfactoria');

      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar( TipoAlerta.Error, 'Alta incorrecta');
        console.error("ERROR: ",  error.message)
      }
    );
   
  }

  confirmarModificacion():void {
    let usuario: Usuario = {
      id: this.modificarUsuarioForm.get("id")?.value,
      materno: this.modificarUsuarioForm.get("segundoApellido")?.value,
      nombre: this.modificarUsuarioForm.get("nombre")?.value,
      correo: this.modificarUsuarioForm.get("correoElectronico")?.value,
      curp: this.modificarUsuarioForm.get("curp")?.value,
      claveMatricula: this.modificarUsuarioForm.get("matricula")?.value,
      fecNacimiento: this.modificarUsuarioForm.get("fechaNacimiento")?.value,
      password: this.modificarUsuarioForm.get("matricula")?.value,
      paterno: this.modificarUsuarioForm.get("primerApellido")?.value,
      estatus: this.modificarUsuarioForm.get("estatus")?.value ? 1 : 0,
      idOficina: this.modificarUsuarioForm.get("nivel")?.value,
      idVelatorio: this.modificarUsuarioForm.get("velatorio")?.value,
      idRol: this.modificarUsuarioForm.get("rol")?.value,
      idDelegacion: this.modificarUsuarioForm.get("delegacion")?.value
    };
    this.mostrarModalConfModUsuario = true
    this.usuarioModificado = usuario;
  }

  modificarUsuario():void {
    let usuario: Usuario = {
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
      idRol: this.modificarUsuarioForm.get("rol")?.value,
      idDelegacion: this.modificarUsuarioForm.get("delegacion")?.value
    };
    this.usuarioService.actualizar(JSON.stringify(usuario)).subscribe(
      (respuesta) => {
        this.mostrarModalModificarUsuario = false;
        this.alertaService.mostrar(TipoAlerta.Exito, 'Actualización satisfactoria');
        this.mostrarModalConfModUsuario = false;
        this.mostrarModalModificarUsuario = false;
      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar( TipoAlerta.Error, 'Actualización incorrecta');
        console.error("ERROR: ", error)
      }
    );
    
  }
  
  cambiarEstatus(id: any):void {
    let idUsuario: any = {
      id: id
    }
    this.usuarioService.cambiarEstatus(JSON.stringify(idUsuario)).subscribe(
      (respuesta) => {
        this.respuesta = respuesta;
        this.alertaService.mostrar(TipoAlerta.Exito, 'Cambio de estatus realizado');
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar( TipoAlerta.Error, error.message);
      }
    );
  }

  validarCurp():void {
    let curp: Usuario = {
      curp: this.agregarUsuarioForm.get("curp")?.value
    }
    this.usuarioService.validarCurp(JSON.stringify(curp)).subscribe(
      (respuesta) => {
        if ( respuesta!.datos){
          this.valorValidacion =  respuesta!.datos[0].valor;
          switch( this.valorValidacion) { 
            case 0: { 
              this.alertaService.mostrar(TipoAlerta.Exito, 'Curp valido');
            break; 
            } 
            case 1: { 
              this.alertaService.mostrar(TipoAlerta.Error, 'Curp duplicado');
            break; 
            } 
            case 2: { 
              this.alertaService.mostrar(TipoAlerta.Error, 'Curp mal formado');
            break; 
            } 
          }
        }
      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar( TipoAlerta.Error, 'Ocurrio un error');
        console.error("ERROR: ",   error.message)
      }
    );
  }

  
  validarMatricula():void {
    let matricula: any = {
      claveMatricula: this.agregarUsuarioForm.get("matricula")?.value
    }
    this.usuarioService.validarMatricula(JSON.stringify(matricula)).subscribe(
      (respuesta) => {
        if ( respuesta!.datos){
          this.valorValidacion =  respuesta!.datos[0].valor;
          switch( this.valorValidacion) { 
            case 0: { 
              this.alertaService.mostrar(TipoAlerta.Exito, 'Matricula valida');
            break; 
            } 
            case 1: { 
              this.alertaService.mostrar(TipoAlerta.Error, 'Matricula duplicada');
            break; 
            }  
          }
        }
        this.alertaService.mostrar(TipoAlerta.Exito, 'Matricula valida');
      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar( TipoAlerta.Error, 'Matricula no valida');
        console.error("ERROR: ",   error.message)
      }
    );
  }

  get f() {
    return this.filtroForm.controls;
  }

  get fau() {
    return this.agregarUsuarioForm.controls;
  }

  get fmu() {
    return this.modificarUsuarioForm.controls;
  }

}
