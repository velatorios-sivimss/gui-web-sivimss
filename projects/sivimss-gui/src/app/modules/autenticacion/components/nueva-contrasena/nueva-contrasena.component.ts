import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from "projects/sivimss-gui/src/app/services/security/autenticacion.service";
import { AlertaService } from "projects/sivimss-gui/src/app/shared/alerta/services/alerta.service";

@Component({
  selector: 'app-nueva-contrasena',
  templateUrl: './nueva-contrasena.component.html',
  styleUrls: ['./nueva-contrasena.component.scss']
})
export class NuevaContrasenaComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private autenticacionService: AutenticacionService,
    // private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertaService: AlertaService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      matricula: ['', Validators.required],
      nuevaContrasena: ['', Validators.required],
      confirmacionContrasena: ['', Validators.required]
    });
  }

  actualizarContrasena(): void {
    // let matricula = this.form.get('matricula')?.value;
    // // let idUsuario: any = this.activatedRoute.snapshot.paramMap.get('idUsuario');
    // let nuevaContrasena: string = this.form.get('nuevaContrasena')?.value;
    // let confirmacionContrasena: string = this.form.get('confirmacionContrasena')?.value;
    // this.autenticacionService.validarMatricula(matricula).subscribe(
    //   (respuesta: any) => {
    //     if (respuesta.mensaje === 'usuarioInvalido') {
    //       this.alertasFlotantesService.mostrar('info', 'Usuario inválido');
    //     } else if (respuesta.mensaje === 'Exito') {
    //       if (nuevaContrasena === confirmacionContrasena) {
    //         this.autenticacionService.actualizarContrasena(respuesta.idUsuario, nuevaContrasena, confirmacionContrasena).subscribe(
    //           (respuesta: any) => {
    //             if (respuesta.mensaje === 'Exito') {
    //               this.alertasFlotantesService.mostrar('exito', 'La contraseña ha sido actualizada exitosamente.');
    //               this.router.navigateByUrl('/inicio-sesion');
    //             } else if (respuesta.error) {
    //               this.alertasFlotantesService.mostrar('error', 'Ocurrió un error al intentar actualizar la contraseña.');
    //               this.form.reset();
    //             }
    //           },
    //           (httpErrorResponse: HttpErrorResponse) => {
    //             console.error(httpErrorResponse);
    //             this.form.reset();
    //             this.alertasFlotantesService.mostrar('error', 'Ocurrió un error al consultar la matrícula');
    //           }
    //         )
    //       } else {
    //         this.alertasFlotantesService.mostrar('error', 'Las contraseñas no coinciden.');
    //       }
    //       // this.router.navigate(['../nueva-contrasena', respuesta.idUsuario], { relativeTo: this.activatedRoute });
    //     }
    //   },
    //   (httpErrorResponse: HttpErrorResponse) => {
    //     console.error(httpErrorResponse);
    //     this.alertasFlotantesService.mostrar('error', 'Ocurrió un error al consultar la matrícula');
    //   }
    // );

  }

  get f() {
    return this.form.controls;
  }
}
