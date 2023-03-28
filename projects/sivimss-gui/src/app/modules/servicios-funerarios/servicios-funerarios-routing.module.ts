import {NgModule} from "@angular/core";
import {RouterModule,Routes} from "@angular/router";

import {ServiciosFunerariosComponent} from "./components/servicios-funerarios/servicios-funerarios.component";
import {
  DetalleServiciosFunerariosComponent
} from "./components/detalle-servicios-funerarios/detalle-servicios-funerarios.component";

const routes: Routes = [
  {
    path:'',
    component: ServiciosFunerariosComponent
  },
  {
    path:'detalle-pago/:id',
    component: DetalleServiciosFunerariosComponent,
  }
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class ServiciosFunerariosRoutingModule {

}
