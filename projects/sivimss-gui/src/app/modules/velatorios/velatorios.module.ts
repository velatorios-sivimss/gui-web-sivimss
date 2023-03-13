import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelatoriosRoutingModule } from './velatorios-routing.module';
import { VelatoriosComponent } from './components/velatorios/velatorios.component';
import { AgregarVelatorioComponent } from './components/agregar-velatorio/agregar-velatorio.component';
import { DetalleVelatorioComponent } from './components/detalle-velatorio/detalle-velatorio.component';
import { VerDetalleVelatorioComponent } from './components/ver-detalle-velatorio/ver-detalle-velatorio.component';
import { ModificarVelatorioComponent } from './components/modificar-velatorio/modificar-velatorio.component';
import { ActivarVelatorioComponent } from './components/activar-velatorio/activar-velatorio.component';


@NgModule({
  declarations: [
    VelatoriosComponent,
    AgregarVelatorioComponent,
    DetalleVelatorioComponent,
    VerDetalleVelatorioComponent,
    ModificarVelatorioComponent,
    ActivarVelatorioComponent
  ],
  imports: [
    CommonModule,
    VelatoriosRoutingModule
  ]
})
export class VelatoriosModule { }
