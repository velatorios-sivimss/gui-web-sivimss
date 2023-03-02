import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioVehicularRoutingModule } from './inventario-vehicular-routing.module';
import { InventarioVehicularService } from './services/inventario-vehicular.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InventarioVehicularRoutingModule
  ],
  providers: [InventarioVehicularService]
})
export class InventarioVehicularModule { }
