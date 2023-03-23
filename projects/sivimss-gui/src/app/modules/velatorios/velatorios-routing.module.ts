import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VelatoriosComponent} from "./components/velatorios/velatorios.component";

const routes: Routes = [{
  path: '',
  component: VelatoriosComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VelatoriosRoutingModule { }
