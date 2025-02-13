import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BnNgIdleService } from 'bn-ng-idle';
import { SidebarModule } from "projects/sivimss-gui/src/app/shared/sidebar/sidebar.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutenticacionInterceptor } from './services/security/autenticacion.interceptor';
import { AutenticacionService } from './services/security/autenticacion.service';
import { BloqueaUsuarioLogueadoGuard } from './services/security/bloquea-usuario-logueado.guard';
import { ErrorInterceptor } from './services/security/error.interceptor';
import { PermiteUsuarioLogueadoGuard } from './services/security/permite-usuario-logueado.guard';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { HeaderImssPublicoComponent } from './components/header-imss-publico/header-imss-publico.component';
import { LoaderModule } from './shared/loader/loader.module';
import { AlertaModule } from './shared/alerta/alerta.module';
import { SubHeaderPrivadoComponent } from './components/sub-header-privado/sub-header-privado.component';
import { BreadcrumbModule } from "./shared/breadcrumb/breadcrumb.module";
import { AdministrarProveedoresComponent } from './modules/proveedores/components/administrar-proveedores/administrar-proveedores.component';
// import { AdministrarArticulosComponent } from './modules/articulos/components/administrar-articulos/administrar-articulos.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json')
}

@NgModule({
  declarations: [
    AppComponent,
    PaginaNoEncontradaComponent,
    HeaderImssPublicoComponent,
    SubHeaderPrivadoComponent,
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SidebarModule.forRoot({
      tiempoTransicion: .25,
      widthMenuSidebar: 320,
      inicializarMenuSidebarAbierto: false
    }),
    BreadcrumbModule,
    LoaderModule,
    AlertaModule
  ],
  providers: [
    AutenticacionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacionInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    PermiteUsuarioLogueadoGuard,
    BloqueaUsuarioLogueadoGuard,
    BnNgIdleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
