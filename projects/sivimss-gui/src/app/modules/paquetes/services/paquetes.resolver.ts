// TODO: Regresar catalogos

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, Resolve,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PaquetesService } from './paquetes.service';

@Injectable()
export class PaquetesResolver implements Resolve<any> {

    constructor(private paquetesService: PaquetesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return of([])
    }
}
