import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarPaqueteComponent } from './components/agregar-paquete/agregar-paquete.component';
import { ActualizarPaqueteComponent } from './components/actualizar-paquete/actualizar-paquete.component';
import { PaquetesComponent } from './components/listado-paquete/paquetes.component';

const routes: Routes = [
  {
    path: '', component: PaquetesComponent,
  },
  {
    path: 'agregar-paquete', component: AgregarPaqueteComponent,
  },
  {
    path: 'modificar-paquete/:id', component: ActualizarPaqueteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaquetesRoutingModule {
}
