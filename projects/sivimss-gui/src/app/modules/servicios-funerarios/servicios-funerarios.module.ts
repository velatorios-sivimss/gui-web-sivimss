import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CeldaStickyModule } from "projects/sivimss-gui/src/app/shared/celda-sticky/celda-sticky.module";

import {CalendarModule} from "primeng-lts/calendar";
import {DialogModule} from "primeng-lts/dialog";
import {DropdownModule} from "primeng-lts/dropdown";
import {DynamicDialogModule} from "primeng-lts/dynamicdialog";
import {InputSwitchModule} from "primeng-lts/inputswitch";
import {MultiSelectModule} from "primeng-lts/multiselect";
import {OverlayPanelModule} from "primeng-lts/overlaypanel";
import {RadioButtonModule} from "primeng-lts/radiobutton";
import {StepsModule} from "primeng-lts/steps";
import {TableModule} from "primeng-lts/table";

import {
  OverlayPanelOpcionesModule
} from "projects/sivimss-gui/src/app/shared/overlay-panel-opciones/overlay-panel-opciones.module";
import { TituloPrincipalModule } from "../../shared/titulo-principal/titulo-principal.module";
import { TablePanelModule } from "projects/sivimss-gui/src/app/shared/table-panel/table-panel.module";

import {ServiciosFunerariosComponent} from "./components/servicios-funerarios/servicios-funerarios.component";
import {ServiciosFunerariosRoutingModule} from "./servicios-funerarios-routing.module";
import {ServiciosFunerariosService} from "./services/servicios-funerarios.service";
import { DetalleServiciosFunerariosComponent } from './components/detalle-servicios-funerarios/detalle-servicios-funerarios.component';
import { AltaServiciosFunerariosComponent } from './components/alta-servicios-funerarios/alta-servicios-funerarios.component';
import {AccordionModule} from "primeng-lts/accordion";
import { CancelarServiciosFunerariosComponent } from './components/cancelar-servicios-funerarios/cancelar-servicios-funerarios.component';
import { ModificarServiciosFunerariosComponent } from './components/modificar-servicios-funerarios/modificar-servicios-funerarios.component';

@NgModule({
  declarations:[
    ServiciosFunerariosComponent,
    DetalleServiciosFunerariosComponent,
    AltaServiciosFunerariosComponent,
    CancelarServiciosFunerariosComponent,
    ModificarServiciosFunerariosComponent
  ],
  imports:[
    CommonModule,
    ServiciosFunerariosRoutingModule,
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
    CalendarModule,
    MultiSelectModule,
    StepsModule,
    RadioButtonModule,
    AccordionModule,
  ],
  providers:[
    ServiciosFunerariosService
  ]
})

export class ServiciosFunerariosModule {

}
