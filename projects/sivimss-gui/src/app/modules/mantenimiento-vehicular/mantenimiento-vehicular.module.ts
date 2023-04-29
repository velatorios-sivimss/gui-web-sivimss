import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DropdownModule} from 'primeng-lts/dropdown';
import {DynamicDialogModule} from 'primeng-lts/dynamicdialog';
import {TableModule} from 'primeng-lts/table';
import {InputSwitchModule} from 'primeng-lts/inputswitch';
import {OverlayPanelModule} from 'primeng-lts/overlaypanel';


import {TituloPrincipalModule} from '../../shared/titulo-principal/titulo-principal.module';
import {OverlayPanelOpcionesModule} from '../../shared/overlay-panel-opciones/overlay-panel-opciones.module';
import {TablePanelModule} from '../../shared/table-panel/table-panel.module';
import {DialogModule} from 'primeng-lts/dialog';
import {StepsModule} from 'primeng-lts/steps';

import {CalendarModule} from 'primeng-lts/calendar';
import {AccordionModule} from 'primeng-lts/accordion';
import {
  ProgramarMantenimientoVehicularComponent
} from './components/programar-mantenimiento-vehicular/programar-mantenimiento-vehicular.component';
import {MantenimientoVehicularRoutingModule} from './mantenimiento-vehicular.routing.module';
import {MantenimientoVehicularService} from './services/mantenimiento-vehicular.service';
import {
  NuevaVerificacionComponent
} from './components/nueva-verificacion/nueva-verificacion/nueva-verificacion.component';
import {
  DetalleNuevaVerificacionComponent
} from './components/nueva-verificacion/detalle-nueva-verificacion/detalle-nueva-verificacion.component';
import {
  SolicitudMantenimientoComponent
} from './components/solicitud-mantenimiento/solicitud-mantenimiento/solicitud-mantenimiento.component';
import {
  DetalleSolicitudMantenimientoComponent
} from './components/solicitud-mantenimiento/detalle-solicitud-mantenimiento/detalle-solicitud-mantenimiento.component';
import {
  RegistroMantenimientoComponent
} from './components/registro-mantenimiento/registro-mantenimiento/registro-mantenimiento.component';
import {
  DetalleRegistroMantenimientoComponent
} from './components/registro-mantenimiento/detalle-registro-mantenimiento/detalle-registro-mantenimiento.component';
import {
  MantenimientoPredictivoComponent
} from './components/mantenimiento-predictivo/mantenimiento-predictivo.component';
import {ReporteEncargadoComponent} from './components/reporte-encargado/reporte-encargado.component';
import {CheckboxModule} from 'primeng-lts/checkbox';
import {RadioButtonModule} from 'primeng-lts/radiobutton';
import {UtileriaModule} from "../../shared/utileria/utileria.module";

//as
@NgModule({
  declarations: [
    ProgramarMantenimientoVehicularComponent,
    NuevaVerificacionComponent,
    DetalleNuevaVerificacionComponent,
    SolicitudMantenimientoComponent,
    DetalleSolicitudMantenimientoComponent,
    RegistroMantenimientoComponent,
    DetalleRegistroMantenimientoComponent,
    MantenimientoPredictivoComponent,
    ReporteEncargadoComponent,
  ],
  imports: [
    CalendarModule,
    CommonModule,
    DialogModule,
    DropdownModule,
    DynamicDialogModule,
    FormsModule,
    InputSwitchModule,
    MantenimientoVehicularRoutingModule,
    OverlayPanelModule,
    OverlayPanelOpcionesModule,
    ReactiveFormsModule,
    TableModule,
    TablePanelModule,
    TituloPrincipalModule,
    StepsModule,
    AccordionModule,
    CheckboxModule,
    RadioButtonModule,
    UtileriaModule,
  ],
  providers: [MantenimientoVehicularService]
})
export class MantenimientoVehicularModule {
}
