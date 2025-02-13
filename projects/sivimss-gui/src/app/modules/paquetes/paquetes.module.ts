import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  OverlayPanelOpcionesModule
} from "projects/sivimss-gui/src/app/shared/overlay-panel-opciones/overlay-panel-opciones.module";
import { TablePanelModule } from "projects/sivimss-gui/src/app/shared/table-panel/table-panel.module";
import { UtileriaModule } from '../../shared/utileria/utileria.module';
import {AutoCompleteModule} from 'primeng-lts/autocomplete';
import { PaquetesRoutingModule } from './paquetes-routing.module';
import { PaquetesComponent } from './components/paquetes/paquetes.component';
import { AgregarPaquetesComponent } from './components/agregar-paquetes/agregar-paquetes.component';
import { ActualizarPaquetesComponent } from './components/modificar-paquetes/actualizar-paquetes.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TituloPrincipalModule } from "../../shared/titulo-principal/titulo-principal.module";
import { PaquetesService } from "./services/paquetes.service";
import { DropdownModule } from "primeng-lts/dropdown";
import { TableModule } from "primeng-lts/table";
import { InputSwitchModule } from "primeng-lts/inputswitch";
import { DialogModule } from "primeng-lts/dialog";
import { OverlayPanelModule } from "primeng-lts/overlaypanel";
import { CheckboxModule } from 'primeng-lts/checkbox';
import { VerDetallePaquetesComponent } from './components/ver-detalle-paquetes/ver-detalle-paquetes.component';

@NgModule({
  declarations: [
    PaquetesComponent,
    AgregarPaquetesComponent,
    VerDetallePaquetesComponent,
    ActualizarPaquetesComponent,
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
    AutoCompleteModule,
  ],
  providers: [
    PaquetesService
  ]
})
export class PaquetesModule {
}
