import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  GenerarOrdenServicioComponent
} from "projects/sivimss-gui/src/app/modules/ordenes-servicio/components/generar-orden-servicio/generar-orden-servicio.component";
import {
  OrdenesServicioComponent
} from 'projects/sivimss-gui/src/app/modules/ordenes-servicio/components/ordenes-servicio/ordenes-servicio.component';

const routes: Routes = [
  {
    path: '',
    component: OrdenesServicioComponent
  },
  {
    path: 'generar-orden-de-servicio',
    component: GenerarOrdenServicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenesServicioRoutingModule {
}
