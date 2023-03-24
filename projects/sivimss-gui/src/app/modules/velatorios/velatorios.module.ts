import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelatoriosRoutingModule } from './velatorios-routing.module';
import { VelatoriosComponent } from './components/velatorios/velatorios.component';
import { AgregarVelatorioComponent } from './components/agregar-velatorio/agregar-velatorio.component';
import { DetalleVelatorioComponent } from './components/detalle-velatorio/detalle-velatorio.component';
import { ModificarVelatorioComponent } from './components/modificar-velatorio/modificar-velatorio.component';
import { ActivarVelatorioComponent } from './components/activar-velatorio/activar-velatorio.component';
import {TituloPrincipalModule} from "../../shared/titulo-principal/titulo-principal.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng-lts/dropdown";
import {TableModule} from "primeng-lts/table";
import {InputSwitchModule} from "primeng-lts/inputswitch";
import {OverlayPanelModule} from "primeng-lts/overlaypanel";
import {OverlayPanelOpcionesModule} from "../../shared/overlay-panel-opciones/overlay-panel-opciones.module";
import {TablePanelModule} from "../../shared/table-panel/table-panel.module";


@NgModule({
  declarations: [
    VelatoriosComponent,
    AgregarVelatorioComponent,
    DetalleVelatorioComponent,
    ModificarVelatorioComponent,
    ActivarVelatorioComponent
  ],
  imports: [
    CommonModule,
    VelatoriosRoutingModule,
    TituloPrincipalModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    TableModule,
    InputSwitchModule,
    OverlayPanelModule,
    OverlayPanelOpcionesModule,
    TablePanelModule
  ]
})
export class VelatoriosModule { }
