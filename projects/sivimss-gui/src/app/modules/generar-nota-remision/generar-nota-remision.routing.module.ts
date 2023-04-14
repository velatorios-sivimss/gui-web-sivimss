import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { GenerarNotaRemisionComponent } from './components/generar-nota-remision/generar-nota-remision.component';
import { ReciboPagoTramitesComponent } from './components/recibo-pago-tramites/recibo-pago-tramites.component';
import { GenerarNotaRemisionResolver } from './services/generar-nota-remision.resolver';

const routes: Route[] = [
    {
        path: '',
        component: GenerarNotaRemisionComponent,
        resolve: {
            respuesta: GenerarNotaRemisionResolver,
        }
    },
    {
        path: 'formato',
        component: ReciboPagoTramitesComponent,
        resolve: {
            respuesta: GenerarNotaRemisionResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        GenerarNotaRemisionResolver
    ]
})
export class GenerarReciboRoutingModule { }
