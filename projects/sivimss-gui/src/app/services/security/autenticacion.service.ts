import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {Usuario} from "projects/sivimss-gui/src/app/models/usuario.interface";



export const TRANSPORTES_TOKEN = "transportes_token";
export const TRANSPORTES_USUARIO = "transportes_usuario";

@Injectable()
export class AutenticacionService {

  private usuarioSubject = new BehaviorSubject<Usuario >(null);
  usuario$: Observable<Usuario> = this.usuarioSubject.asObservable();
  estaLogueado$: Observable<boolean>;
  noEstaLogueado$: Observable<boolean>;
  subsSesionInactivaTemporizador: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router,
    private controladorInactividadUsuarioService: BnNgIdleService,
    // @Inject(TIEMPO_MAXIMO_INACTIVIDAD_PARA_CERRAR_SESION) private tiempoMaximoInactividad: number
  ) {

    // this.estaLogueado$ = this.usuario$.pipe(map(usuario => !!usuario));
    // this.noEstaLogueado$ = this.estaLogueado$.pipe(map(estaLogueado => !estaLogueado));
    // const usuario = localStorage.getItem(TRANSPORTES_USUARIO);
    // if (usuario) {
    //   this.usuarioSubject.next(JSON.parse(usuario));
     // this.iniciarTemporizadorSesion();
    // }
  }

  estaUsuarioLogueado() {
    return !!this.usuarioSubject.getValue();
  }

  // iniciarSesion(usuario: string, password: string): Observable<any> {
  //   return this.http.post<any>(`${environment.api.mssintetransOauth}/login`, { usuario, password })
  //     .pipe(
  //       tap(respuesta => {
  //         if (respuesta.data) {
  //           let usuario: Usuario = {
  //             matricula: respuesta.data.datosUsuario.matricula,
  //             nombreUsuario: respuesta.data.datosUsuario.nombreUsuario,
  //             ooad: respuesta.data.datosUsuario.ooad,
  //             rol: respuesta.data.datosUsuario.rol,
  //             menu: respuesta.data.menu
  //           };
  //           this.usuarioSubject.next(usuario);
  //           localStorage.setItem(TRANSPORTES_USUARIO, JSON.stringify(usuario));
  //           localStorage.setItem(TRANSPORTES_TOKEN, respuesta.data.token);
  //           this.iniciarTemporizadorSesion();
  //         }
  //       }),
  //     );
  // }

  // validarMatricula(matricula: string): Observable<any> {
  //   return this.http.post<any>(`${environment.api.mssintetransOauth}/`, {
  //     usuario: matricula
  //   });
  // }

  // actualizarContrasena(idUsuario: string, nuevaContrasena: string, confirmacionContrasena: string): Observable<any> {
  //   return this.http.put<any>(`${environment.api.mssintetransOauth}/`, {
  //     idUsuario,
  //     password: nuevaContrasena,
  //     verificarPassword: confirmacionContrasena
  //   });
  // }

  cerrarSesion() {
    this.usuarioSubject.next(null);
    localStorage.removeItem(TRANSPORTES_USUARIO);
    localStorage.removeItem(TRANSPORTES_TOKEN);
    this.router.navigateByUrl('/inicio-sesion');
    this.detenerTemporizadorSesion();
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

  detenerTemporizadorSesion() {
    this.controladorInactividadUsuarioService.stopTimer();
    if (this.subsSesionInactivaTemporizador) {
      this.subsSesionInactivaTemporizador.unsubscribe();
    }
  }

}
