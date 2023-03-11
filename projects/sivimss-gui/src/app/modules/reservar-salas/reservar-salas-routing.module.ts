import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservarSalasComponent } from './components/reservar-salas/reservar-salas.component';
import { ListadoSalasComponent } from './components/listado-salas/listado-salas.component';
import { CalendarioSalasComponent } from './components/calendario-salas/calendario-salas.component';

const routes: Routes = [
  {
    path: '',
    component: ReservarSalasComponent,
    children: [{
      path: 'salas',
      component: ListadoSalasComponent,
      outlet: 'salas'
    }, {
      path: 'calendario',
      component: CalendarioSalasComponent,
      outlet: 'salas'
    }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservarSalasRoutingModule { }
