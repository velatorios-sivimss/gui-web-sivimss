import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsuariosRoutingModule} from './usuarios-routing.module';
import {UsuariosComponent} from './components/usuarios/usuarios.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TituloPrincipalModule} from "../../shared/titulo-principal/titulo-principal.module";
import {UsuarioService} from "./services/usuario.service";
import {DropdownModule} from "primeng-lts/dropdown";
import {TableModule} from "primeng-lts/table";
import {InputSwitchModule} from "primeng-lts/inputswitch";
import {DialogModule} from "primeng-lts/dialog";
import {CalendarModule} from "primeng-lts/calendar";
import {OverlayPanelModule} from "primeng-lts/overlaypanel";
import {OverlayPanelOpcionesModule} from "../../shared/overlay-panel-opciones/overlay-panel-opciones.module";
import {TablePanelModule} from "../../shared/table-panel/table-panel.module";


@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    TituloPrincipalModule,
    TableModule,
    InputSwitchModule,
    DialogModule,
    CalendarModule,
    OverlayPanelModule,
    OverlayPanelOpcionesModule,
    TablePanelModule
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuariosModule {
}
