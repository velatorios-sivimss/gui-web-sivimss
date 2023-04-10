import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng-lts/dropdown';
import { DynamicDialogModule } from 'primeng-lts/dynamicdialog';
import { TableModule } from 'primeng-lts/table';
import { InputSwitchModule } from 'primeng-lts/inputswitch';
import { OverlayPanelModule } from 'primeng-lts/overlaypanel';

import { TituloPrincipalModule } from 'projects/sivimss-gui/src/app/shared/titulo-principal/titulo-principal.module';
import { OverlayPanelOpcionesModule } from 'projects/sivimss-gui/src/app/shared/overlay-panel-opciones/overlay-panel-opciones.module';
import { TablePanelModule } from 'projects/sivimss-gui/src/app/shared/table-panel/table-panel.module';
import { DialogModule } from 'primeng-lts/dialog';
import { StepsModule } from 'primeng-lts/steps';

import { CalendarModule } from 'primeng-lts/calendar';
import { AccordionModule } from 'primeng-lts/accordion';
import { RenovacionExtemporaneaRoutingModule } from 'projects/sivimss-gui/src/app/modules/renovacion-extemporanea/renovacion-extemporanea-routing.module';
import { RenovacionExtemporaneaService } from 'projects/sivimss-gui/src/app/modules/renovacion-extemporanea/services/renovacion-extemporanea.service';
import { RenovacionExtemporaneaComponent } from 'projects/sivimss-gui/src/app/modules/renovacion-extemporanea/components/renovacion-extemporanea/renovacion-extemporanea.component';
import { DetalleRenovacionComponent } from 'projects/sivimss-gui/src/app/modules/renovacion-extemporanea/components/detalle-renovacion/detalle-renovacion.component';
import { HabilitarRenovacionComponent } from 'projects/sivimss-gui/src/app/modules/renovacion-extemporanea/components/habilitar-renovacion/habilitar-renovacion.component';

//as
@NgModule({
  declarations: [
    RenovacionExtemporaneaComponent,
    DetalleRenovacionComponent,
    HabilitarRenovacionComponent,
  ],
  imports: [
    CalendarModule,
    CommonModule,
    DialogModule,
    DropdownModule,
    DynamicDialogModule,
    FormsModule,
    InputSwitchModule,
    RenovacionExtemporaneaRoutingModule,
    OverlayPanelModule,
    OverlayPanelOpcionesModule,
    ReactiveFormsModule,
    TableModule,
    TablePanelModule,
    TituloPrincipalModule,
    StepsModule,
    AccordionModule
  ],
  providers: [RenovacionExtemporaneaService]
})
export class RenovacionExtemporaneaModule { }
