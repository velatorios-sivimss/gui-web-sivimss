import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng-lts/dropdown';
import { DynamicDialogModule } from 'primeng-lts/dynamicdialog';
import { TableModule } from 'primeng-lts/table';
import { InputSwitchModule } from 'primeng-lts/inputswitch';
import { OverlayPanelModule } from 'primeng-lts/overlaypanel';

import { TituloPrincipalModule } from '../../shared/titulo-principal/titulo-principal.module';
import { TablePanelModule } from '../../shared/table-panel/table-panel.module';
import { OverlayPanelOpcionesModule } from '../../shared/overlay-panel-opciones/overlay-panel-opciones.module';
import { DialogModule } from 'primeng-lts/dialog';
import { StepsModule } from 'primeng-lts/steps';
import { AutoCompleteModule } from 'primeng-lts/autocomplete';
import { InputTextareaModule } from 'primeng-lts/inputtextarea';

import { CalendarModule } from 'primeng-lts/calendar';
import { AccordionModule } from 'primeng-lts/accordion';
import { UtileriaModule } from '../../shared/utileria/utileria.module';
import { GenerarNotaRemisionComponent } from './components/generar-nota-remision/generar-nota-remision.component';
import { GenerarNotaRemisionService } from './services/generar-nota-remision.service';
import { GenerarReciboRoutingModule } from './generar-nota-remision.routing.module';
import { FormatoGenerarNotaRemisionComponent } from './components/formato-generar-nota-remision/formato-generar-nota-remision.component';
import { DetalleFormatoGenerarNotaRemisionComponent } from './components/detalle-formato-generar-nota-remision/detalle-formato-generar-nota-remision.component';
import { ModalNotaRemisionComponent } from './components/modal/modal-nota-remision/modal-nota-remision.component';
import { CancelarFormatoGenerarNotaRemisionComponent } from './components/cancelar-formato-generar-nota-remision/cancelar-formato-generar-nota-remision.component';
import { LoaderModule } from '../../shared/loader/loader.module';

@NgModule({
  declarations: [
    GenerarNotaRemisionComponent,
    FormatoGenerarNotaRemisionComponent,
    DetalleFormatoGenerarNotaRemisionComponent,
    CancelarFormatoGenerarNotaRemisionComponent,
    ModalNotaRemisionComponent,
  ],
  imports: [
    CalendarModule,
    CommonModule,
    DialogModule,
    DropdownModule,
    DynamicDialogModule,
    FormsModule,
    InputSwitchModule,
    GenerarReciboRoutingModule,
    OverlayPanelModule,
    OverlayPanelOpcionesModule,
    ReactiveFormsModule,
    TableModule,
    TablePanelModule,
    TituloPrincipalModule,
    StepsModule,
    AccordionModule,
    AutoCompleteModule,
    UtileriaModule,
    InputTextareaModule,
    LoaderModule,
  ],
  providers: [GenerarNotaRemisionService]
})
export class GenerarNotaRemisionModule { }
