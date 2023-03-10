// TODO: Regresar catalogos

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, Resolve,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ArticulosService } from './articulos.service';

@Injectable()
export class ArticulosResolver implements Resolve<any> {

    constructor(private ArticulosResolver: ArticulosService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return of([])
    }
}
