import { PreRegistroContratacionNuevoConvenioComponent } from './components/pre-registro-contratacion-nuevo-convenio/pre-registro-contratacion-nuevo-convenio.component'
import { SeguimientoNuevoConvenioResolver } from './services/seguimiento-nuevo-convenio.resolver'
import { SeguimientoNuevoConvenioComponent } from './components/seguimiento-nuevo-convenio/seguimiento-nuevo-convenio.component'
import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'

const routes: Route[] = [
  {
    path: '',
    component: SeguimientoNuevoConvenioComponent,
  },
  {
    path: 'pre-registro-nuevo-convenio',
    component: PreRegistroContratacionNuevoConvenioComponent,
    resolve: {
      respuesta: SeguimientoNuevoConvenioResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SeguimientoNuevoConvenioResolver],
})
export class SeguimientoNuevoConvenioRoutingModule {}
