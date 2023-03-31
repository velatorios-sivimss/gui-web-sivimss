import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSerializer } from '@angular/router';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { BloqueaUsuarioLogueadoGuard } from './services/security/bloquea-usuario-logueado.guard';
import { PermiteUsuarioLogueadoGuard } from './services/security/permite-usuario-logueado.guard';

const routes: Routes = [
  {
    path: 'pagina-no-encontrada',
    component: PaginaNoEncontradaComponent,
  },
  {
    path: '',
    loadChildren: () => import('./modules/inicio/inicio.module').then((m) => m.InicioModule),
    pathMatch: 'full',
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard],
  },
  {
    path: 'inicio',
    loadChildren: () => import('./modules/inicio/inicio.module').then((m) => m.InicioModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./modules/autenticacion/autenticacion.module').then((m) => m.AutenticacionModule),
    canActivate: [BloqueaUsuarioLogueadoGuard],
    canActivateChild: [BloqueaUsuarioLogueadoGuard]
  },
  {
    path: 'roles',
    loadChildren: () => import('./modules/roles/roles.module').then(m => m.RolesModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'capillas',
    loadChildren: () => import('./modules/capillas/capillas.module').then(m => m.CapillasModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'paquetes',
    loadChildren: () => import('./modules/paquetes/paquetes.module').then(m => m.PaquetesModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'ordenes-de-servicio',
    loadChildren: () => import('./modules/ordenes-servicio/ordenes-servicio.module').then(m => m.OrdenesServicioModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'contratos-putr/administrar-contratos',
    loadChildren: () => import('./modules/contratos-putr/administrar-contratos/contratos.module').then(m => m.ContratosModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'contratos-putr/seguimiento-de-pagos',
    loadChildren: () => import('./modules/contratos-putr/seguimiento-de-pagos/cuotas.module').then(m => m.CuotasModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'inventario-vehicular',
    loadChildren: () => import('./modules/inventario-vehicular/inventario-vehicular.module').then(m => m.InventarioVehicularModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'servicios',
    loadChildren: () => import('./modules/servicios/servicios.module').then(m => m.ServiciosModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'operadores-por-velatorio',
    loadChildren: () => import('./modules/operadores-por-velatorio/operadores-por-velatorio.module').then(m => m.OperadoresPorVelatorioModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'registro-otorgamiento-servicios',
    loadChildren: () => import('./modules/registro-otorgamiento-servicios/registro-otorgamiento-servicios.module').then(m => m.RegistroOtorgamientoServiciosModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'panteones',
    loadChildren: () => import('./modules/panteones/panteones.module').then(m => m.PanteonesModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'salas',
    loadChildren: () => import('./modules/salas/salas.module').then(m => m.SalasModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'promotores',
    loadChildren: () => import('./modules/promotores/promotores.module').then(m => m.PromotoresModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./modules/proveedores/proveedores.module').then(m => m.ProveedoresModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'artículos',
    loadChildren: () => import('./modules/articulos/articulos.module').then(m => m.ArticulosModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'convenios-prevision-funeraria',
    loadChildren: () => import('./modules/convenios-prevision-funeraria/convenios-prevision-funeraria.module').then(m => m.ConveniosPrevisionFunerariaModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'renovar-convenio-pf',
    loadChildren: () => import('./modules/renovar-convenio-pf/renovar-convenio-pf.module').then(m => m.RenovarConvenioPfModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'velatorios',
    loadChildren: () => import('./modules/velatorios/velatorios.module').then(module => module.VelatoriosModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'renovacion-extemporanea',
    loadChildren: () => import('./modules/renovacion-extemporanea/renovacion-extemporanea.module').then(m => m.RenovacionExtemporaneaModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'contratantes',
    loadChildren: () => import('./modules/contratantes/contratantes.module').then(m => m.ContratantesModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'servicios-funerarios',
    loadChildren: () => import('./modules/servicios-funerarios/servicios-funerarios.module').then(m => m.ServiciosFunerariosModule),
    canActivate: [PermiteUsuarioLogueadoGuard],
    canActivateChild: [PermiteUsuarioLogueadoGuard]
  },
  {
    path: 'consulta-donaciones',
    loadChildren: () => import('./modules/consulta-donaciones/consulta-donaciones.module').then(m => m.ConsultaDonacionesModule)
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
