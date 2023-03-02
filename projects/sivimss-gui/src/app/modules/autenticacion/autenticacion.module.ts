import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng-lts/card';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { InicioAutenticacionComponent } from './components/inicio-autenticacion/inicio-autenticacion.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { NuevaContrasenaComponent } from './components/nueva-contrasena/nueva-contrasena.component';
import { DialogModule } from "primeng-lts/dialog";
import { UtileriaModule } from "projects/sivimss-gui/src/app/shared/utileria/utileria.module";

@NgModule({
  declarations: [
    InicioSesionComponent,
    InicioAutenticacionComponent,
    RecuperarContrasenaComponent,
    NuevaContrasenaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    AutenticacionRoutingModule,
    UtileriaModule,
    DialogModule
  ]
})
export class AutenticacionModule {
}
