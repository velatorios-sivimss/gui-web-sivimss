import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from "projects/sivimss-gui/src/app/services/autenticacion.service";
import { AlertaService } from "projects/sivimss-gui/src/app/shared/alerta/services/alerta.service";

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss']
})
export class RecuperarContrasenaComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private autenticacionService: AutenticacionService,
    private alertaFlotantService: AlertaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      matricula: ['', Validators.required]
    });
  }

  recuperarContrasena() {
    // let matricula = this.form.get('matricula')?.value;
    // this.autenticacionService.validarMatricula(matricula).subscribe(
    //   (respuesta: any) => {
    //     if (respuesta.mensaje === 'usuarioInvalido') {
    //       this.alertaFlotantService.mostrar(TipoAlerta.Info, 'Usuario inválido');
    //     } else if (respuesta.mensaje === 'Exito') {
    //       this.router.navigate(['../actualizar-contrasenia', respuesta.idUsuario], { relativeTo: this.activatedRoute });
    //     }
    //   },
    //   (httpErrorResponse: HttpErrorResponse) => {
    //     console.error(httpErrorResponse);
    //     this.alertaFlotantService.mostrar(TipoAlerta.Error, 'Ocurrió un error al consultar la matrícula');
    //   }
    // )
  }

  get f() {
    return this.form.controls;
  }

}
