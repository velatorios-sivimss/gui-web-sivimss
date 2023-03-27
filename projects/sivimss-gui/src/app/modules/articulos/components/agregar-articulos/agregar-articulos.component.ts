import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { TipoDropdown } from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import { CATALOGOS_DUMMIES } from '../../constants/dummies';
import { Articulos, ConfirmacionServicio } from '../../models/articulos.interface';

@Component({
  selector: 'app-agregar-articulos',
  templateUrl: './agregar-articulos.component.html',
  styleUrls: ['./agregar-articulos.component.scss'],
  providers: [DialogService]
})
export class AgregarArticulosComponent implements OnInit {
  readonly ID_ARTICULO_COMPLEMENTARIO: number = 1;

  agregarArticuloForm!: FormGroup;
  articulos: Articulos = {};
  ventanaConfirmacion: boolean = false;
  opciones: TipoDropdown[] = CATALOGOS_DUMMIES;
  tipoServicio: TipoDropdown[] = CATALOGOS_DUMMIES;
  cuentaContable: TipoDropdown[] = CATALOGOS_DUMMIES;
  partidaPresupuestal: TipoDropdown[] = CATALOGOS_DUMMIES;
  claveSAT: TipoDropdown[] = CATALOGOS_DUMMIES;
  estatus: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.estatus = true;
    this.inicializarAgregarServicioForm();
  }

  inicializarAgregarServicioForm(): void {
    this.agregarArticuloForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      categoria: [{ value: null, disabled: false }, [Validators.required]],
      tipoDeArticulo: [{ value: null, disabled: false }, [Validators.required]],
      tipoDeMaterial: [{ value: null, disabled: false }, [Validators.required]],
      tamanio: [{ value: null, disabled: false }, [Validators.required]],
      clasificacionDeProducto: [{ value: null, disabled: false }, [Validators.required]],
      modeloDeArticulo: [{ value: null, disabled: false }, [Validators.maxLength(70), Validators.required]],
      descripcionDeProducto: [{ value: null, disabled: false }, [Validators.maxLength(70), Validators.required]],
      largo: [{ value: null, disabled: false }, [Validators.maxLength(3), Validators.required]],
      ancho: [{ value: null, disabled: false }, [Validators.maxLength(3), Validators.required]],
      alto: [{ value: null, disabled: false }, [Validators.maxLength(3), Validators.required]],
      estatus: [{ value: true, disabled: false }],
      claveSAT: [{ value: null, disabled: false }, [Validators.required]],
      cuentaContable: [{ value: null, disabled: true }, []],
      partidaPresupuestal: [{ value: null, disabled: true }, []],
    });
  }

  agregarServicio(): void {
    this.agregarArticuloForm.markAllAsTouched();
    if (this.agregarArticuloForm.valid) {
      this.ventanaConfirmacion = true;
    }
  }

  cerrar(event?: ConfirmacionServicio): void {
    debugger;
    //Selección cancelar pantalla agregar
    if (event && event.origen == "agregar") {
      this.ventanaConfirmacion = false;
      this.ref.close(true);
      return;
    }

    if (event && event.origen == "regresar") {
      this.ventanaConfirmacion = false;
      return;
    }

    if (event && event.origen == "cancelar") {
      this.ventanaConfirmacion = false;
      return;
    }

    this.ref.close(false);
  }

  handleChangeTipoArticulo() {
    if (this.faa.tipoDeArticulo.value === this.ID_ARTICULO_COMPLEMENTARIO) {
      this.faa.cuentaContable.enable();
      this.faa.cuentaContable.setValidators(Validators.required);
      this.faa.cuentaContable.updateValueAndValidity();
      this.faa.partidaPresupuestal.enable();
      this.faa.partidaPresupuestal.setValidators(Validators.required);
      this.faa.partidaPresupuestal.updateValueAndValidity();
      this.agregarArticuloForm.markAllAsTouched();
    } else {
      this.faa.cuentaContable.reset();
      this.faa.cuentaContable.clearValidators();
      this.faa.cuentaContable.updateValueAndValidity();
      this.faa.cuentaContable.disable();
      this.faa.partidaPresupuestal.reset();
      this.faa.partidaPresupuestal.clearValidators();
      this.faa.partidaPresupuestal.updateValueAndValidity();
      this.faa.partidaPresupuestal.disable();
    }
  }

  get faa() {
    return this.agregarArticuloForm.controls;
  }

}
