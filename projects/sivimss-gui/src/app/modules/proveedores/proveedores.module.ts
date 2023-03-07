import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { AdministrarProveedoresComponent } from './components/administrar-proveedores/administrar-proveedores.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TituloPrincipalModule} from "../../shared/titulo-principal/titulo-principal.module";
import { ProveedoresService } from './services/proveedores.service';
import {DropdownModule} from "primeng-lts/dropdown";
import {TableModule} from "primeng-lts/table";
import {InputSwitchModule} from "primeng-lts/inputswitch";
import {DialogModule} from "primeng-lts/dialog";
import {CalendarModule} from "primeng-lts/calendar";
import {OverlayPanelModule} from "primeng-lts/overlaypanel";
import {OverlayPanelOpcionesModule} from "../../shared/overlay-panel-opciones/overlay-panel-opciones.module";
import {TablePanelModule} from "../../shared/table-panel/table-panel.module";
import { CheckboxModule } from 'primeng-lts/checkbox';
import { AgregarProveedorComponent } from './components/agregar-proveedor/agregar-proveedor.component';
import { ModificarProveedorComponent } from './components/modificar-proveedor/modificar-proveedor.component';
import { DetalleProveedorComponent } from './components/detalle-proveedor/detalle-proveedor.component';
import { DynamicDialogModule } from 'primeng-lts/dynamicdialog';
import { StepsModule } from 'primeng-lts/steps';
import {AccordionModule} from 'primeng-lts/accordion';

@NgModule({
  declarations: [
    AdministrarProveedoresComponent,
    AgregarProveedorComponent,
    ModificarProveedorComponent,
    DetalleProveedorComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
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
    CheckboxModule,
    DynamicDialogModule,
    StepsModule,
    AccordionModule
  ],
  providers: [
    ProveedoresService
  ]
})
export class ProveedoresModule {
}
