import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CalendarModule } from "primeng-lts/calendar";
import { DialogModule } from "primeng-lts/dialog";
import { DropdownModule } from "primeng-lts/dropdown";
import { InputSwitchModule } from "primeng-lts/inputswitch";
import { OverlayPanelModule } from "primeng-lts/overlaypanel";
import { RadioButtonModule } from "primeng-lts/radiobutton";
import { StepsModule } from "primeng-lts/steps";
import { TableModule } from "primeng-lts/table";
import { AccordionModule } from 'primeng-lts/accordion';
import {
  OrdenesServicioRoutingModule
} from 'projects/sivimss-gui/src/app/modules/ordenes-servicio/ordenes-servicio-routing.module';
import {
  OrdenesServicioComponent
} from 'projects/sivimss-gui/src/app/modules/ordenes-servicio/components/ordenes-servicio/ordenes-servicio.component';
import {
  OverlayPanelOpcionesModule
} from "projects/sivimss-gui/src/app/shared/overlay-panel-opciones/overlay-panel-opciones.module";
import { TablePanelModule } from "projects/sivimss-gui/src/app/shared/table-panel/table-panel.module";
import { TituloPrincipalModule } from "projects/sivimss-gui/src/app/shared/titulo-principal/titulo-principal.module";
import { GenerarOrdenServicioComponent } from './components/generar-orden-servicio/generar-orden-servicio.component';
import { DatosContratanteComponent } from './components/datos-contratante/datos-contratante.component';
import { DatosFinadoComponent } from './components/datos-finado/datos-finado.component';
import { CancelarOrdenServicioComponent } from './components/cancelar-orden-servicio/cancelar-orden-servicio.component';
import {
  VerOrdenServicioComponent
} from 'projects/sivimss-gui/src/app/modules/ordenes-servicio/components/ver-orden-de-servicio/ver-orden-servicio.component';


@NgModule({
  declarations: [
    OrdenesServicioComponent,
    GenerarOrdenServicioComponent,
    DatosContratanteComponent,
    DatosFinadoComponent,
    CancelarOrdenServicioComponent,
    VerOrdenServicioComponent
  ],
  imports: [
    CommonModule,
    OrdenesServicioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    TituloPrincipalModule,
    TableModule,
    InputSwitchModule,
    DialogModule,
    CalendarModule,
    OverlayPanelModule,
    OverlayPanelOpcionesModule,
    TablePanelModule,
    StepsModule,
    RadioButtonModule,
    AccordionModule
  ]
})
export class OrdenesServicioModule {
}
