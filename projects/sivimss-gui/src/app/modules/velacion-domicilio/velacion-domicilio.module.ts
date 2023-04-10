import {NgModule} from "@angular/core";
import {VelacionDomicilioService} from "./services/velacion-domicilio.service";
import {VelacionDomicilioComponent} from "./components/velacion-domicilio/velacion-domicilio.component";
import {VelacionDomicilioRoutingModule} from "./velacion-domicilio-routing.module";
import {CommonModule} from "@angular/common";
import {ServiciosRoutingModule} from "../servicios/servicios-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng-lts/dropdown";
import {DynamicDialogModule} from "primeng-lts/dynamicdialog";
import {TituloPrincipalModule} from "../../shared/titulo-principal/titulo-principal.module";
import {TableModule} from "primeng-lts/table";
import {InputSwitchModule} from "primeng-lts/inputswitch";
import {DialogModule} from "primeng-lts/dialog";
import {OverlayPanelModule} from "primeng-lts/overlaypanel";
import {OverlayPanelOpcionesModule} from "../../shared/overlay-panel-opciones/overlay-panel-opciones.module";
import {TablePanelModule} from "../../shared/table-panel/table-panel.module";
import {CeldaStickyModule} from "../../shared/celda-sticky/celda-sticky.module";
import {CalendarModule} from "primeng-lts/calendar";
import {AccordionModule} from "primeng-lts/accordion";
import { RegistrarEntradaEquipoComponent } from './components/registrar-entrada-equipo/registrar-entrada-equipo.component';
import { DetalleVelacionDomicilioComponent } from './components/detalle-velacion-domicilio/detalle-velacion-domicilio.component';
import { GenerarValeSalidaComponent } from './components/generar-vale-salida/generar-vale-salida.component';


@NgModule({
  declarations:[
    VelacionDomicilioComponent,
    RegistrarEntradaEquipoComponent,
    DetalleVelacionDomicilioComponent,
    GenerarValeSalidaComponent
  ],
  imports: [
    VelacionDomicilioRoutingModule,
    CommonModule,
    ServiciosRoutingModule,
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
    CalendarModule,
    AccordionModule
  ],
  providers:[
    VelacionDomicilioService,
  ]
})

export class VelacionDomicilioModule{

}
