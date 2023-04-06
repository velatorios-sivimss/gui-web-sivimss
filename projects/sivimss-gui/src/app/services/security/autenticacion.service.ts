import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { HttpRespuesta } from "projects/sivimss-gui/src/app/models/http-respuesta.interface";
import { BreadcrumbService } from "projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service";
import { MenuSidebarService } from "projects/sivimss-gui/src/app/shared/sidebar/services/menu-sidebar.service";
import { SIVIMSS_TOKEN } from "projects/sivimss-gui/src/app/utils/constantes";
import { dummyMenuResponse } from "projects/sivimss-gui/src/app/utils/menu-dummy";
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { concatMap, map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";


interface Payload {
  exp: number;
  iat: number;
  sub: string;
}

export interface Usuario {
  idVelatorio: string;
  idRol: string;
  desRol: string;
  idDelegacion: string;
  idOficina: string;
  idUsuario: string;
  cveUsuario: string;
  cveMatricula: string;
  nombre: string;
  curp: string;
}

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

const respuestaOk = {
  error: false,
  codigo: 200,
  mensaje: "Exito",
  datos: {
    "contrasenaProximaVencer": false,
    "token": "eyJzaXN0ZW1hIjoic2l2aW1zcyIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJ7XCJpZFZlbGF0b3Jpb1wiOlwiMVwiLFwiaWRSb2xcIjpcIjFcIixcImRlc1JvbFwiOlwiQ09PUkRJTkFET1IgREUgQ0VOVFJcIixcImlkRGVsZWdhY2lvblwiOlwiMVwiLFwiaWRPZmljaW5hXCI6XCIxXCIsXCJpZFVzdWFyaW9cIjpcIjFcIixcImN2ZVVzdWFyaW9cIjpcIjFcIixcImN2ZU1hdHJpY3VsYVwiOlwiMVwiLFwibm9tYnJlXCI6XCIxIDEgMVwiLFwiY3VycFwiOlwiMVwifSIsImlhdCI6MTY4MDAyNDAyMCwiZXhwIjoxNjgwNjI4ODIwfQ.959sn4V9p9tjhk0s4-dS95d4E2SjJ_gPndbewLWM-Wk"
  }
};

const respuestaPreActivo = {
  "error": false,
  "codigo": 200,
  "mensaje": "USUARIO_PREACTIVO",
  "datos": {
    "preActivo": true
  }
};

const respuestaCambioContrasenia = {
  "error": false,
  "codigo": 200,
  "mensaje": "Exito",
  "datos": true
};


@Injectable()
export class AutenticacionService {

  private usuarioEnSesionSubject: BehaviorSubject<Usuario | null> = new BehaviorSubject<Usuario | null>(null);
  usuarioEnSesion$: Observable<Usuario | null> = this.usuarioEnSesionSubject.asObservable();
  existeUnaSesion$!: Observable<boolean>;

  //subsSesionInactivaTemporizador!: Subscription;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private menuSidebarService: MenuSidebarService,
    private breadcrumbService: BreadcrumbService
    // private controladorInactividadUsuarioService: BnNgIdleService,
    // @Inject(TIEMPO_MAXIMO_INACTIVIDAD_PARA_CERRAR_SESION) private tiempoMaximoInactividad: number
  ) {
    this.existeUnaSesion$ = this.usuarioEnSesion$.pipe(
      map((usuario: Usuario | null) => !!usuario)
    );
    const usuario: Usuario | null = this.obtenerUsuarioDePayload(localStorage.getItem(SIVIMSS_TOKEN) as string);
    if (usuario) {
      this.usuarioEnSesionSubject.next(usuario);
      //this.iniciarTemporizadorSesion();
    }
  }

  iniciarSesion(usuario: string, contrasenia: string): Observable<any> {
    //this.http.post<any>(`http://localhost:8080/mssivimss-oauth/acceder`, {usuario, contrasena})
    return of<HttpRespuesta<any>>(respuestaOk).pipe(
      concatMap((respuesta: HttpRespuesta<any>) => {
        if (respuesta.datos?.token && !respuesta.datos?.contraseniaProximaVencer) {
          this.crearSesion(respuesta.datos.token);
          return of('OK');
        } else if (respuesta.datos?.contraseniaProximaVencer) {
          return of('CONTRASENIA_PROXIMA_VENCER');
        } else if (respuesta.mensaje === 'CONTRASENIA_INCORRECTA') {
          return of('CONTRASENIA_INCORRECTA');
        } else if (respuesta.mensaje === 'INTENTOS_FALLIDOS') {
          return of('INTENTOS_FALLIDOS');
        } else if (respuesta.mensaje === 'FECHA_CONTRASENIA_VENCIDA') {
          return of('CONTRASENIA_VENCIDA');
        } else if (respuesta.datos?.preActivo) {
          return of('USUARIO_PREACTIVO');
        } else {
          return throwError('Ocurrió un error al intentar iniciar sesión');
        }
      })
    );
  }

  crearSesion(token: string): void | never {
    const usuario: Usuario | null = this.obtenerUsuarioDePayload(token);
    if (usuario) {
      this.usuarioEnSesionSubject.next(usuario);
      localStorage.setItem(SIVIMSS_TOKEN, token);
    } else {
      throw new Error('Error al intentar obtener el usuario del payload en el token');
    }
  }

  obtenerUsuarioDePayload(token: string): Usuario | null {
    const jwtHelperService: JwtHelperService = new JwtHelperService();
    const payload: Payload | null = jwtHelperService.decodeToken<Payload>(token);
    return payload ? JSON.parse(payload.sub) : null;
  }

  cerrarSesion() {
    this.breadcrumbService.limpiar();
    this.menuSidebarService.limpiarRutaSeleccionada();
    this.usuarioEnSesionSubject.next(null);
    localStorage.removeItem(SIVIMSS_TOKEN);
    this.router.navigate(['/inicio-sesion']);
    //this.detenerTemporizadorSesion();
  }

  obtenerModulosPorIdRol(idRol: string): Observable<HttpRespuesta<Modulo[]>> {
    //this.httpClient.get<RespuestaHttp<Modulo>>('');
    return of<HttpRespuesta<Modulo[]>>(dummyMenuResponse);
  }

  actualizarContrasenia(usuario: string, contraseniaAnterior: string, contraseniaNueva: string): Observable<HttpRespuesta<any>> {
    //return this.http.post<HttpRespuesta>(`http://localhost:8080/mssivimss-oauth/acceder`, {usuario, contraseniaAnterior, contraseniaNueva})
    return of<HttpRespuesta<any>>(respuestaCambioContrasenia);
  }

  // iniciarTemporizadorSesion() {
  //   this.subsSesionInactivaTemporizador = this.controladorInactividadUsuarioService
  //     .startWatching(this.tiempoMaximoInactividad)
  //     .subscribe((estaElUsuarioInactivo: boolean) => {
  //       if (estaElUsuarioInactivo) {
  //         this.cerrarSesion();
  //       }
  //     });
  // }

  // detenerTemporizadorSesion() {
  //   this.controladorInactividadUsuarioService.stopTimer();
  //   if (this.subsSesionInactivaTemporizador) {
  //     this.subsSesionInactivaTemporizador.unsubscribe();
  //   }
  // }

}
