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
import { StepperModule } from '../../shared/stepper/stepper.module';
import { DialogModule } from 'primeng-lts/dialog';
import { StepsModule } from 'primeng-lts/steps';
import { AgregarVehiculoComponent } from './components/agregar-vehiculo/agregar-vehiculo.component';
import { ModificarVehiculoComponent } from './components/modificar-vehiculo/modificar-vehiculo.component';
import { VerDetalleVehiculoComponent } from './components/ver-detalle-vehiculo/ver-detalle-vehiculo.component';

@NgModule({
  declarations: [
    InventarioVehicularComponent,
    AgregarVehiculoComponent,
    ModificarVehiculoComponent,
    VerDetalleVehiculoComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
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
    // StepperModule,
    StepsModule
  ],
  providers: [InventarioVehicularService]
})
export class InventarioVehicularModule { }
