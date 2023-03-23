// TODO: Regresar catalogos

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, Resolve,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RenovacionExtemporaneaService } from './renovacion-extemporanea.service';

@Injectable()
export class RenovacionExtemporaneaResolver implements Resolve<any> {

    constructor(private RenovacionExtemporaneaResolver: RenovacionExtemporaneaService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return of([])
    }
}
