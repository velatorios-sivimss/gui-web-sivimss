import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  OverlayPanelOpcionesModule
} from "projects/sivimss-gui/src/app/shared/overlay-panel-opciones/overlay-panel-opciones.module";
import { TablePanelModule } from "projects/sivimss-gui/src/app/shared/table-panel/table-panel.module";
import { UtileriaModule } from '../../../shared/utileria/utileria.module';
import {AutoCompleteModule} from 'primeng-lts/autocomplete';
import { ContratosRoutingModule } from './contratos-routing.module';
import { ContratosComponent } from './components/contratos/contratos.component';
import { AgregarContratosComponent } from './components/agregar-contratos/agregar-contratos.component';
import { VerDetalleContratosComponent } from './components/ver-detalle-contratos/ver-detalle-contratos.component';
import { ModificarContratosComponent } from './components/modificar-contratos/modificar-contratos.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TituloPrincipalModule } from "../../../shared/titulo-principal/titulo-principal.module";
import { ContratosService } from "./services/contratos.service";
import { DropdownModule } from "primeng-lts/dropdown";
import { TableModule } from "primeng-lts/table";
import { InputSwitchModule } from "primeng-lts/inputswitch";
import { DialogModule } from "primeng-lts/dialog";
import { OverlayPanelModule } from "primeng-lts/overlaypanel";
import { CheckboxModule } from 'primeng-lts/checkbox';
import {CalendarModule} from 'primeng-lts/calendar';
import { StepsModule } from 'primeng-lts/steps';

@NgModule({
  declarations: [
    ContratosComponent,
    AgregarContratosComponent,
    VerDetalleContratosComponent,
    ModificarContratosComponent,
  ],
  imports: [
    CommonModule,
    ContratosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    TituloPrincipalModule,
    TableModule,
    InputSwitchModule,
    DialogModule,
    OverlayPanelModule,
    OverlayPanelOpcionesModule,
    TablePanelModule,
    CheckboxModule,
    UtileriaModule,
    AutoCompleteModule,
    CalendarModule,
    StepsModule,
  ],
  providers: [
    ContratosService
  ]
})
export class ContratosModule {
}
