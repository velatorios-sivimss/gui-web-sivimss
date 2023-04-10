import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from "projects/sivimss-gui/src/app/shared/loader/services/loader.service";
import { AutenticacionService } from "projects/sivimss-gui/src/app/services/security/autenticacion.service";
import { AlertaService, TipoAlerta } from "projects/sivimss-gui/src/app/shared/alerta/services/alerta.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {

  readonly NO_MOSTRAR_MSJ_CONTRASENIA_PROX_VENCER: boolean = false;
  readonly SEGUNDOS_TEMPORIZADOR_INTENTOS: number = 300;

  minutosTemporizadorIntentos: string = '';
  segundosTemporizadorIntentos: string = '';

  form!: FormGroup;
  formRestContraUsuario!: FormGroup;
  formRestContraCodigo!: FormGroup;

  mostrarModalPreActivo: boolean = false;
  mostrarModalContraseniaProxVencer: boolean = false;
  mostrarModalFechaContraseniaVencida: boolean = false;
  mostrarModalIntentosFallidos: boolean = false;


  //pasoRestablecerContrasena: number = 1;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loaderService: LoaderService,
    private readonly autenticacionService: AutenticacionService,
    private readonly router: Router,
    private readonly alertaService: AlertaService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });

    this.formRestContraUsuario = this.formBuilder.group({
      usuario: ['', Validators.required],
    });

    this.formRestContraCodigo = this.formBuilder.group({
      codigo: ['', Validators.required],
    });
  }

  acceder(mostrarMsjContraseniaProxVencer: boolean = true) {
    if (this.form.invalid) {
      return;
    }
    const {usuario, contrasenia} = this.form.value;
    this.loaderService.activar();
    this.autenticacionService.iniciarSesion(usuario, contrasenia, mostrarMsjContraseniaProxVencer)
      .pipe(
        finalize(() => this.loaderService.desactivar())
      ).subscribe(
      (respuesta: string) => {
        switch (respuesta) {
          case 'OK':
            this.router.navigate(["/inicio"]);
            break;
          case 'CONTRASENIA_PROXIMA_VENCER':
            this.mostrarModalContraseniaProxVencer = true;
            break;
          case 'CONTRASENIA_INCORRECTA':
            this.form.get('contrasenia')?.reset();
            this.alertaService.mostrar(TipoAlerta.Error, 'Usuario o contraseña incorrecta');
            break;
          case 'INTENTOS_FALLIDOS':
            this.mostrarModalIntentosFallidos = true;
            this.empezarTemporizadorPorExcederIntentos();
            break;
          case 'FECHA_CONTRASENIA_VENCIDA':
            this.mostrarModalFechaContraseniaVencida = true;
            break;
          case 'USUARIO_PREACTIVO':
            this.mostrarModalPreActivo = true;
            break;
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.alertaService.mostrar(TipoAlerta.Error, 'Ha ocurrido un error');
      }
    );
  }

  actualizarContrasenia() {
    this.mostrarModalPreActivo = false;
    this.router.navigate(["actualizar-contrasenia"], {
      relativeTo: this.activatedRoute
    });
  }

  empezarTemporizadorPorExcederIntentos() {

    let duracionEnSegundos = this.existeTemporizadorEnCurso() ? Number(localStorage.getItem('segundos_temporizador_intentos_sivimss')) : this.SEGUNDOS_TEMPORIZADOR_INTENTOS;
    let refTemporador = setInterval(() => {
      let minutos: string | number = Math.floor(duracionEnSegundos / 60);
      let segundos: string | number = duracionEnSegundos % 60;
      minutos = minutos < 10 ? '0' + minutos : minutos;
      segundos = segundos < 10 ? '0' + segundos : segundos;
      this.minutosTemporizadorIntentos = minutos as string;
      this.segundosTemporizadorIntentos = segundos as string;
      duracionEnSegundos--;
      localStorage.setItem('segundos_temporizador_intentos_sivimss', String(duracionEnSegundos));
      if (duracionEnSegundos < 0) {
        clearInterval(refTemporador);
        localStorage.removeItem('segundos_temporizador_intentos_sivimss');
      }
      // else {
      //   console.log(`${minutos}:${segundos}`);
      // }
    }, 1000);

  }

  existeTemporizadorEnCurso(): boolean {
    return localStorage.getItem('segundos_temporizador_intentos_sivimss') !== null;
  }

  // cerrarModlRestablecerCont() {
  //   this.modales.restablecerContrasena = false;
  //   this.pasoRestablecerContrasena = 1;
  // }

  get f() {
    return this.form.controls;
  }

  get frcu() {
    return this.formRestContraUsuario.controls;
  }

  get frcc() {
    return this.formRestContraCodigo.controls;
  }

}
