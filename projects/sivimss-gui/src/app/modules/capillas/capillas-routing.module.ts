import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapillasComponent } from './components/capillas.component';

const routes: Routes = [{path: '', component: CapillasComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapillasRoutingModule {
}
