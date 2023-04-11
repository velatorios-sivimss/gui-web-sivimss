// TODO: Regresar catalogos

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, Resolve,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from "rxjs";
import { GenerarReciboService } from './generar-recibo-pago.service';

@Injectable()
export class GenerarReciboResolver implements Resolve<any> {

    constructor(private generarReciboService: GenerarReciboService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return of([])
    }
}
