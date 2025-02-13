import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  OverlayPanelOpcionesModule
} from "projects/sivimss-gui/src/app/shared/overlay-panel-opciones/overlay-panel-opciones.module";
import { TablePanelModule } from "projects/sivimss-gui/src/app/shared/table-panel/table-panel.module";
import { UtileriaModule } from '../../shared/utileria/utileria.module';
import {AutoCompleteModule} from 'primeng-lts/autocomplete';
import { SalasRoutingModule } from './salas-routing.module';
import { SalasComponent } from './components/salas/salas.component';
import { AgregarSalasComponent } from './components/agregar-salas/agregar-salas.component';
import { VerDetalleSalasComponent } from './components/ver-detalle-salas/ver-detalle-salas.component';
import { ModificarSalasComponent } from './components/modificar-salas/modificar-salas.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TituloPrincipalModule } from "../../shared/titulo-principal/titulo-principal.module";
import { SalasService } from "./services/salas.service";
import { DropdownModule } from "primeng-lts/dropdown";
import { TableModule } from "primeng-lts/table";
import { InputSwitchModule } from "primeng-lts/inputswitch";
import { DialogModule } from "primeng-lts/dialog";
import { OverlayPanelModule } from "primeng-lts/overlaypanel";
import { CheckboxModule } from 'primeng-lts/checkbox';
import {CalendarModule} from 'primeng-lts/calendar';

@NgModule({
  declarations: [
    SalasComponent,
    AgregarSalasComponent,
    VerDetalleSalasComponent,
    ModificarSalasComponent,
  ],
  imports: [
    CommonModule,
    SalasRoutingModule,
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
  ],
  providers: [
    SalasService
  ]
})
export class SalasModule {
}
