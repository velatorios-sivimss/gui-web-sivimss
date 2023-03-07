import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarPaqueteComponent } from './components/agregar-paquete/agregar-paquete.component';
import { PaquetesComponent } from './components/paquetes.component';

// const routes: Routes = [
//   {
//     path: '', component: PaquetesComponent,
//     children: [
//       {
//         path: 'agregar-paquete', component: AgregarPaqueteComponent
//       },
//     ]
//   }
// ];

const routes: Routes = [
  {
    path: '', component: PaquetesComponent,
  },
  {
    path: 'agregar-paquete', component: AgregarPaqueteComponent,
  },
  {
    path: 'modificar-paquete', component: AgregarPaqueteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaquetesRoutingModule {
}
