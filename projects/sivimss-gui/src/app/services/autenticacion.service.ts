import { HttpClient } from '@angular/common/http';
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
import { MensajesRespuestaAutenticacion } from "projects/sivimss-gui/src/app/utils/mensajes-respuesta-autenticacion.enum";
import { dummyMenuResponse } from "projects/sivimss-gui/src/app/utils/menu-dummy";
import { TIEMPO_MAXIMO_INACTIVIDAD_PARA_CERRAR_SESION } from "projects/sivimss-gui/src/app/utils/tokens";
import { BehaviorSubject, Observable, of, Subscription, throwError } from 'rxjs';
import { concatMap, first, map } from "rxjs/operators";
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
    "token": "eyJzaXN0ZW1hIjoic2l2aW1zcyIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJ7XCJpZFZlbGF0b3Jpb1wiOlwiMVwiLFwiaWRSb2xcIjpcIjFcIixcImRlc1JvbFwiOlwiQ09PUkRJTkFET1IgREUgQ0VOVFJcIixcImlkRGVsZWdhY2lvblwiOlwiMVwiLFwiaWRPZmljaW5hXCI6XCIxXCIsXCJpZFVzdWFyaW9cIjpcIjFcIixcImN2ZVVzdWFyaW9cIjpcIjFcIixcImN2ZU1hdHJpY3VsYVwiOlwiMVwiLFwibm9tYnJlXCI6XCIxIDEgMVwiLFwiY3VycFwiOlwiMVwifSIsImlhdCI6MTY4MDAyNDAyMCwiZXhwIjoxNjgwNjI4ODIwfQ.959sn4V9p9tjhk0s4-dS95d4E2SjJ_gPndbewLWM-Wk"
  }
};

const respuestaContraseniaProxVencer = {
  error: false,
  codigo: 200,
  mensaje: "CONTRASENIA_PROXIMA_VENCER",
  datos: {
    "token": "eyJzaXN0ZW1hIjoic2l2aW1zcyIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJ7XCJpZFZlbGF0b3Jpb1wiOlwiMVwiLFwiaWRSb2xcIjpcIjFcIixcImRlc1JvbFwiOlwiQ09PUkRJTkFET1IgREUgQ0VOVFJcIixcImlkRGVsZWdhY2lvblwiOlwiMVwiLFwiaWRPZmljaW5hXCI6XCIxXCIsXCJpZFVzdWFyaW9cIjpcIjFcIixcImN2ZVVzdWFyaW9cIjpcIjFcIixcImN2ZU1hdHJpY3VsYVwiOlwiMVwiLFwibm9tYnJlXCI6XCIxIDEgMVwiLFwiY3VycFwiOlwiMVwifSIsImlhdCI6MTY4MDAyNDAyMCwiZXhwIjoxNjgwNjI4ODIwfQ.959sn4V9p9tjhk0s4-dS95d4E2SjJ_gPndbewLWM-Wk"
  }
};

const respuestaPreActivo = {
  "error": false,
  "codigo": 200,
  "mensaje": "USUARIO_PREACTIVO",
  "datos":null
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
      }
    ]
  }
};


@Injectable()
export class AutenticacionService {

  usuarioEnSesionSubject: BehaviorSubject<UsuarioEnSesion | null> = new BehaviorSubject<UsuarioEnSesion | null>(null);
  usuarioEnSesion$: Observable<UsuarioEnSesion | null> = this.usuarioEnSesionSubject.asObservable();

  permisosUsuarioSubject: BehaviorSubject<PermisosPorFuncionalidad[]> = new BehaviorSubject<PermisosPorFuncionalidad[]>([]);
  permisosUsuario$: Observable<PermisosPorFuncionalidad[]> = this.permisosUsuarioSubject.asObservable();

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
        this.obtenerPermisos(usuario.idRol).pipe(first()).subscribe((respuesta: HttpRespuesta<any>) => {
          this.usuarioEnSesionSubject.next(usuario);
          this.permisosUsuarioSubject.next(respuesta.datos.permisosUsuario);
          this.iniciarTemporizadorSesion();
        });
      } catch (ex) {
        this.cerrarSesion();
      }
    }
  }

  iniciarSesion(usuario: string, contrasenia: string, mostrarMsjContraseniaProxVencer: boolean = true): Observable<any> {
    //this.http.post<any>(`http://localhost:8080/mssivimss-oauth/acceder`, {usuario, contrasena})
    return of<HttpRespuesta<any>>(respuestaInicioSesionCorrecto).pipe(
      concatMap((respuesta: HttpRespuesta<any>) => {
        if (respuesta.mensaje === MensajesRespuestaAutenticacion.InicioSesionCorrecto || (respuesta.mensaje === MensajesRespuestaAutenticacion.ContraseniaProximaVencer && !mostrarMsjContraseniaProxVencer)) {
          const usuario: UsuarioEnSesion = this.obtenerUsuarioDePayload(respuesta.datos.token);
          return this.obtenerPermisos(usuario.idRol).pipe(map((respuestaPermisos: HttpRespuesta<any>) => {
            this.crearSesion(respuesta.datos.token, usuario, respuestaPermisos.datos.permisosUsuario);
            return MensajesRespuestaAutenticacion.InicioSesionCorrecto;
          }));
        } else if (respuesta.mensaje === MensajesRespuestaAutenticacion.ContraseniaProximaVencer) {
          return of(MensajesRespuestaAutenticacion.ContraseniaProximaVencer);
        } else if (respuesta.mensaje === MensajesRespuestaAutenticacion.CredencialesIncorrectas) {
          return of(MensajesRespuestaAutenticacion.CredencialesIncorrectas);
        } else if (respuesta.mensaje === MensajesRespuestaAutenticacion.CantidadMaximaIntentosFallidos) {
          return of(MensajesRespuestaAutenticacion.CantidadMaximaIntentosFallidos);
        } else if (respuesta.mensaje === MensajesRespuestaAutenticacion.FechaContraseniaVencida) {
          return of(MensajesRespuestaAutenticacion.FechaContraseniaVencida);
        } else if (respuesta.mensaje === MensajesRespuestaAutenticacion.UsuarioPreactivo) {
          return of(MensajesRespuestaAutenticacion.UsuarioPreactivo);
        } else {
          return throwError('Ocurrió un error al intentar iniciar sesión');
        }
      })
    );
  }

  crearSesion(token: string, usuario: UsuarioEnSesion, permisosUsuario: PermisosPorFuncionalidad[]): void {
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
    this.permisosUsuarioSubject.next([]);
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

  existeFuncionalidadConPermiso(idFuncionalidad: string, idPermiso: string) {
    const permisosPorFuncionalidad: PermisosPorFuncionalidad[] = this.permisosUsuarioSubject.getValue();
    const funcionalidadEncontrada: PermisosPorFuncionalidad | undefined = permisosPorFuncionalidad.find((permisosPorFuncionalidad: PermisosPorFuncionalidad) => permisosPorFuncionalidad.idFuncionalidad === idFuncionalidad);
    if (funcionalidadEncontrada) {
      const permisoEncontrado: Permiso | undefined = funcionalidadEncontrada.permisos.find((permiso: Permiso) => permiso.idPermiso === idPermiso);
      if (permisoEncontrado) {
        return true;
      }
    }
    return false;
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

}
