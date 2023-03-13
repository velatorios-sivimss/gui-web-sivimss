import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { BreadcrumbService } from "../../../../shared/breadcrumb/services/breadcrumb.service";
import { AlertaService, TipoAlerta } from "../../../../shared/alerta/services/alerta.service";
import { OverlayPanel } from "primeng-lts/overlaypanel";
import { VerDetallePromotoresComponent } from '../ver-detalle-promotores/ver-detalle-promotores.component';
import { Promotor } from '../../models/promotores.interface';

interface HttpResponse {
  respuesta: string;
  promotor: Promotor;
}

@Component({
  selector: 'app-modificar-promotores',
  templateUrl: './modificar-promotores.component.html',
  styleUrls: ['./modificar-promotores.component.scss'],
  providers: [DialogService]
})
export class ModificarPromotoresComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  modo: 'crear' | 'modificar' | 'detalle' | 'activar' | 'desactivar' = 'crear';

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
  promotorSeleccionado!: Promotor;
  modificarPromotorForm!: FormGroup;

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
    this.promotorSeleccionado = this.config.data?.promotor;
    this.modo = this.config.data?.modo;

    this.breadcrumbService.actualizar([
      {
        icono: 'imagen-icono-operacion-sivimss.svg',
        titulo: 'Administración de catálogos'
      },
      {
        icono: '',
        titulo: 'Promotores'
      }
    ]);
    this.inicializarModificarPromotorForm();
  }

  inicializarModificarPromotorForm() {
    this.modificarPromotorForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }, Validators.required],
      numEmpleado: [{ value: null, disabled: false }, [Validators.maxLength(70), Validators.required]],
      curp: [{ value: null, disabled: false }, [Validators.maxLength(70), Validators.required]],
      nombre: [{ value: null, disabled: false }, [Validators.maxLength(70), Validators.required]],
      primerApellido: [{ value: null, disabled: false }, [Validators.maxLength(70), Validators.required]],
      segundoApellido: [{ value: null, disabled: false }, [Validators.maxLength(70), Validators.required]],
      fechaNacimiento: [{ value: null, disabled: false }, Validators.required],
      fechaIngreso: [{ value: null, disabled: false }, Validators.required],
      fechaBaja: [{ value: null, disabled: false }],
      sueldoBase: [{ value: null, disabled: false }, [Validators.maxLength(70), Validators.required]],
      velatorio: [{ value: null, disabled: false }, Validators.required],
      categoria: [{ value: null, disabled: false }, [Validators.maxLength(70), Validators.required]],
      antiguedad: [{ value: null, disabled: false }, [Validators.maxLength(70), Validators.required]],
      correo: [{ value: null, disabled: false }, [Validators.required, Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      puesto: [{ value: null, disabled: false }, [Validators.maxLength(70), Validators.required]],
      diasDescanso: [{ value: null, disabled: false }, Validators.required],
      estatus: [{ value: true, disabled: false }, Validators.required],
    });

    this.modificarPromotorForm.patchValue({
      ...this.promotorSeleccionado,
    })
  }

  abrirModalDetallePromotor() {
    return 0;
  }

  modificarPromotor(): void {
    this.alertaService.mostrar(TipoAlerta.Exito, 'Promotor guardado');
  }

  cerrarDialogo(promotor?: Promotor) {
    this.ref.close({
      respuesta: 'Ok',
      promotor,
    });
  }

  verDetalleGuardarPromotor(): void {
    this.intentoPorGuardar = true;
    this.modificarPromotorForm.markAllAsTouched();

    if (this.modificarPromotorForm.valid) {
      const values = this.modificarPromotorForm.getRawValue();
      const nuevoPromotor: Promotor = {
        ...values,
        id: 1,
      };
      const detalleRef: DynamicDialogRef = this.dialogService.open(VerDetallePromotoresComponent, {
        data: { promotor: nuevoPromotor, modo: this.modo },
        header: "Modificar promotor",
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
    return this.modificarPromotorForm.controls;
  }
}
