import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from "projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service";
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

  form!: FormGroup;
  formRestContraUsuario!: FormGroup;
  formRestContraCodigo!: FormGroup;

  mostrarModalPreActivo: boolean = false;

  modales = {
    requiereCambioContrasena: false,
    cuentaDesactivada: false,
    restablecerContrasena: false,
    intentosAgotados: false
  };

  pasoRestablecerContrasena: number = 1;

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

  acceder() {
    if (this.form.invalid) {
      return;
    }
    const {usuario, contrasenia} = this.form.value;
    this.loaderService.activar();
    this.autenticacionService.iniciarSesion(usuario, contrasenia)
      .pipe(
        finalize(() => this.loaderService.desactivar())
      ).subscribe(
      (respuesta: string) => {
        switch (respuesta) {
          case 'OK':
            this.router.navigate(["/inicio"]);
            break;
          case 'CONTRASENIA_PROXIMA_VENCER':
            break;
          case 'CONTRASENIA_INCORRECTA':
            break;
          case 'INTENTOS_FALLIDOS':
            break;
          case 'CONTRASENIA_VENCIDA':
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

  cerrarModlRestablecerCont() {
    this.modales.restablecerContrasena = false;
    this.pasoRestablecerContrasena = 1;
  }

  mostrarAlerta() {
    this.alertaService.mostrar(TipoAlerta.Exito, 'Mensaje de prueba');
  }

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
