import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioAutenticacionComponent } from './components/inicio-autenticacion/inicio-autenticacion.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { NuevaContrasenaComponent } from './components/nueva-contrasena/nueva-contrasena.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';

const routes: Routes = [
  {
    path: '', component: InicioAutenticacionComponent,
    children: [
      {
        path: '', component: InicioSesionComponent,
      },
      {
        path: 'recuperar-contrasena', component: RecuperarContrasenaComponent
      },
      {
        path: 'nueva-contrasena', component: NuevaContrasenaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacionRoutingModule { }
