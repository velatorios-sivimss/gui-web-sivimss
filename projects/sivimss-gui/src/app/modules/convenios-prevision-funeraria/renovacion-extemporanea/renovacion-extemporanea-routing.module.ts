import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'
import { RenovacionExtemporaneaComponent } from './components/renovacion-extemporanea/renovacion-extemporanea.component'
import { RenovacionExtemporaneaResolver } from './services/renovacion-extemporanea.resolver'

const routes: Route[] = [
  {
    path: '',
    component: RenovacionExtemporaneaComponent,
    resolve: {
      respuesta: RenovacionExtemporaneaResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RenovacionExtemporaneaResolver],
})
export class RenovacionExtemporaneaRoutingModule {}
