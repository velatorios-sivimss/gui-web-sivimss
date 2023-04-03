import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { dummyMenuResponse } from "projects/sivimss-gui/src/app/services/security/menu-dummy";
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

export const SIVIMSS_TOKEN: string = "sivimss_token";
export const SIVIMSS_USUARIO: string = "sivimss_usuario";

export interface RespuestaHttp<T> {
  error: boolean;
  codigo: number;
  mensaje: string;
  datos: T;
}

interface RespuestaUsuarioActivo {
  contrasenaProximaVencer: boolean;
  token: string;
}

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
  idTablaMenu: string;
  idTablaPadre: string | null;
  idModulo: string;
  descIcono: string;
  titulo: string;
  modulos: Modulo[] | null;
  activo?:boolean;
}

@Injectable()
export class AutenticacionService {

  private usuarioSubject: BehaviorSubject<Usuario | null> = new BehaviorSubject<Usuario | null>(null);
  usuario$: Observable<Usuario | null> = this.usuarioSubject.asObservable();
  estaLogueado$!: Observable<boolean>;
  noEstaLogueado$!: Observable<boolean>;

  //subsSesionInactivaTemporizador!: Subscription;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    // private controladorInactividadUsuarioService: BnNgIdleService,
    // @Inject(TIEMPO_MAXIMO_INACTIVIDAD_PARA_CERRAR_SESION) private tiempoMaximoInactividad: number
  ) {
    this.estaLogueado$ = this.usuario$.pipe(map((usuario: Usuario | null) => !!usuario));
    this.noEstaLogueado$ = this.estaLogueado$.pipe(map((estaLogueado: boolean) => !estaLogueado));
    const usuario: string | null = localStorage.getItem(SIVIMSS_USUARIO);
    if (usuario) {
      this.usuarioSubject.next(JSON.parse(usuario));
      //this.iniciarTemporizadorSesion();
    }
  }

  estaUsuarioLogueado() {
    return !!this.usuarioSubject.getValue();
  }

  iniciarSesion(usuario: string, contrasena: string): Observable<any> {
    //this.http.post<any>(`http://localhost:8080/mssivimss-oauth/acceder`, {usuario, contrasena})
    return of<RespuestaHttp<RespuestaUsuarioActivo>>({
      error: false,
      codigo: 200,
      mensaje: "Exito",
      datos: {
        "contrasenaProximaVencer": false,
        "token": "eyJzaXN0ZW1hIjoic2l2aW1zcyIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJ7XCJpZFZlbGF0b3Jpb1wiOlwiMVwiLFwiaWRSb2xcIjpcIjFcIixcImRlc1JvbFwiOlwiQ09PUkRJTkFET1IgREUgQ0VOVFJcIixcImlkRGVsZWdhY2lvblwiOlwiMVwiLFwiaWRPZmljaW5hXCI6XCIxXCIsXCJpZFVzdWFyaW9cIjpcIjFcIixcImN2ZVVzdWFyaW9cIjpcIjFcIixcImN2ZU1hdHJpY3VsYVwiOlwiMVwiLFwibm9tYnJlXCI6XCIxIDEgMVwiLFwiY3VycFwiOlwiMVwifSIsImlhdCI6MTY4MDAyNDAyMCwiZXhwIjoxNjgwNjI4ODIwfQ.959sn4V9p9tjhk0s4-dS95d4E2SjJ_gPndbewLWM-Wk"
      }
    }).pipe(
      tap((respuesta: RespuestaHttp<RespuestaUsuarioActivo>) => {
        if (respuesta.datos) {
          const jwtHelperService: JwtHelperService = new JwtHelperService();
          const payload: Payload | null = jwtHelperService.decodeToken<Payload>(respuesta.datos.token);
          const usuario: Usuario = JSON.parse(payload!.sub);
          console.log(usuario);
          this.usuarioSubject.next(usuario);
          localStorage.setItem(SIVIMSS_USUARIO, JSON.stringify(usuario));
          localStorage.setItem(SIVIMSS_TOKEN, respuesta.datos.token);

          //this.iniciarTemporizadorSesion();
        }
      }),
    );
  }

  // actualizarContrasena(idUsuario: string, nuevaContrasena: string, confirmacionContrasena: string): Observable<any> {
  //   return this.http.put<any>(`${environment.api.mssintetransOauth}/`, {
  //     idUsuario,
  //     password: nuevaContrasena,
  //     verificarPassword: confirmacionContrasena
  //   });
  // }

  cerrarSesion() {
    this.usuarioSubject.next(null);
    localStorage.removeItem(SIVIMSS_USUARIO);
    localStorage.removeItem(SIVIMSS_TOKEN);
    this.router.navigateByUrl('/inicio-sesion');
    //this.detenerTemporizadorSesion();
  }

  obtenerModulosPorIdRol(idRol: string): Observable<RespuestaHttp<Modulo[]>> {
    //this.httpClient.get<RespuestaHttp<Modulo>>('');
    return of<RespuestaHttp<Modulo[]>>(dummyMenuResponse);
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
