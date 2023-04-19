import { FullCalendarModule } from '@fullcalendar/angular';
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {DialogModule} from "primeng-lts/dialog";
import {DropdownModule} from "primeng-lts/dropdown";
import {DynamicDialogModule} from "primeng-lts/dynamicdialog";
import {OverlayPanelModule} from "primeng-lts/overlaypanel";
import {SelectButtonModule} from "primeng-lts/selectbutton";
import {OverlayPanelOpcionesModule} from "../../shared/overlay-panel-opciones/overlay-panel-opciones.module";
import {TituloPrincipalModule} from "../../shared/titulo-principal/titulo-principal.module";
import {TablePanelModule} from "../../shared/table-panel/table-panel.module";

import {CapillaReservacionComponent} from "./components/capilla-reservacion/capilla-reservacion.component";
import {CapillaReservacionRoutingModule} from "./capilla-reservacion-routing.module";
import {CapillaReservacionService} from "./services/capilla-reservacion.service";
import {CalendarModule} from "primeng-lts/calendar";
import { RegistrarEntradaComponent } from './components/registrar-entrada/registrar-entrada.component';
import { RegistrarSalidaComponent } from './components/registrar-salida/registrar-salida.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { DetalleActividadDiaComponent } from './components/detalle-actividad-dia/detalle-actividad-dia.component';
import {AccordionModule} from "primeng-lts/accordion";
import { TabViewModule } from 'primeng-lts/tabview';

@NgModule({
  declarations:[CapillaReservacionComponent, RegistrarEntradaComponent, RegistrarSalidaComponent, CalendarioComponent, DetalleActividadDiaComponent],
  imports: [
    CommonModule,
    CapillaReservacionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    DynamicDialogModule,
    TituloPrincipalModule,
    DialogModule,
    OverlayPanelModule,
    OverlayPanelOpcionesModule,
    TablePanelModule,
    SelectButtonModule,
    CalendarModule,
    FullCalendarModule,
    AccordionModule,
    TabViewModule,
  ],
  providers:[
    CapillaReservacionService
  ]
})

export class CapillaReservacionModule {

}
