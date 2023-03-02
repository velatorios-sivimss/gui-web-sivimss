import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng-lts/dropdown';
import { TableModule } from 'primeng-lts/table';
import { InputSwitchModule } from 'primeng-lts/inputswitch';
import { OverlayPanelModule } from 'primeng-lts/overlaypanel';

import { InventarioVehicularRoutingModule } from './inventario-vehicular-routing.module';
import { InventarioVehicularService } from './services/inventario-vehicular.service';
import { InventarioVehicularComponent } from './components/inventario-vehicular/inventario-vehicular.component';
import { OverlayPanelOpcionesModule } from '../../shared/overlay-panel-opciones/overlay-panel-opciones.module';
import { TituloPrincipalModule } from '../../shared/titulo-principal/titulo-principal.module';
import { TablePanelModule } from '../../shared/table-panel/table-panel.module';

@NgModule({
  declarations: [
    InventarioVehicularComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    InputSwitchModule,
    InventarioVehicularRoutingModule,
    OverlayPanelModule,
    OverlayPanelOpcionesModule,
    ReactiveFormsModule,
    TableModule,
    TablePanelModule,
    TituloPrincipalModule,
  ],
  providers: [InventarioVehicularService]
})
export class InventarioVehicularModule { }
