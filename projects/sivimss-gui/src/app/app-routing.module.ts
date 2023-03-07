import {NgModule} from '@angular/core';
import {RouterModule, Routes, UrlSerializer} from '@angular/router';
import {PaginaNoEncontradaComponent} from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import {BloqueaUsuarioLogueadoGuard} from './services/security/bloquea-usuario-logueado.guard';
import {PermiteUsuarioLogueadoGuard} from './services/security/permite-usuario-logueado.guard';

const routes: Routes = [
  {
    path: 'pagina-no-encontrada',
    component: PaginaNoEncontradaComponent,
  },
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./modules/inicio/inicio.module').then((m) => m.InicioModule),
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./modules/autenticacion/autenticacion.module').then((m) => m.AutenticacionModule),
  },
  {
    path: 'roles',
    loadChildren: () => import('./modules/roles/roles.module').then(m => m.RolesModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: 'capillas',
    loadChildren: () => import('./modules/capillas/capillas.module').then(m => m.CapillasModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./modules/servicios/servicios.module').then(m => m.ServiciosModule)
  },
  {
    path: '**',
    component: PaginaNoEncontradaComponent,
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      paramsInheritanceStrategy: 'always',
      relativeLinkResolution: 'corrected',
      malformedUriErrorHandler: (
        error: URIError,
        urlSerializer: UrlSerializer,
        url: string
      ) => urlSerializer.parse('/pagina-no-encontrada'),
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
