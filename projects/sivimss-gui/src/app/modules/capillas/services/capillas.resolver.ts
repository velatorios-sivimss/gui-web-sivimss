import { Capilla } from './../models/capilla.interface';
// TODO: Regresar catalogos

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, Resolve,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CapillaService } from './capilla.service';
import { HttpRespuesta } from '../../../models/http-respuesta.interface';
// import { CapillaService } from './articulos.service';


@Injectable()
export class CapillasResolver implements Resolve<HttpRespuesta<any>> {

  constructor(private capillaService: CapillaService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HttpRespuesta<any>> {
      // return this.capillaService.obtenerCatVelatorios();
      return of();
  }
}
