import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservarSalasRoutingModule } from './reservar-salas-routing.module';
import { ReservarSalasComponent } from './components/reservar-salas/reservar-salas.component';
import { TituloPrincipalModule } from '../../shared/titulo-principal/titulo-principal.module';
import { ListadoSalasComponent } from './components/listado-salas/listado-salas.component';
import { CalendarioSalasComponent } from './components/calendario-salas/calendario-salas.component';
import { VerActividadSalasComponent } from './components/ver-actividad-salas/ver-actividad-salas.component';


@NgModule({
  declarations: [
    ReservarSalasComponent,
    ListadoSalasComponent,
    CalendarioSalasComponent,
    VerActividadSalasComponent
  ],
  imports: [
    CommonModule,
    ReservarSalasRoutingModule,
    TituloPrincipalModule,
  ]
})
export class ReservarSalasModule { }
