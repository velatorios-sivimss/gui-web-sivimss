import { HttpClient } from '@angular/common/http';
import { EnumValue } from "@angular/compiler-cli/src/ngtsc/partial_evaluator";
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { HttpRespuesta } from "projects/sivimss-gui/src/app/models/http-respuesta.interface";
import { Payload } from "projects/sivimss-gui/src/app/models/payload.interface";
import { UsuarioEnSesion } from "projects/sivimss-gui/src/app/models/usuario-en-sesion.interface";
import { BreadcrumbService } from "projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service";
import { LoaderService } from "projects/sivimss-gui/src/app/shared/loader/services/loader.service";
import { MenuSidebarService } from "projects/sivimss-gui/src/app/shared/sidebar/services/menu-sidebar.service";
import { SIVIMSS_TOKEN } from "projects/sivimss-gui/src/app/utils/constantes";
import { existeMensajeEnEnum } from "projects/sivimss-gui/src/app/utils/funciones";
import { MensajesRespuestaAutenticacion } from "projects/sivimss-gui/src/app/utils/mensajes-respuesta-autenticacion.enum";
import { MensajesRespuestaCodigo } from "projects/sivimss-gui/src/app/utils/mensajes-respuesta-codigo.enum";
import { dummyMenuResponse } from "projects/sivimss-gui/src/app/utils/menu-dummy";
import { TIEMPO_MAXIMO_INACTIVIDAD_PARA_CERRAR_SESION } from "projects/sivimss-gui/src/app/utils/tokens";
import { BehaviorSubject, Observable, of, Subscription, throwError } from 'rxjs';
import { concatMap, delay, first, map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

export interface Modulo {
  idModuloPadre: string | null;
  idFuncionalidad: string | null;
  idModulo: string;
  titulo: string;
  modulos: Modulo[] | null;
  activo?: boolean;
  ruta?: string;
  icono?: string;
}

export interface PermisosPorRol {
  permisosPorFuncionalidad: PermisosPorFuncionalidad[];
}

export interface PermisosPorFuncionalidad {
  idFuncionalidad: string;
  permisos: Permiso[];
}

export interface Permiso {
  idPermiso: string;
  descPermiso: string;
}

const respuestaInicioSesionCorrecto = {
  error: false,
  codigo: 200,
  mensaje: "INICIO_SESION_CORRECTO",
  datos: {
    "token": "eyJzaXN0ZW1hIjoic2l2aW1zcyIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJ7XCJpZFZlbGF0b3Jpb1wiOlwiMVwiLFwiaWRSb2xcIjpcIjFcIixcImRlc1JvbFwiOlwiQ09PUkRJTkFET1IgREUgQ0VOVFJcIixcImlkRGVsZWdhY2lvblwiOlwiMVwiLFwiaWRPZmljaW5hXCI6XCIxXCIsXCJpZFVzdWFyaW9cIjpcIjFcIixcImN2ZVVzdWFyaW9cIjpcIjFcIixcImN2ZU1hdHJpY3VsYVwiOlwiMVwiLFwibm9tYnJlXCI6XCIxIDEgMVwiLFwiY3VycFwiOlwiMVwifSIsImlhdCI6MTY4MTE2NTMyNCwiZXhwIjoxNjgxNzcwMTI0fQ.krsXJqvtKlgKlxTvWt2P0cLlGhZDGb9G7vWcNKnD0MU"
  }
};

const respuestaContraseniaProxVencer = {
  error: false,
  codigo: 200,
  mensaje: "CONTRASENIA_PROXIMA_VENCER",
  datos: {
    "token": "eyJzaXN0ZW1hIjoic2l2aW1zcyIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJ7XCJpZFZlbGF0b3Jpb1wiOlwiMVwiLFwiaWRSb2xcIjpcIjFcIixcImRlc1JvbFwiOlwiQ09PUkRJTkFET1IgREUgQ0VOVFJcIixcImlkRGVsZWdhY2lvblwiOlwiMVwiLFwiaWRPZmljaW5hXCI6XCIxXCIsXCJpZFVzdWFyaW9cIjpcIjFcIixcImN2ZVVzdWFyaW9cIjpcIjFcIixcImN2ZU1hdHJpY3VsYVwiOlwiMVwiLFwibm9tYnJlXCI6XCIxIDEgMVwiLFwiY3VycFwiOlwiMVwifSIsImlhdCI6MTY4MTE2NTMyNCwiZXhwIjoxNjgxNzcwMTI0fQ.krsXJqvtKlgKlxTvWt2P0cLlGhZDGb9G7vWcNKnD0MU"
  }
};

const respuestaPreActivo = {
  "error": false,
  "codigo": 200,
  "mensaje": "USUARIO_PREACTIVO",
  "datos": null
};

const respuestaCambioContrasenia = {
  "error": false,
  "codigo": 200,
  "mensaje": "Exito",
  "datos": true
};

const respuestaCredencialesIncorrectas = {
  "error": true,
  "codigo": 400,
  "mensaje": "CREDENCIALES_INCORRECTAS",
  "datos": null
};

const respuestaFechaContraseniaVencida = {
  "error": true,
  "codigo": 400,
  "mensaje": "FECHA_CONTRASENIA_VENCIDA",
  "datos": null
};

const respuestaCantidadMaximaIntentosFallidos = {
  "error": true,
  "codigo": 400,
  "mensaje": "CANTIDAD_MAX_INTENTOS_FALLIDOS",
  "datos": null
}

const respuestaPermisosUsuario = {
  "error": false,
  "codigo": 200,
  "mensaje": "Exito",
  "datos": {
    "permisosUsuario": [
      {
        "idFuncionalidad": "1",
        "permisos": [
          {
            "idPermiso": "1",
            "descPermiso": "ALTA"
          },
          {
            "idPermiso": "2",
            "descPermiso": "BAJA"
          },
          {
            "idPermiso": "3",
            "descPermiso": "CONSULTA"
          },
          {
            "idPermiso": "4",
            "descPermiso": "MODIFICAR"
          },
          {
            "idPermiso": "5",
            "descPermiso": "APROBACIÓN"
          },
          {
            "idPermiso": "6",
            "descPermiso": "IMPRIMIR"
          }
        ]
      },
      {
        "idFuncionalidad": "2",
        "permisos": [
          {
            "idPermiso": "1",
            "descPermiso": "ALTA"
          },
          {
            "idPermiso": "2",
            "descPermiso": "BAJA"
          },
          {
            "idPermiso": "3",
            "descPermiso": "CONSULTA"
          },
          {
            "idPermiso": "4",
            "descPermiso": "MODIFICAR"
          },
          {
            "idPermiso": "5",
            "descPermiso": "APROBACIÓN"
          },
          {
            "idPermiso": "6",
            "descPermiso": "IMPRIMIR"
          }
        ]
      },
      {
        "idFuncionalidad": "3",
        "permisos": [
          {
            "idPermiso": "1",
            "descPermiso": "ALTA"
          },
          {
            "idPermiso": "2",
            "descPermiso": "BAJA"
          },
          {
            "idPermiso": "3",
            "descPermiso": "CONSULTA"
          },
          {
            "idPermiso": "4",
            "descPermiso": "MODIFICAR"
          },
          {
            "idPermiso": "5",
            "descPermiso": "APROBACIÓN"
          },
          {
            "idPermiso": "6",
            "descPermiso": "IMPRIMIR"
          }
        ]
      }
    ]
  }
};

const respCodigoRestablecerContrasenia = {
  "error": false,
  "codigo": 200,
  "mensaje": "Exito",
  "datos": "Codigo enviado al correo del Usuario "
}

const respCodigoCorrecto = {
  "error": false,
  "codigo": 200,
  "mensaje": "CODIGO_CORRECTO",
  "datos": null
}

const respCodigoIncorrecto = {
  "error": true,
  "codigo": 400,
  "mensaje": "CODIGO_INCORRECTO",
  "datos": null
}

const respCodigoExpirado = {
  "error": true,
  "codigo": 400,
  "mensaje": "CODIGO_EXPIRADO",
  "datos": null
}


@Injectable()
export class AutenticacionService {

  usuarioEnSesionSubject: BehaviorSubject<UsuarioEnSesion | null> = new BehaviorSubject<UsuarioEnSesion | null>(null);
  usuarioEnSesion$: Observable<UsuarioEnSesion | null> = this.usuarioEnSesionSubject.asObservable();

  permisosUsuarioSubject: BehaviorSubject<PermisosPorFuncionalidad[] | null> = new BehaviorSubject<PermisosPorFuncionalidad[] | null>(null);
  permisosUsuario$: Observable<PermisosPorFuncionalidad[] | null> = this.permisosUsuarioSubject.asObservable();

  paginaCargadaSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  paginaCargada$: Observable<boolean> = this.paginaCargadaSubject.asObservable();

  existeUnaSesion$: Observable<boolean> = this.usuarioEnSesion$.pipe(
    map((usuario: UsuarioEnSesion | null) => !!usuario)
  );

  subsSesionInactivaTemporizador!: Subscription;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly menuSidebarService: MenuSidebarService,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly loaderService: LoaderService,
    private readonly controladorInactividadUsuarioService: BnNgIdleService,
    @Inject(TIEMPO_MAXIMO_INACTIVIDAD_PARA_CERRAR_SESION) private readonly tiempoMaximoInactividad: number
  ) {
    this.recuperarSesionAlActualizarPagina();
  }

  /**
   * Crea la sesion nuevamente si el usuario actualiza la pagina
   */
  recuperarSesionAlActualizarPagina() {
    const token: string | null = localStorage.getItem(SIVIMSS_TOKEN);
    if (token) {
      try {
        const usuario: UsuarioEnSesion = this.obtenerUsuarioDePayload(token);
        this.usuarioEnSesionSubject.next(usuario);
        this.obtenerPermisos(usuario.idRol).subscribe((respuesta: HttpRespuesta<any>) => {
          this.permisosUsuarioSubject.next(respuesta.datos.permisosUsuario);
          this.iniciarTemporizadorSesion();
          this.paginaCargadaSubject.next(true);
        });
      } catch (ex) {
        this.cerrarSesion();
        this.paginaCargadaSubject.next(true);
      }
    } else {
      this.paginaCargadaSubject.next(true);
    }
  }

  iniciarSesion(usuario: string, contrasenia: string, mostrarMsjContraseniaProxVencer: boolean = true): Observable<string> {
    //this.http.post<any>(`http://localhost:8080/mssivimss-oauth/acceder`, {usuario, contrasena})
    this.paginaCargadaSubject.next(false);
    return of<HttpRespuesta<any>>(respuestaInicioSesionCorrecto).pipe(
      delay(1000),
      concatMap((respuesta: HttpRespuesta<any>) => {
        if (respuesta.mensaje === MensajesRespuestaAutenticacion.InicioSesionCorrecto || (respuesta.mensaje === MensajesRespuestaAutenticacion.ContraseniaProximaVencer && !mostrarMsjContraseniaProxVencer)) {
          const usuario: UsuarioEnSesion = this.obtenerUsuarioDePayload(respuesta.datos.token);
          return this.obtenerPermisos(usuario.idRol).pipe(map((respuestaPermisos: HttpRespuesta<any>) => {
            this.crearSesion(respuesta.datos.token, usuario, respuestaPermisos.datos.permisosUsuario);
            this.paginaCargadaSubject.next(true);
            return MensajesRespuestaAutenticacion.InicioSesionCorrecto;
          }));
        } else if (existeMensajeEnEnum(MensajesRespuestaAutenticacion, respuesta.mensaje)) {
          return of<string>(respuesta.mensaje);
        } else {
          return throwError('Ocurrió un error al intentar iniciar sesión');
        }
      })
    );
  }

  crearSesion(token: string, usuario: UsuarioEnSesion, permisosUsuario: PermisosPorFuncionalidad[]): void {
    this.breadcrumbService.limpiar();
    this.usuarioEnSesionSubject.next(usuario);
    this.permisosUsuarioSubject.next(permisosUsuario);
    localStorage.setItem(SIVIMSS_TOKEN, token);
    this.iniciarTemporizadorSesion();
  }

  obtenerUsuarioDePayload(token: string): UsuarioEnSesion | never {
    const payload: Payload | null = new JwtHelperService().decodeToken<Payload>(token);
    if (payload) {
      return JSON.parse(payload.sub);
    } else {
      throw new Error('Error al intentar obtener el usuario del payload en el token');
    }
  }

  cerrarSesion() {
    this.breadcrumbService.limpiar();
    this.menuSidebarService.limpiarRutaSeleccionada();
    this.usuarioEnSesionSubject.next(null);
    this.permisosUsuarioSubject.next(null);
    localStorage.removeItem(SIVIMSS_TOKEN);
    this.router.navigate(['/inicio-sesion']);
    this.detenerTemporizadorSesion();
  }

  obtenerModulosPorIdRol(idRol: string): Observable<HttpRespuesta<Modulo[]>> {
    //this.httpClient.get<RespuestaHttp<Modulo>>('');
    return of<HttpRespuesta<Modulo[]>>(dummyMenuResponse);
  }

  actualizarContrasenia(usuario: string, contraseniaAnterior: string, contraseniaNueva: string): Observable<HttpRespuesta<any>> {
    //return this.http.post<HttpRespuesta>(`http://localhost:8080/mssivimss-oauth/acceder`, {usuario, contraseniaAnterior, contraseniaNueva})
    return of<HttpRespuesta<any>>(respuestaCambioContrasenia);
  }

  obtenerPermisos(idRol: string) {
    return of<HttpRespuesta<any>>(respuestaPermisosUsuario);
  }

  existeFuncionalidadConPermiso(idFuncionalidad: string, idPermiso: string): boolean {
    const permisosPorFuncionalidad: PermisosPorFuncionalidad[] | null = this.permisosUsuarioSubject.getValue();
    if (permisosPorFuncionalidad) {
      const funcionalidadEncontrada: PermisosPorFuncionalidad | undefined = permisosPorFuncionalidad.find((permisosPorFuncionalidad: PermisosPorFuncionalidad) => permisosPorFuncionalidad.idFuncionalidad === idFuncionalidad);
      if (funcionalidadEncontrada) {
        const permisoEncontrado: Permiso | undefined = funcionalidadEncontrada.permisos.find((permiso: Permiso) => permiso.idPermiso === idPermiso);
        if (permisoEncontrado) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }

  iniciarTemporizadorSesion() {
    this.subsSesionInactivaTemporizador = this.controladorInactividadUsuarioService
      .startWatching(this.tiempoMaximoInactividad)
      .subscribe((estaElUsuarioInactivo: boolean) => {
        if (estaElUsuarioInactivo) {
          this.cerrarSesion();
        }
      });
  }

  detenerTemporizadorSesion() {
    this.controladorInactividadUsuarioService.stopTimer();
    if (this.subsSesionInactivaTemporizador) {
      this.subsSesionInactivaTemporizador.unsubscribe();
    }
  }

  validarCodigoRestablecerContrasenia(usuario: string, codigo: string): Observable<string> {
    //return this.http.post<HttpRespuesta>(`http://localhost:8080/mssivimss-oauth/contrasenia/valida-codigo`, {usuario,codigo})
    return of<HttpRespuesta<any>>(respCodigoCorrecto).pipe(
      concatMap((respuesta: HttpRespuesta<any>) => {
        if (existeMensajeEnEnum(MensajesRespuestaCodigo, respuesta.mensaje)) {
          return of<string>(respuesta.mensaje);
        } else {
          return throwError('Ocurrió un error al intentar validar el código para recuperar contraseña');
        }
      })
    );
  }

  generarCodigoRestablecerContrasenia(usuario: string): Observable<HttpRespuesta<any>> {
    //return this.http.post<HttpRespuesta>(`http://localhost:8080/mssivimss-oauth/contrasenia/genera-codigo`, {usuario})
    return of<HttpRespuesta<any>>(respCodigoRestablecerContrasenia);
  }


}
