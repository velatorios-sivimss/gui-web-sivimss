import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {DropdownModule} from "primeng-lts/dropdown";
import {DynamicDialogModule} from "primeng-lts/dynamicdialog";
import {TableModule} from "primeng-lts/table";
import {InputSwitchModule} from "primeng-lts/inputswitch";
import {DialogModule} from "primeng-lts/dialog";
import {OverlayPanelModule} from "primeng-lts/overlaypanel";
import {StepsModule} from "primeng-lts/steps";
import {CalendarModule} from "primeng-lts/calendar";

import {
  OverlayPanelOpcionesModule
} from "projects/sivimss-gui/src/app/shared/overlay-panel-opciones/overlay-panel-opciones.module";
import { TituloPrincipalModule } from "../../shared/titulo-principal/titulo-principal.module";

import { TablePanelModule } from "projects/sivimss-gui/src/app/shared/table-panel/table-panel.module";

import {ContratantesComponent} from "./components/contratantes/contratantes.component";
import {ContratantesRoutingModule} from "./contratantes-routing.module";
import {CeldaStickyModule} from "../../shared/celda-sticky/celda-sticky.module";
import {ContratantesService} from "./services/contratantes.service";
import { DetalleContratantesComponent } from './components/detalle-contratantes/detalle-contratantes.component';
import { ModificarContratantesComponent } from './components/modificar-contratantes/modificar-contratantes.component';

@NgModule({
  declarations: [
    ContratantesComponent,
    DetalleContratantesComponent,
    ModificarContratantesComponent,
  ],
  imports:[
    CommonModule,
    ContratantesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    DynamicDialogModule,
    TituloPrincipalModule,
    TableModule,
    InputSwitchModule,
    DialogModule,
    OverlayPanelModule,
    OverlayPanelOpcionesModule,
    TablePanelModule,
    CeldaStickyModule,
    StepsModule,
    CalendarModule,

  ],
  providers:[
    ContratantesService
  ],
})
export class ContratantesModule {}
