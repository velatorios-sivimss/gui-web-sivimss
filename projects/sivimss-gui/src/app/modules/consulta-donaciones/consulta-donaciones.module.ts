import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AccordionModule} from "primeng-lts/accordion";
import {CalendarModule} from "primeng-lts/calendar";
import {CheckboxModule } from 'primeng-lts/checkbox';
import {DialogModule} from "primeng-lts/dialog";
import {DropdownModule} from "primeng-lts/dropdown";
import {DynamicDialogModule} from "primeng-lts/dynamicdialog";
import {InputSwitchModule} from "primeng-lts/inputswitch";
import {OverlayPanelModule} from "primeng-lts/overlaypanel";
import {RadioButtonModule} from "primeng-lts/radiobutton";
import {StepsModule} from "primeng-lts/steps";
import {TableModule} from "primeng-lts/table";

import {CeldaStickyModule} from "../../shared/celda-sticky/celda-sticky.module";
import {OverlayPanelOpcionesModule} from "../../shared/overlay-panel-opciones/overlay-panel-opciones.module";
import {TablePanelModule} from "../../shared/table-panel/table-panel.module";
import {TituloPrincipalModule} from "../../shared/titulo-principal/titulo-principal.module";


import {ConsultaDonacionesService} from "./services/consulta-donaciones.service";
import {ConsultaDonacionesRoutingModule} from "./consulta-donaciones-routing.module";
import {ConsultaDonacionesComponent} from "./components/consulta-donaciones/consulta-donaciones.component";
import {AceptacionDonacionComponent } from './components/aceptacion-donacion/aceptacion-donacion.component';
import {RegistrarDonacionComponent} from "./components/registrar-donacion/registrar-donacion.component";
import {AgregarAtaudDonadoComponent } from './components/agregar-ataud-donado/agregar-ataud-donado.component';
import {ControlSalidaDonacionesComponent } from './components/control-salida-donaciones/control-salida-donaciones.component';
import {AgregarFinadoComponent } from './components/control-salida-donaciones/agregar-finado/agregar-finado.component';
import {AgregarAtaudComponent } from './components/control-salida-donaciones/agregar-ataud/agregar-ataud.component';


@NgModule({
  declarations: [
    ConsultaDonacionesComponent,
    AceptacionDonacionComponent,
    RegistrarDonacionComponent,
    AgregarAtaudDonadoComponent,
    ControlSalidaDonacionesComponent,
    AgregarFinadoComponent,
    AgregarAtaudComponent
  ],
  imports: [
    CommonModule,
    ConsultaDonacionesRoutingModule,
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
    StepsModule,
    RadioButtonModule,
    AccordionModule,
    CheckboxModule
  ],
  providers: [
    ConsultaDonacionesService
  ]
})

export class ConsultaDonacionesModule {

}
