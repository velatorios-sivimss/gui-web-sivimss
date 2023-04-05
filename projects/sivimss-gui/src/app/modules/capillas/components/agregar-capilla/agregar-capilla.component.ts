import { CapillaService } from './../../services/capilla.service';
import { Capilla, ConfirmacionServicio } from './../../models/capilla.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaService, TipoAlerta } from 'projects/sivimss-gui/src/app/shared/alerta/services/alerta.service';
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoDropdown } from 'projects/sivimss-gui/src/app/models/tipo-dropdown';
import { CATALOGOS_DUMMIES } from '../../../inventario-vehicular/constants/dummies';
import { HttpErrorResponse } from '@angular/common/http';
import { RespuestaModalcapilla } from '../../models/respuesta-modal-capilla.interface';
import { DetalleCapillaComponent } from '../detalle-capilla/detalle-capilla.component';
import { Accion } from 'projects/sivimss-gui/src/app/utils/constantes';
import { FiltroCapilla } from '../../models/filtro-capilla.interface';

type Nuevacapilla = Omit<Capilla, "id">;

@Component({
  selector: 'app-agregar-capilla',
  templateUrl: './agregar-capilla.component.html',
  styleUrls: ['./agregar-capilla.component.scss'],
  providers: [DialogService]
})
export class AgregarCapillaComponent implements OnInit {
  agregarCapillaForm!: FormGroup;

   capillas: Capilla = {};
  ventanaConfirmacion: boolean = false;
  capillaSeleccionada!: Capilla;
  // velatorios: TipoDropdown[] = CATALOGOS_DUMMIES;
  estatus: boolean = false;
  velatorios: any[] = [
    {
      label: 'DOCTORES',
      value: 1,
    },
    {
      label: 'CHIHUHUA',
      value: 2,
    },
    {
      label: 'MÉRIDA',
      value: 3,
    }
  ];

  selectedOption: any;
  inputValue!: string;


  capillaParaGuardar!: any;

  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private capillaService: CapillaService,
    private alertaService: AlertaService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.inicializarAgregarCapillaForm();
  }

  inicializarAgregarCapillaForm() {
    this.agregarCapillaForm = this.formBuilder.group({
      id: [{value: null, disabled: true}],
      nombre: [{value: null, disabled: false}, [Validators.required]],
      capacidad: [{value: null, disabled: false}, [Validators.required]],
      idVelatorio: [{value: null, disabled: false}, [Validators.required]],
      largo: [{value: null, disabled: false}, [Validators.required]],
      alto: [{value: null, disabled: false}, [Validators.required]],
      areaTotal: [{value: null, disabled: false}, [Validators.required]]
    });
  }


  cerrar(){
    this.ref.close();
  }

  cerrar2(event?:ConfirmacionServicio){
    this.ventanaConfirmacion = false;
    this.ref.close(true);
  }

  onDropdownChange(event: any) {
    const selectedLabel = this.selectedOption.label ;
    const velatorioId = parseInt(this.agregarCapillaForm.get("idVelatorio")?.value);
    console.log('Selected label:', selectedLabel);
    console.log('Velatorio ID:', velatorioId);
  }

   crearNuevaCapilla(): Capilla{
    this.ventanaConfirmacion = true;
     return {
      idCapilla: this.agregarCapillaForm.get("id")?.value,
       nombre: this.agregarCapillaForm.get('nombre')?.value,
       capacidad: parseInt(this.agregarCapillaForm.get("capacidad")?.value),
       idVelatorio: parseInt(this.agregarCapillaForm.get("idVelatorio")?.value),
       largo: parseInt(this.agregarCapillaForm.get("largo")?.value),
       alto: parseInt(this.agregarCapillaForm.get("alto")?.value),
     };
   }

   crearNuevaCapillaParaDetalle(): void{
    this.capillas = {
      // idCapilla: this.agregarCapillaForm.get("id")?.value,
       nombre: this.agregarCapillaForm.get('nombre')?.value,
       capacidad: parseInt(this.agregarCapillaForm.get("capacidad")?.value),
       idVelatorio: parseInt(this.agregarCapillaForm.get("idVelatorio")?.value),
       largo: parseInt(this.agregarCapillaForm.get("largo")?.value),
       alto: parseInt(this.agregarCapillaForm.get("alto")?.value),
       ancho: parseInt(this.agregarCapillaForm.get("ancho")?.value),
       areaTotal: this.agregarCapillaForm.get("areaTotal")?.value,
       velatorio: this.agregarCapillaForm.get('areaTotal')?.value,
  }
   }


   abrirModalDetalleCapilla() {
    this.ventanaConfirmacion = true
    this.crearNuevaCapillaParaDetalle();
   }


  agregarCapilla(): void {
    this.ventanaConfirmacion = false;
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
