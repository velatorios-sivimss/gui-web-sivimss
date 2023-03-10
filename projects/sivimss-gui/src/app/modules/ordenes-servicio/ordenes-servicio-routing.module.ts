import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  OrdenesServicioComponent
} from 'projects/sivimss-gui/src/app/modules/ordenes-servicio/components/ordenes-servicio/ordenes-servicio.component';

const routes: Routes = [
  {
    path: '',
    component: OrdenesServicioComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenesServicioRoutingModule {
}
