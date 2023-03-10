import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservarSalasRoutingModule } from './reservar-salas-routing.module';
import { ReservarSalasComponent } from './components/reservar-salas/reservar-salas.component';
import { TituloPrincipalModule } from '../../shared/titulo-principal/titulo-principal.module';


@NgModule({
  declarations: [
    ReservarSalasComponent
  ],
  imports: [
    CommonModule,
    ReservarSalasRoutingModule,
    TituloPrincipalModule,
  ]
})
export class ReservarSalasModule { }
