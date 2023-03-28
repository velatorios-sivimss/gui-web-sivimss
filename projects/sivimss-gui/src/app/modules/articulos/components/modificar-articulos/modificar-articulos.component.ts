import { DetalleArticulosComponent } from './../detalle-articulos/detalle-articulos.component';
import { Articulos, ConfirmacionServicio } from './../../models/articulos.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CATALOGOS_DUMMIES } from '../../constants/dummies';
import { TipoDropdown } from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import { AlertaService } from 'projects/sivimss-gui/src/app/shared/alerta/services/alerta.service';
import { DynamicDialogRef } from 'primeng-lts/dynamicdialog';

@Component({
  selector: 'app-modificar-articulos',
  templateUrl: './modificar-articulos.component.html',
  styleUrls: ['./modificar-articulos.component.scss']
})
export class ModificarArticulosComponent implements OnInit {

  modificarArticuloForm!: FormGroup;

  articulos: Articulos = {};

  ventanaConfirmacion: boolean = false;

  opciones: TipoDropdown[] = CATALOGOS_DUMMIES;
  tipoServicio: TipoDropdown[] = CATALOGOS_DUMMIES;
  cuentaContable: TipoDropdown[] = CATALOGOS_DUMMIES;
  partidaPresupuestal: TipoDropdown[] = CATALOGOS_DUMMIES;
  claveSAT: TipoDropdown[] = CATALOGOS_DUMMIES;



  constructor(
    private formBuilder: FormBuilder,
    private alertaService: AlertaService,
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.inicializarModificarArticuloForm();
  }

  inicializarModificarArticuloForm(): void {
    this.modificarArticuloForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      categoria: [{ value: null, disabled: false }, [Validators.required]],
      tipoDeArticulo: [{ value: null, disabled: false }, [Validators.required]],
      tipoDeMaterial: [{ value: null, disabled: false }, [Validators.required]],
      tamanio: [{ value: null, disabled: false }, [Validators.required]],
      clasificacionDeProducto: [{ value: null, disabled: false }, [Validators.required]],
      modeloDeArticulo: [{ value: null, disabled: false }, [Validators.required]],
      descripcionDeProducto: [{ value: null, disabled: false }, [Validators.required]],
      largo: [{ value: null, disabled: false }, [Validators.required]],
      ancho: [{ value: null, disabled: false }, [Validators.required]],
      alto: [{ value: null, disabled: false }, [Validators.required]],
      estatus: [{ value: true, disabled: false }],
      claveSAT: [{ value: null, disabled: false }, [Validators.required]],
      cuentaClave: [{ value: null, disabled: false }, [Validators.required]],
      cuentaContable: [{ value: null, disabled: false }, [Validators.required]],
      partidaPresupuestal: [{ value: null, disabled: false }, [Validators.required]],
    });
  }


  get fma() {
    return this.modificarArticuloForm.controls;
  }

  confirmarModificarArticulo(): void {
    this.ventanaConfirmacion = true;
    this.articulos = {
      idArticulo: this.modificarArticuloForm.get("id")?.value,
      categoriaArticulo: this.modificarArticuloForm.get("categoria")?.value,
      tipoArticulo: this.modificarArticuloForm.get("tipoDeArticulo")?.value,
      tipoMaterial: this.modificarArticuloForm.get("tipoDeMaterial")?.value,
      tamanio: this.modificarArticuloForm.get("tamanio")?.value,
      clasificacionProducto: this.modificarArticuloForm.get("clasificacionDeProducto")?.value,
      modeloArticulo: this.modificarArticuloForm.get("modeloDeArticulo")?.value,
      desArticulo: this.modificarArticuloForm.get("descripcionDeProducto")?.value,
      largo: this.modificarArticuloForm.get("largo")?.value,
      ancho: this.modificarArticuloForm.get("ancho")?.value,
      alto: this.modificarArticuloForm.get("alto")?.value,
      estatus: this.modificarArticuloForm.get("estatus")?.value,
      claveSAT: this.modificarArticuloForm.get("claveSAT")?.value,
      idCuentaPartPresupuestal: this.modificarArticuloForm.get("cuentaClave")?.value,
      idPartPresupuestal: this.modificarArticuloForm.get("cuentaContable")?.value,
      numCuentaPartPresupuestal: this.modificarArticuloForm.get("partidaPresupuestal")?.value,
    };

  }

  cerrar(event?: ConfirmacionServicio): void {
    if (event && event.origen == "modificar") {
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

}
