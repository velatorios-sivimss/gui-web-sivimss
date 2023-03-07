import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarProveedoresComponent } from './components/administrar-proveedores/administrar-proveedores.component';

const routes: Routes = [{ path: '', component: AdministrarProveedoresComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
