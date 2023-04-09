import { CapillaService } from './../../services/capilla.service';
import { Capilla } from './../../models/capilla.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaService, TipoAlerta } from 'projects/sivimss-gui/src/app/shared/alerta/services/alerta.service';
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { TipoDropdown } from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import { CATALOGOS_DUMMIES } from '../../../inventario-vehicular/constants/dummies';
import { HttpErrorResponse } from '@angular/common/http';
import { RespuestaModalcapilla } from '../../models/respuesta-modal-capilla.interface';

type Nuevacapilla = Omit<Capilla, "id">;

@Component({
  selector: 'app-agregar-capilla',
  templateUrl: './agregar-capilla.component.html',
  styleUrls: ['./agregar-capilla.component.scss'],
  providers: [DialogService]
})
export class AgregarCapillaComponent implements OnInit {
  agregarCapillaForm!: FormGroup;

  // capillas: Capilla = {};
  ventanaConfirmacion: boolean = false;
  capillaSeleccionada!: Capilla;
  // velatorios: TipoDropdown[] = CATALOGOS_DUMMIES;
  estatus: boolean = false;
  velatorios: any[] = [
    {
      label: 'Opción 1',
      value: 1,
    },
    {
      label: 'Opción 2',
      value: 2,
    },
    {
      label: 'Opción 3',
      value: 3,
    }
  ];






  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private capillaService: CapillaService,
    private alertaService: AlertaService,
  ) { }


  ngOnInit(): void {
    this.inicializarAgregarCapillaForm();
  }

  cerrar(){
    this.ref.close();
  }

  confirmarAgregarArticulo(): void {
    // this.agregarArticuloForm.markAllAsTouched();
    // if (this.agregarArticuloForm.valid) {
    //   this.articuloSeleccionado = this.obtenerArticuloParaDetalle();
    //   this.ventanaConfirmacion = true;
    // }
  }

   crearNuevaCapilla(): Capilla{
     return {
      // id: this.agregarCapillaForm.get("id")?.value,
       nombre: this.agregarCapillaForm.get('nombre')?.value,
       capacidad: parseInt(this.agregarCapillaForm.get("capacidad")?.value),
       idVelatorio: parseInt(this.agregarCapillaForm.get("idVelatorio")?.value),
       largo: parseInt(this.agregarCapillaForm.get("largo")?.value),
       alto: parseInt(this.agregarCapillaForm.get("alto")?.value),
       ancho: parseInt(this.agregarCapillaForm.get("ancho")?.value),
       areaTotal: this.agregarCapillaForm.get("areaTotal")?.value,
     };
   }


  inicializarAgregarCapillaForm() {
    this.agregarCapillaForm = this.formBuilder.group({
      id: [{value: null, disabled: true}],
      nombre: [{value: null, disabled: false}, [Validators.required]],
      capacidad: [{value: null, disabled: false}, [Validators.required]],
      velatorio: [{value: null, disabled: false}, [Validators.required]],
      largo: [{value: null, disabled: false}, [Validators.required]],
      ancho: [{value: null, disabled: false}, [Validators.required]],
      areaTotal: [{value: null, disabled: false}, [Validators.required]]
    });
  }

  AgregarCapilla(): void {
    const respuesta: RespuestaModalcapilla = {mensaje: "Alta satisfactoria", actualizar: true}
    const capilla: Nuevacapilla = this.crearNuevaCapilla();
    const solicitudUsuario: string = JSON.stringify(capilla);
    this.capillaService.guardar(solicitudUsuario).subscribe(
      () => {
        this.ref.close(respuesta)
      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar(TipoAlerta.Error, 'Alta incorrecta');
        console.error("ERROR: ", error.message)
      }
    );
  }


  get fac() {
    return this.agregarCapillaForm.controls;
  }

}
