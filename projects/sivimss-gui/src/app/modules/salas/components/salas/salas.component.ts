import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BreadcrumbService } from "../../../../shared/breadcrumb/services/breadcrumb.service";
import { AlertaService, TipoAlerta } from "../../../../shared/alerta/services/alerta.service";
import { OverlayPanel } from "primeng-lts/overlaypanel";
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { DIEZ_ELEMENTOS_POR_PAGINA, Accion } from "../../../../utils/constantes";
import { Sala } from "../../models/salas.interface";
import { LazyLoadEvent } from "primeng-lts/api";
import { ActivatedRoute, Router } from '@angular/router';
import { VerDetalleSalasComponent } from '../ver-detalle-salas/ver-detalle-salas.component';
import { AgregarSalasComponent } from '../agregar-salas/agregar-salas.component';
import { ModificarSalasComponent } from '../modificar-salas/modificar-salas.component';

interface HttpResponse {
  respuesta: string;
  sala: Sala;
}
@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.scss'],
  providers: [DialogService]
})
export class SalasComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  numPaginaActual: number = 0;
  cantElementosPorPagina: number = DIEZ_ELEMENTOS_POR_PAGINA;
  totalElementos: number = 0;

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

  salasServicio: any[] = [
    {
      label: 'Sala Uno',
      value: 0,
    },
    {
      label: 'Sala Dos',
      value: 1,
    },
    {
      label: 'Sala Tres',
      value: 2,
    }
  ];

  salas: Sala[] = [];
  salaSeleccionado!: Sala;
  detalleRef!: DynamicDialogRef;
  filtroForm!: FormGroup;
  agregarSalaForm!: FormGroup;
  modificarSalaForm!: FormGroup;
  salasServicioFiltrados: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    public dialogService: DialogService,
    private alertaService: AlertaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
        titulo: 'Salas'
      }
    ]);
    this.inicializarFiltroForm();
  }


  paginar(event: LazyLoadEvent): void {
    setTimeout(() => {
      this.salas = [
        {
          id: 1,
          numEmpleado: '11',
          curp: 'ALBI05041980',
          nombre: 'Alberto',
          primerApellido: 'Lima',
          segundoApellido: 'Dorantes',
          fechaNacimiento: '05/04/1980',
          fechaIngreso: '01/30/2000',
          sueldoBase: '$10,000.00',
          velatorio: 'No. 14 San Luis Potosí y CD Valles',
          categoria: '$3,000',
          antiguedad: '22 años',
          correo: 'jimetez@imss.gob.mx',
          puesto: 'Sala',
          diasDescanso: '13/03/2023',
          nombreSala: 'Sala siniestro de previsión funeraria con cremación',
          descripcion: 'Sala todo incluido con cremación servicios completos',
          estatus: true,
        },
        {
          id: 2,
          numEmpleado: '11',
          curp: 'ALBI05041980',
          nombre: 'Alberto',
          primerApellido: 'Lima',
          segundoApellido: 'Dorantes',
          fechaNacimiento: '05/04/1980',
          fechaIngreso: '01/30/2000',
          sueldoBase: '$10,000.00',
          velatorio: 'No. 14 San Luis Potosí y CD Valles',
          categoria: '$3,000',
          antiguedad: '22 años',
          correo: 'jimetez@imss.gob.mx',
          puesto: 'Sala',
          diasDescanso: '13/03/2023',
          nombreSala: 'Sala siniestro de previsión funeraria con cremación',
          descripcion: 'Sala todo incluido con cremación servicios completos',
          estatus: true,
        },
        {
          id: 3,
          numEmpleado: '11',
          curp: 'ALBI05041980',
          nombre: 'Alberto',
          primerApellido: 'Lima',
          segundoApellido: 'Dorantes',
          fechaNacimiento: '05/04/1980',
          fechaIngreso: '01/30/2000',
          sueldoBase: '$10,000.00',
          velatorio: 'No. 14 San Luis Potosí y CD Valles',
          categoria: '$3,000',
          antiguedad: '22 años',
          correo: 'jimetez@imss.gob.mx',
          puesto: 'Sala',
          diasDescanso: '13/03/2023',
          nombreSala: 'Sala siniestro de previsión funeraria con cremación',
          descripcion: 'Sala todo incluido con cremación servicios completos',
          estatus: true,
        }
      ];
      this.totalElementos = this.salas.length;
    }, 0);
  }

  inicializarFiltroForm() {
    this.filtroForm = this.formBuilder.group({
      nivel: [{ value: null, disabled: false }],
      delegacion: [{ value: null, disabled: false }],
      velatorio: [{ value: null, disabled: false }],
      nombreSala: [{ value: null, disabled: false }],
    });
  }

  abrirModalAgregarSala(): void {
    this.detalleRef = this.dialogService.open(AgregarSalasComponent, {
      header: "Agregar sala",
      width: "920px"
    });
  }

  abrirModalDetalleSala(sala: Sala) {
    this.detalleRef = this.dialogService.open(VerDetalleSalasComponent, {
      data: { sala, modo: Accion.Detalle },
      header: "Ver detalle",
      width: "920px"
    });
  }

  abrirPanel(event: MouseEvent, salaSeleccionado: Sala): void {
    this.salaSeleccionado = salaSeleccionado;
    this.overlayPanel.toggle(event);
  }

  abrirModalModificarSala() {
    this.detalleRef = this.dialogService.open(ModificarSalasComponent, {
      data: { sala: this.salaSeleccionado },
      header: "Modificar sala",
      width: "920px"
    });
  }

  agregarSala(): void {
    this.alertaService.mostrar(TipoAlerta.Exito, 'Usuario guardado');
  }

  limpiarFormBusqueda() {
    this.filtroForm.reset();
  }

  buscarSala() {
    // De acuerdo a CU al menos un campo con información a buscar
    if (this.validarAlMenosUnCampoConValor(this.filtroForm)) {
      // TO DO llamada a servicio para realizar búsqueda
      console.log('Datos a buscar', this.filtroForm.value);
    }
  }

  validarAlMenosUnCampoConValor(group: FormGroup) {
    if (!Object.values(group.value).find(value => value !== '' && value !== null)) {
      return false;
    }
    return true;
  }

  cambiarEstatus(sala: Sala) {
    const modo = sala.estatus ? Accion.Desactivar : Accion.Activar;
    this.detalleRef = this.dialogService.open(VerDetalleSalasComponent, {
      data: { sala, modo },
      header: "Ver detalle",
      width: "920px"
    });
    this.detalleRef.onClose.subscribe((res: HttpResponse) => {
      if (res && res.respuesta === 'Ok' && res.sala) {
        const foundIndex = this.salas.findIndex((item: Sala) => item.id === sala.id);
        this.salas[foundIndex] = res.sala;
      }
    });
  }

  filtrarSalas(event: any) {
    // TO DO En una aplicación real, realice una solicitud a una URL remota con la consulta y devuelva los resultados filtrados
    let filtrado: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.salasServicio.length; i++) {
      let sala = this.salasServicio[i];
      if (sala.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtrado.push(sala);
      }
    }

    this.salasServicioFiltrados = filtrado;
  }

  get f() {
    return this.filtroForm.controls;
  }

  get fac() {
    return this.agregarSalaForm.controls;
  }

  get fmc() {
    return this.modificarSalaForm.controls;
  }

}
