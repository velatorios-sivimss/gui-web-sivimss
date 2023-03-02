import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { InventarioVehicularComponent } from './components/inventario-vehicular/inventario-vehicular.component';

const routes: Route[] = [{
    path: '',
    component: InventarioVehicularComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventarioVehicularRoutingModule { }
