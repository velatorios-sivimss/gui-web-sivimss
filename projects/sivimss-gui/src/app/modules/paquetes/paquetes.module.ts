import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  OverlayPanelOpcionesModule
} from "projects/sivimss-gui/src/app/shared/overlay-panel-opciones/overlay-panel-opciones.module";
import { TablePanelModule } from "projects/sivimss-gui/src/app/shared/table-panel/table-panel.module";

import { PaquetesRoutingModule } from './paquetes-routing.module';
import { PaquetesComponent } from './components/paquetes.component';
import { AgregarPaqueteComponent } from './components/agregar-paquete/agregar-paquete.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TituloPrincipalModule } from "../../shared/titulo-principal/titulo-principal.module";
import { PaqueteService } from "./services/paquetes.service";
import { DropdownModule } from "primeng-lts/dropdown";
import { TableModule } from "primeng-lts/table";
import { InputSwitchModule } from "primeng-lts/inputswitch";
import { DialogModule } from "primeng-lts/dialog";
import { OverlayPanelModule } from "primeng-lts/overlaypanel";
import { CheckboxModule } from 'primeng-lts/checkbox';
import { VerDetallePaqueteComponent } from './components/ver-detalle-paquete/ver-detalle-paquete.component';
import { UtileriaModule } from '../../shared/utileria/utileria.module';

@NgModule({
  declarations: [
    PaquetesComponent,
    AgregarPaqueteComponent,
    VerDetallePaqueteComponent,
  ],
  imports: [
    CommonModule,
    PaquetesRoutingModule,
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
  ],
  providers: [
    PaqueteService
  ]
})
export class PaquetesModule {
}
