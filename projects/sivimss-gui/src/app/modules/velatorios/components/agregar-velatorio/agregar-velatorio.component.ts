import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogRef} from "primeng-lts/dynamicdialog";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {Velatorio} from "../../models/velatorio.interface";
import {CATALOGOS_DUMMIES} from "../../constants/dummies";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertaService, TipoAlerta} from "../../../../shared/alerta/services/alerta.service";
import {VelatorioService} from "../../services/velatorio.service";
import {RespuestaModalUsuario} from "../../../usuarios/models/respuestaModal.interface";

type NuevoVelatorio = Omit<Velatorio, "desMunicipio" | "desEstado" | "idVelatorio" | "salasEmbalsamamiento" |
  "salasCremacion" | "capillas" | "administrador"  | "desColonia" | "estatus" | "desDelegacion" | "cveCp">

@Component({
  selector: 'app-agregar-velatorio',
  templateUrl: './agregar-velatorio.component.html',
  styleUrls: ['./agregar-velatorio.component.scss']
})
export class AgregarVelatorioComponent implements OnInit {

  indice: number = 0;

  velatorioForm!: FormGroup;

  asignaciones: TipoDropdown[] = CATALOGOS_DUMMIES;
  nuevoVelatorio!: Velatorio;

  constructor(private alertaService: AlertaService,
              private formBuilder: FormBuilder,
              public ref: DynamicDialogRef,
              private velatorioService: VelatorioService) {
  }

  ngOnInit(): void {
    this.inicializarFormVelatorio();
  }

  inicializarFormVelatorio(): void {
    this.velatorioForm = this.formBuilder.group({
      id: [{value: null, disabled: true}],
      nombre: [{value: null, disabled: false}, [Validators.required]],
      administrador: [{value: null, disabled: true}, [Validators.required]],
      responsableSanitario: [{value: null, disabled: false}, [Validators.required]],
      capillasVelacion: [{value: 0, disabled: true}],
      salasCremacion: [{value: 0, disabled: true}],
      salasEmbalsamamiento: [{value: 0, disabled: true}],
      asignacion: [{value: null, disabled: false}, [Validators.required]],
      codigoPostal: [{value: null, disabled: false}, [Validators.required]],
      direccionCalle: [{value: null, disabled: false}, [Validators.required]],
      numeroExterior: [{value: null, disabled: false}, [Validators.required]],
      colonia: [{value: null, disabled: false}, [Validators.required]],
      municipio: [{value: null, disabled: true}],
      estado: [{value: null, disabled: true}],
      telefono: [{value: null, disabled: false}, [Validators.required]],
      estatus: [{value: true, disabled: false}, [Validators.required]],
    });
  }

  guardarVelatorio(): void {
    if (this.indice === 0) {
      this.indice++;
      this.nuevoVelatorio = {...this.velatorioForm.value};
      return;
    }
    const respuesta: RespuestaModalUsuario = {mensaje: "Alta satisfactoria", actualizar: true}
    const velatorio: NuevoVelatorio = this.crearVelatorio();
    const solicitudVelatorio: string = JSON.stringify(velatorio);
    this.velatorioService.guardar(velatorio).subscribe(
      () => {
        this.ref.close(respuesta);
      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar(TipoAlerta.Error, 'Alta incorrecta');
        console.error("ERROR: ", error);
      }
    );
  }

  crearVelatorio(): NuevoVelatorio {
    return {
      // colonia: this.velatorioForm.get("colonia")?.value,
      cveAsignacion: 0,
      desCalle: this.velatorioForm.get("direccionCalle")?.value,
      idCodigoPostal: +this.velatorioForm.get("codigoPostal")?.value,
      nomRespoSanitario: this.velatorioForm.get("responsableSanitario")?.value,
      nomVelatorio: this.velatorioForm.get("nombre")?.value,
      numExterior: +this.velatorioForm.get("numeroExterior")?.value,
      numTelefono: this.velatorioForm.get("telefono")?.value,
      idDelegacion : 30
    }
  }

  cancelarCreacion(): void {
    if (this.indice === 1) {
      this.indice--;
      return;
    }
    this.ref.close();
  }

  get formV() {
    return this.velatorioForm.controls;
  }
}
