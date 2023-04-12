// TODO: Regresar catalogos

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, Resolve,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from "rxjs";
import { GenerarNotaRemisionService } from './generar-nota-remision.service';

@Injectable()
export class GenerarNotaRemisionResolver implements Resolve<any> {

    constructor(private generarNotaRemisionService: GenerarNotaRemisionService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return of([])
    }
}
