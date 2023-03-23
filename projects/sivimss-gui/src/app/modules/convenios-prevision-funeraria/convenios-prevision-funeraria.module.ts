import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {
  OverlayPanelOpcionesModule
} from "projects/sivimss-gui/src/app/shared/overlay-panel-opciones/overlay-panel-opciones.module";
import { TituloPrincipalModule } from "../../shared/titulo-principal/titulo-principal.module";

import { TablePanelModule } from "projects/sivimss-gui/src/app/shared/table-panel/table-panel.module";

import {ConveniosPrevisionFunerariaRoutingModule} from "./convenios-prevision-funeraria-routing.module";
import {ConsultaConveniosService} from "./services/consulta-convenios.service";

import {CeldaStickyModule} from "../../shared/celda-sticky/celda-sticky.module";

import { DropdownModule } from "primeng-lts/dropdown";
import { TableModule } from "primeng-lts/table";
import { InputSwitchModule } from "primeng-lts/inputswitch";
import { DialogModule } from "primeng-lts/dialog";
import { OverlayPanelModule } from "primeng-lts/overlaypanel";
import { DynamicDialogModule } from 'primeng-lts/dynamicdialog';
import {PanelModule} from "primeng-lts/panel";
import {AccordionModule} from "primeng-lts/accordion";
import {InputTextModule} from "primeng-lts/inputtext";
import { StepsModule } from 'primeng-lts/steps';
import {CalendarModule} from "primeng-lts/calendar";
import {CheckboxModule} from "primeng-lts/checkbox";
import {RadioButtonModule} from "primeng-lts/radiobutton";

import {ConsultaConveniosComponent} from "./components/convenios-prevision-funeraria/convenios-prevision-funeraria.component";
import { DetalleConvenioPrevisionFunerariaComponent } from './components/detalle-convenio-prevision-funeraria/detalle-convenio-prevision-funeraria.component';
import { AgregarConveniosPrevisionFunerariaComponent } from './components/agregar-convenios-prevision-funeraria/agregar-convenios-prevision-funeraria.component';
import { AgregarPersonaConveniosPrevisionFunerariaComponent } from './components/agregar-persona-convenios-prevision-funeraria/agregar-persona-convenios-prevision-funeraria.component';
import { AgregarBeneficiarioConveniosPrevisionFunerariaComponent } from './components/agregar-beneficiario-convenios-prevision-funeraria/agregar-beneficiario-convenios-prevision-funeraria.component';
// import { DetalleBeneficiarioConveniosPrevisionFunerariaComponent } from './components/detalle-beneficiario-convenios-prevision-funeraria/detalle-beneficiario-convenios-prevision-funeraria.component';

@NgModule({
  declarations:[
    ConsultaConveniosComponent,
    DetalleConvenioPrevisionFunerariaComponent,
    AgregarConveniosPrevisionFunerariaComponent,
    AgregarPersonaConveniosPrevisionFunerariaComponent,
    AgregarBeneficiarioConveniosPrevisionFunerariaComponent,
    // DetalleBeneficiarioConveniosPrevisionFunerariaComponent,
  ],
  imports:[
    CommonModule,
    ConveniosPrevisionFunerariaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    DynamicDialogModule,
    TituloPrincipalModule,
    TableModule,
    InputSwitchModule,
    DialogModule,
    OverlayPanelModule,
    OverlayPanelOpcionesModule,
    TablePanelModule,
    CeldaStickyModule,
    PanelModule,
    AccordionModule,
    InputTextModule,
    StepsModule,
    CalendarModule,
    CheckboxModule,
    RadioButtonModule,
  ],
  providers:[
    ConsultaConveniosService
  ]

})

export class ConveniosPrevisionFunerariaModule {}
