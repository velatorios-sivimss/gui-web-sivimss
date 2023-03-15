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
import {ConsultaConveniosComponent} from "./components/convenios-prevision-funeraria/convenios-prevision-funeraria.component";

@NgModule({
  declarations:[
    ConsultaConveniosComponent,
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
    PanelModule
  ],
  providers:[
    ConsultaConveniosService
  ]

})

export class ConveniosPrevisionFunerariaModule {}
