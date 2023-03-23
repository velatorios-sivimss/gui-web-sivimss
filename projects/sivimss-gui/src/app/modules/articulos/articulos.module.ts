import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng-lts/dropdown';
import { DynamicDialogModule } from 'primeng-lts/dynamicdialog';
import { TableModule } from 'primeng-lts/table';
import { InputSwitchModule } from 'primeng-lts/inputswitch';
import { OverlayPanelModule } from 'primeng-lts/overlaypanel';


import { TituloPrincipalModule } from '../../shared/titulo-principal/titulo-principal.module';
import { OverlayPanelOpcionesModule } from '../../shared/overlay-panel-opciones/overlay-panel-opciones.module';
import { TablePanelModule } from '../../shared/table-panel/table-panel.module';
import { DialogModule } from 'primeng-lts/dialog';
import { StepsModule } from 'primeng-lts/steps';

import { CalendarModule } from 'primeng-lts/calendar';
import { AccordionModule } from 'primeng-lts/accordion';
import { AdministrarArticulosComponent } from './components/administrar-articulos/administrar-articulos.component';
import { ArticulosService } from './services/articulos.service';
import { ArticulosRoutingModule } from './articulos.routing.module';
import { AgregarArticulosComponent } from './components/agregar-articulos/agregar-articulos.component';
import { DetalleArticulosComponent } from './components/detalle-articulos/detalle-articulos.component';
import { ModificarArticulosComponent } from './components/modificar-articulos/modificar-articulos.component';

//as
@NgModule({
  declarations: [
    AdministrarArticulosComponent,
    AgregarArticulosComponent,
    DetalleArticulosComponent,
    ModificarArticulosComponent,
  ],
  imports: [
    CalendarModule,
    CommonModule,
    DialogModule,
    DropdownModule,
    DynamicDialogModule,
    FormsModule,
    InputSwitchModule,
    ArticulosRoutingModule,
    OverlayPanelModule,
    OverlayPanelOpcionesModule,
    ReactiveFormsModule,
    TableModule,
    TablePanelModule,
    TituloPrincipalModule,
    StepsModule,
    AccordionModule
  ],
  providers: [ArticulosService]
})
export class ArticulosModule { }
