import { Capilla } from './../models/capilla.interface';
// TODO: Regresar catalogos

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, Resolve,
    RouterStateSnapshot
} from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';

import { CapillaService } from './capilla.service';
import { HttpRespuesta } from '../../../models/http-respuesta.interface';
// import { CapillaService } from './articulos.service';


@Injectable()
export class CapillasResolver implements Resolve<HttpRespuesta<any>> {

  constructor(private capillaService: CapillaService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HttpRespuesta<any>> {
    // const catalogoCapillas$ = this.capillaService.obtenerCatalogoCapillas();
    // const catalogoTiposArticulos$ = this.capillaService.obtenerCatalogoTiposArticulos();
    // const catalogoTiposMateriales$ = this.capillaService.obtenerCatalogoTiposMateriales();
    // const catalogoTamanios$ = this.capillaService.obtenerCatalogoTamanios();
    // const catalogoClasificacionProductos$ = this.capillaService.obtenerCatalogoClasificacionProductos();
    // const catalogoPartidasPresupuestales$ = this.capillaService.obtenerCatalogoPartidasPresupuestales();
    // const catalogoCuentasContables$ = this.capillaService.obtenerCatalogoCuentasContables();
    // const catalogoClavesSat$ = this.capillaService.obtenerCatalogoClavesSat();
    return this.capillaService.obtenerCatalogoCapillas();
    // return
    //   catalogoCapillas$,
        // catalogoTiposArticulos$,
        // catalogoTiposMateriales$,
        // catalogoTamanios$,
        // catalogoClasificacionProductos$,
        // catalogoPartidasPresupuestales$,
        // catalogoCuentasContables$,
        // catalogoClavesSat$,
      //  return this.capillaService.obtenerCatalogoCapillas();
      // return of();

  }
}
