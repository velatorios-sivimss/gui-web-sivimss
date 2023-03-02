import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioVehicularRoutingModule } from './inventario-vehicular-routing.module';
import { InventarioVehicularService } from './services/inventario-vehicular.service';
import { InventarioVehicularComponent } from './components/inventario-vehicular/inventario-vehicular.component';
import { TituloPrincipalModule } from '../../shared/titulo-principal/titulo-principal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng-lts/dropdown';

@NgModule({
  declarations: [
    InventarioVehicularComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InventarioVehicularRoutingModule,
    ReactiveFormsModule,
    TituloPrincipalModule,
    DropdownModule
  ],
  providers: [InventarioVehicularService]
})
export class InventarioVehicularModule { }
