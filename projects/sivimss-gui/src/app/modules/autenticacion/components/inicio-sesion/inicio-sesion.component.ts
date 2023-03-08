import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from "projects/sivimss-gui/src/app/shared/loader/services/loader.service";
import { AutenticacionService } from "projects/sivimss-gui/src/app/services/security/autenticacion.service";
import { AlertaService, TipoAlerta } from "projects/sivimss-gui/src/app/shared/alerta/services/alerta.service";

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {

  form!: FormGroup;
  formRestContraUsuario!: FormGroup;
  formRestContraCodigo!:FormGroup;

  modales = {
    cambiarContrasena: false,
    requiereCambioContrasena: false,
    cuentaDesactivada: false,
    restablecerContrasena: false,
    intentosAgotados:false
  };

  pasoRestablecerContrasena: number = 1;

  usuarioRestablecer!: string;

  constructor(
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private autenticacionService: AutenticacionService,
    private router: Router,
    private alertaService: AlertaService
  ) {
  }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });

    this.formRestContraUsuario = this.formBuilder.group({
      usuario: ['', Validators.required],
    });

    this.formRestContraCodigo = this.formBuilder.group({
      codigo: ['', Validators.required],
    });
  }

  iniciarSesion() {
    // let usuario: string = this.form.get('usuario')?.value;
    // let password: string = this.form.get('password')?.value;
    // this.loaderService.activar();
    // this.autenticacionService.iniciarSesion(usuario, password).subscribe(
    //   (respuesta) => {
    //     this.loaderService.desactivar();
    //     if (respuesta.data) {
    //       this.router.navigateByUrl('/inicio');
    //     } else if (respuesta.mensaje === 'usuario-pasword') {
    //       this.form.reset();
    //       this.alertaFlotanteService.mostrar(TipoAlerta.Error, 'Credenciales incorrectas');
    //     } else if (respuesta.mensaje === 'bloqueado') {
    //       this.form.reset();
    //       this.alertaFlotanteService.mostrar(TipoAlerta.Error, 'Excediste el número de intentos permitidos, el usuario fue bloqueado.');
    //     } else if (respuesta.mensaje === 'fecha_expiro') {
    //       this.form.reset();
    //       this.alertaFlotanteService.mostrar(TipoAlerta.Error, 'La contraseña ya expiró, por favor actualízala para iniciar sesión.');
    //     }
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.error(error);
    //     this.loaderService.desactivar();
    //   }
    // );
  }

  cerrarModlRestablecerCont(){
    this.modales.restablecerContrasena = false;
    this.pasoRestablecerContrasena = 1;
  }

  mostrarAlerta() {
    this.alertaService.mostrar(TipoAlerta.Exito, 'Mensaje de prueba', true);
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
