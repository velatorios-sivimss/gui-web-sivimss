import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { BreadcrumbService } from "../../../../shared/breadcrumb/services/breadcrumb.service";
import { AlertaService, TipoAlerta } from "../../../../shared/alerta/services/alerta.service";
import { OverlayPanel } from "primeng-lts/overlaypanel";
import { VerDetalleSalasComponent } from '../ver-detalle-salas/ver-detalle-salas.component';
import { Sala } from '../../models/salas.interface';
import { Accion } from 'projects/sivimss-gui/src/app/utils/constantes';
import { EMAIL } from 'projects/sivimss-gui/src/app/utils/regex';

interface HttpResponse {
  respuesta: string;
  sala: Sala;
}

@Component({
  selector: 'app-modificar-salas',
  templateUrl: './modificar-salas.component.html',
  styleUrls: ['./modificar-salas.component.scss'],
  providers: [DialogService]
})
export class ModificarSalasComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  opciones: any[] = [
    {
      label: 'Opción 1',
      value: 0,
    },
    {
      label: 'Opción 2',
      value: 1,
    },
    {
      label: 'Opción 3',
      value: 2,
    }
  ];

  regiones: any[] = [
    {
      label: 'Nacional',
      value: 0,
    },
    {
      label: 'Delegacional',
      value: 1,
    },
    {
      label: 'Velatorio',
      value: 2,
    }
  ];

  catalogoArticulos: any[] = [
    {
      label: 'Ataúd',
      value: 0,
    },
    {
      label: 'Urna',
      value: 1,
    },
    {
      label: 'Cartucho',
      value: 2,
    },
    {
      label: 'Empaques traslado aéreo',
      value: 3,
    },
    {
      label: 'Bolsa para cadáver',
      value: 4,
    },
    {
      label: 'Otro',
      value: 5,
    },
  ];

  tipoArticulos: any[] = [];
  tituloEliminar: string = '';
  intentoPorGuardar: boolean = false;
  salaSeleccionado!: Sala;
  modificarSalaForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    public dialogService: DialogService,
    private alertaService: AlertaService,
    private route: ActivatedRoute,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
  }

  ngOnInit(): void {
    this.salaSeleccionado = this.config.data?.sala;

    this.breadcrumbService.actualizar([
      {
        icono: 'imagen-icono-operacion-sivimss.svg',
        titulo: 'Administración de catálogos'
      },
      {
        icono: '',
        titulo: 'Salas'
      }
    ]);
    this.inicializarModificarSalaForm();
  }

  inicializarModificarSalaForm() {
    this.modificarSalaForm = this.formBuilder.group({
      id: [{value: null, disabled: true}, Validators.required],
      numEmpleado: [{value: null, disabled: true}],
      curp: [{value: null, disabled: true}],
      nombre: [{value: null, disabled: true}],
      primerApellido: [{value: null, disabled: true}],
      segundoApellido: [{value: null, disabled: true}],
      fechaNacimiento: [{value: null, disabled: true}],
      fechaIngreso: [{value: null, disabled: false}, Validators.required],
      fechaBaja: [{value: null, disabled: true}],
      sueldoBase: [{value: null, disabled: false}, [Validators.maxLength(10), Validators.required]],
      velatorio: [{value: null, disabled: false}, Validators.required],
      categoria: [{value: null, disabled: false}, [Validators.maxLength(20), Validators.required]],
      antiguedad: [{value: null, disabled: true}, [Validators.maxLength(50)]],
      correo: [{value: null, disabled: false}, [Validators.maxLength(30), Validators.required,
        Validators.email, Validators.pattern(EMAIL)]],
      puesto: [{value: null, disabled: false}, [Validators.maxLength(20), Validators.required]],
      diasDescanso: [{value: null, disabled: false}, Validators.required],
      estatus: [{value: true, disabled: true}],
    });

    this.modificarSalaForm.patchValue({
      ...this.salaSeleccionado,
    })
  }

  abrirModalDetalleSala() {
    return 0;
  }

  modificarSala(): void {
    this.alertaService.mostrar(TipoAlerta.Exito, 'Sala guardado');
  }

  cerrarDialogo(sala?: Sala) {
    this.ref.close({
      respuesta: 'Ok',
      sala,
    });
  }

  verDetalleGuardarSala(): void {
    this.intentoPorGuardar = true;
    this.modificarSalaForm.markAllAsTouched();

    if (this.modificarSalaForm.valid) {
      const values = this.modificarSalaForm.getRawValue();
      const nuevoSala: Sala = {
        ...values,
        id: 1,
      };
      const detalleRef: DynamicDialogRef = this.dialogService.open(VerDetalleSalasComponent, {
        data: {sala: nuevoSala, modo: Accion.Modificar},
        header: "Modificar sala",
        width: "920px"
      });

      detalleRef.onClose.subscribe((res: HttpResponse) => {
        debugger;
        if (res && res.respuesta === 'Ok') {
          this.cerrarDialogo();
        }
      });
    }
  }

  get f() {
    return this.modificarSalaForm.controls;
  }
}
