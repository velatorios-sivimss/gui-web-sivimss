import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservarSalasComponent } from './components/reservar-salas/reservar-salas.component';

const routes: Routes = [{
  path: '',
  component: ReservarSalasComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservarSalasRoutingModule { }
