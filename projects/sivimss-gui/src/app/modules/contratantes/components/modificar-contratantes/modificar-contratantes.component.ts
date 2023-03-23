import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng-lts/api";
import {MENU_STEPPER} from "../../constants/menu-steppers";
import {DynamicDialogConfig} from "primeng-lts/dynamicdialog";
import {UsuarioContratante} from "../../models/usuario-contratante.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TipoDropdown} from "../../../../models/tipo-dropdown";
import {CATALOGOS_DUMMIES} from "../../constants/dummies";

@Component({
  selector: 'app-modificar-contratantes',
  templateUrl: './modificar-contratantes.component.html',
  styleUrls: ['./modificar-contratantes.component.scss']
})
export class ModificarContratantesComponent implements OnInit {

  @Input() contratante!: UsuarioContratante;
  @Input() origen!: string;

  menuStep: MenuItem[] = MENU_STEPPER;
  indice: number = 0;

  datosGeneralesForm!: FormGroup;
  domicilioForm!: FormGroup;

  sexo: TipoDropdown[] = CATALOGOS_DUMMIES;
  nacionalidad: TipoDropdown[] = CATALOGOS_DUMMIES;

  constructor(
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    if(this.config?.data){
      this.contratante = this.config.data.contratante;
    }

    this.incializarDatosGeneralesForm();
    this.inicializarDomicilioForm();
  }

  incializarDatosGeneralesForm(): void {
    this.datosGeneralesForm = this.formBuilder.group({
      curp: [{value: null, disabled: false}, [Validators.required]],
      rfc: [{value: null, disabled: false}, [Validators.required]],
      nss: [{value: null, disabled: false}, [Validators.required]],
      nombre: [{value: null, disabled: false}, [Validators.required]],
      primerApellido: [{value: null, disabled: false}, [Validators.required]],
      segundoApellido: [{value: null, disabled: false}, [Validators.required]],
      sexo: [{value: null, disabled: false}, [Validators.required]],
      fechaNacimiento: [{value: null, disabled: false}, [Validators.required]],
      nacionalidad: [{value: null, disabled: false}, [Validators.required]],
      lugarNacimiento: [{value: null, disabled: false}, [Validators.required]],
      telefono: [{value: null, disabled: false}, [Validators.required]],
      correoElectronico: [{value: null, disabled: false}, [Validators.required]]
    });
  }

  inicializarDomicilioForm(): void {
    this.domicilioForm = this.formBuilder.group({
      cp: [{value: null, disabled: false}, [Validators.required]],
      calle: [{value: null, disabled: false}, [Validators.required]],
      numeroExterior: [{value: null, disabled: false}, [Validators.required]],
      numeroInterior: [{value: null, disabled: false}, [Validators.required]],
      colonia: [{value: null, disabled: false}, [Validators.required]],
      municipio: [{value: null, disabled: false}, [Validators.required]],
      estado: [{value: null, disabled: false}, [Validators.required]],
      estatus: [{value: null, disabled: false}, [Validators.required]],
    });
  }

  siguiente(): void {
    this.indice ++;
  }

  get dgf() {
    return this.datosGeneralesForm.controls;
  }

  get df(){
    return this.domicilioForm.controls;
  }

}
