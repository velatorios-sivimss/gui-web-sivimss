import { AdministrarProveedoresComponent } from './components/administrar-proveedores/administrar-proveedores.component';
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
import { ProveedoresService } from './services/proveedores.service';
import { ProveedoresRoutingModule } from './proveedores.routing.module';
import { DetalleProveedorComponent } from './components/detalle-proveedor/detalle-proveedor.component';
import { AgregarProveedorComponent } from './components/agregar-proveedor/agregar-proveedor.component';
import { VerDetalleProveedorComponent } from './components/ver-detalle-proveedor/ver-detalle-proveedor.component';
import { ModificarProveedorComponent } from './components/modificar-proveedor/modificar-proveedor.component';
import { AccordionModule } from 'primeng-lts/accordion';

//as
@NgModule({
  declarations: [
    AdministrarProveedoresComponent,
    DetalleProveedorComponent,
    AgregarProveedorComponent,
    VerDetalleProveedorComponent,
    ModificarProveedorComponent,
  ],
  imports: [
    CalendarModule,
    CommonModule,
    DialogModule,
    DropdownModule,
    DynamicDialogModule,
    FormsModule,
    InputSwitchModule,
    ProveedoresRoutingModule,
    OverlayPanelModule,
    OverlayPanelOpcionesModule,
    ReactiveFormsModule,
    TableModule,
    TablePanelModule,
    TituloPrincipalModule,
    StepsModule,
    AccordionModule
  ],
  providers: [ProveedoresService]
})
export class ProveedoresModule { }
