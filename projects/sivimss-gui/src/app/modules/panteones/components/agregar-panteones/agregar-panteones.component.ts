import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { BreadcrumbService } from "../../../../shared/breadcrumb/services/breadcrumb.service";
import { AlertaService, TipoAlerta } from "../../../../shared/alerta/services/alerta.service";
import { OverlayPanel } from "primeng-lts/overlaypanel";
import { VerDetallePanteonesComponent } from '../ver-detalle-panteones/ver-detalle-panteones.component';
import { Panteon } from '../../models/panteones.interface';
import { Accion } from 'projects/sivimss-gui/src/app/utils/constantes';
import { CURP, EMAIL } from 'projects/sivimss-gui/src/app/utils/regex';

interface HttpResponse {
  respuesta: string;
  panteon: Panteon;
}

@Component({
  selector: 'app-agregar-panteones',
  templateUrl: './agregar-panteones.component.html',
  styleUrls: ['./agregar-panteones.component.scss'],
  providers: [DialogService]
})
export class AgregarPanteonesComponent implements OnInit {

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

  agregarPanteonForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    public dialogService: DialogService,
    private alertaService: AlertaService,
    private route: ActivatedRoute,
    public ref: DynamicDialogRef,
  ) {
  }

  ngOnInit(): void {
    this.breadcrumbService.actualizar([
      {
        icono: 'imagen-icono-operacion-sivimss.svg',
        titulo: 'Administración de catálogos'
      },
      {
        icono: '',
        titulo: 'Panteones'
      }
    ]);
    this.inicializarAgregarPanteonForm();
  }

  inicializarAgregarPanteonForm() {
    this.agregarPanteonForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      numEmpleado: [{ value: null, disabled: false }, [Validators.maxLength(10), Validators.required]],
      curp: [{ value: null, disabled: false }, [Validators.maxLength(18), Validators.required, Validators.pattern(CURP)]],
      nombre: [{ value: null, disabled: false }, [Validators.maxLength(30), Validators.required]],
      primerApellido: [{ value: null, disabled: false }, [Validators.maxLength(20), Validators.required]],
      segundoApellido: [{ value: null, disabled: false }, [Validators.maxLength(20), Validators.required]],
      fechaNacimiento: [{ value: null, disabled: false }, Validators.required],
      fechaIngreso: [{ value: null, disabled: false }, Validators.required],
      fechaBaja: [{ value: null, disabled: true }],
      sueldoBase: [{ value: null, disabled: false }, [Validators.maxLength(10), Validators.required]],
      velatorio: [{ value: null, disabled: false }, Validators.required],
      categoria: [{ value: null, disabled: false }, [Validators.maxLength(20), Validators.required]],
      antiguedad: [{ value: null, disabled: true }, [Validators.maxLength(50)]],
      correo: [{ value: null, disabled: false }, [Validators.maxLength(30), Validators.required,
      Validators.email, Validators.pattern(EMAIL)]],
      puesto: [{ value: null, disabled: false }, [Validators.maxLength(20), Validators.required]],
      diasDescanso: [{ value: null, disabled: false }, Validators.required],
      estatus: [{ value: true, disabled: false }, Validators.required],
    });
  }

  abrirModalDetallePanteon() {
    return 0;
  }

  agregarPanteon(): void {
    this.alertaService.mostrar(TipoAlerta.Exito, 'Panteon guardado');
  }

  cerrarDialogo(panteon?: Panteon) {
    this.ref.close({
      respuesta: 'Ok',
      panteon,
    });
  }

  verDetalleGuardarPanteon(): void {
    this.intentoPorGuardar = true;
    this.agregarPanteonForm.markAllAsTouched();

    if (this.agregarPanteonForm.valid) {
      const values = this.agregarPanteonForm.getRawValue();
      const nuevoPanteon: Panteon = {
        ...values,
        id: 1,
      };
      const detalleRef: DynamicDialogRef = this.dialogService.open(VerDetallePanteonesComponent, {
        data: { panteon: nuevoPanteon, modo: Accion.Agregar },
        header: "Agregar panteon",
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

  consultarRenapo() {
    //TO DO Realizar consulta a RENAPO cuando campos de nombre y fecha nacimiento tengan datos
    if (this.validarPreconsultaRenapo()) {
      //CURP Dommy para prueba
      this.f.curp.setValue('OEAF771012HMCRGR09');
      //En caso de no existir CURP mostrar msj
      this.alertaService.mostrar(TipoAlerta.Precaucion, 'No se encontró información relacionada a tu búsqueda.');
    }
  }

  validarPreconsultaRenapo(): boolean {
    if (this.agregarPanteonForm.get('nombre')?.valid &&
      this.agregarPanteonForm.get('primerApellido')?.valid &&
      this.agregarPanteonForm.get('segundoApellido')?.valid &&
      this.agregarPanteonForm.get('fechaNacimiento')?.valid) {
      return true;
    }
    return false;
  }

  handleFechaIngreso() {
    //TO DO Calcular Antigüedad
    console.log(this.f.fechaIngreso.value);
  }

  get f() {
    return this.agregarPanteonForm.controls;
  }
}
