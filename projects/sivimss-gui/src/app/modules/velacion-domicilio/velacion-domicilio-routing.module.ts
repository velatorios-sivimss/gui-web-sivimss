import {RouterModule, Routes} from "@angular/router";
import {VelacionDomicilioComponent} from "./components/velacion-domicilio/velacion-domicilio.component";
import {NgModule} from "@angular/core";
import {
  DetalleVelacionDomicilioComponent
} from "./components/detalle-velacion-domicilio/detalle-velacion-domicilio.component";
import {GenerarValeSalidaComponent} from "./components/generar-vale-salida/generar-vale-salida.component";

const routes:Routes = [
  {
    path:'',
    component: VelacionDomicilioComponent
  },
  {
    path: 'generar-vale-salida',
    component: GenerarValeSalidaComponent
  },
  {
    path: 'ver-detalle/:id',
    component: DetalleVelacionDomicilioComponent
  }
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class VelacionDomicilioRoutingModule {

}
