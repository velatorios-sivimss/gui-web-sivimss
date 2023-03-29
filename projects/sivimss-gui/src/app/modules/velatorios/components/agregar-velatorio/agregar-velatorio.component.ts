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
  "salasCremacion" | "capillas" | "administrador" | "desColonia" | "estatus" | "desDelegacion" | "cveCp">

interface ValorCP {
  idCodigoPostal: number,
  colonia: string,
  municipio: string,
  estado: string
}

@Component({
  selector: 'app-agregar-velatorio',
  templateUrl: './agregar-velatorio.component.html',
  styleUrls: ['./agregar-velatorio.component.scss']
})
export class AgregarVelatorioComponent implements OnInit {

  indice: number = 0;

  velatorioForm!: FormGroup;

  asignaciones: TipoDropdown[] = CATALOGOS_DUMMIES;
  colonias: TipoDropdown[] = [];
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
      idVelatorio: [{value: null, disabled: true}],
      nomVelatorio: [{value: null, disabled: false}, [Validators.required]],
      administrador: [{value: null, disabled: true}, [Validators.required]],
      nomRespoSanitario: [{value: null, disabled: false}, [Validators.required]],
      capillas: [{value: 0, disabled: true},],
      salasCremacion: [{value: 0, disabled: true}],
      salasEmbalsamamiento: [{value: 0, disabled: true}],
      asignacion: [{value: null, disabled: false}, [Validators.required]],
      codigoPostal: [{value: null, disabled: false}, [Validators.required]],
      desCalle: [{value: null, disabled: false}, [Validators.required]],
      numExterior: [{value: null, disabled: false}, [Validators.required]],
      desColonia: [{value: null, disabled: true}, [Validators.required]],
      desMunicipio: [{value: null, disabled: true}],
      desEstado: [{value: null, disabled: true}],
      numTelefono: [{value: null, disabled: false}, [Validators.required]],
      estatus: [{value: true, disabled: false}, [Validators.required]],
    });
  }

  buscarCP(): void {
    const cp = this.velatorioForm.get("codigoPostal")?.value;
    if (!cp) return;
    this.velatorioService.obtenerCP(cp).subscribe(
      (respuesta) => {
        const {datos} = respuesta;
        if (datos.length === 0 || !datos) return;
        const {estado, municipio} = datos[0];
        this.colonias = datos.map((d: ValorCP) => ({value: d.idCodigoPostal, label: d.colonia}))
        this.velatorioForm.get("desMunicipio")?.patchValue(municipio);
        this.velatorioForm.get("desEstado")?.patchValue(estado);
        this.velatorioForm.get("desColonia")?.patchValue("");
        this.velatorioForm.get("desColonia")?.enable()
      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar(TipoAlerta.Error, 'Alta incorrecta');
        console.error("ERROR: ", error);
      }
    );
  }


  guardarVelatorio(): void {
    if (this.indice === 0) {
      this.indice++;
      this.nuevoVelatorio = this.crearVelatorio();
      return;
    }
    const respuesta: RespuestaModalUsuario = {mensaje: "Alta satisfactoria", actualizar: true}
    const velatorio: NuevoVelatorio = this.crearNuevoVelatorio();
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

  crearVelatorio(): Velatorio {
    const cpId = this.velatorioForm.get("desColonia")?.value;
    const colonia: string = this.colonias.find(c => c.value === cpId)?.label || "";
    return {
      administrador: "",
      capillas: 0,
      cveAsignacion: 0,
      cveCp: this.velatorioForm.get("codigoPostal")?.value,
      desCalle: this.velatorioForm.get("desCalle")?.value,
      desColonia: colonia,
      desDelegacion: "",
      desEstado: this.velatorioForm.get("desEstado")?.value,
      desMunicipio: this.velatorioForm.get("desMunicipio")?.value,
      estatus: true,
      idCodigoPostal: 0,
      idDelegacion: 0,
      idVelatorio: 0,
      nomRespoSanitario: this.velatorioForm.get("nomRespoSanitario")?.value,
      nomVelatorio: this.velatorioForm.get("nomVelatorio")?.value,
      numExterior: this.velatorioForm.get("numExterior")?.value,
      numTelefono: this.velatorioForm.get("numTelefono")?.value,
      salasCremacion: 0,
      salasEmbalsamamiento: 0
    }
  }

  crearNuevoVelatorio(): NuevoVelatorio {
    return {
      // colonia: this.velatorioForm.get("colonia")?.value,
      cveAsignacion: 0,
      desCalle: this.velatorioForm.get("desCalle")?.value,
      idCodigoPostal: +this.velatorioForm.get("desColonia")?.value,
      nomRespoSanitario: this.velatorioForm.get("responsableSanitario")?.value,
      nomVelatorio: this.velatorioForm.get("nomVelatorio")?.value,
      numExterior: +this.velatorioForm.get("numExterior")?.value,
      numTelefono: this.velatorioForm.get("numTelefono")?.value,
      idDelegacion: 30
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
