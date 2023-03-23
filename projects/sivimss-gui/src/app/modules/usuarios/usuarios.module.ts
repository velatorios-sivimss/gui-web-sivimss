import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CeldaStickyModule } from "projects/sivimss-gui/src/app/shared/celda-sticky/celda-sticky.module";

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
import { AgregarUsuarioComponent } from './components/agregar-usuario/agregar-usuario.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { VerDetalleUsuarioComponent } from './components/ver-detalle-usuario/ver-detalle-usuario.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    AgregarUsuarioComponent,
    ModificarUsuarioComponent,
    VerDetalleUsuarioComponent
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
    TablePanelModule,
    CeldaStickyModule
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuariosModule {
}
