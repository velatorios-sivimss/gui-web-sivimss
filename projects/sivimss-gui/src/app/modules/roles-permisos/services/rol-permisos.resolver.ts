import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { HttpRespuesta } from "../../../models/http-respuesta.interface";
import { RolPermisosService } from "./rol-permisos.service";

@Injectable()
export class RolPermisosResolver  implements Resolve<any>{

    constructor(private rolPermisosService: RolPermisosService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        debugger
        const catRol$ = this.rolPermisosService.obtenerCatRoles();
        const catFuncionalidades$ = this.rolPermisosService.obtenerCatFuncionalidad();
        return forkJoin([catRol$, catFuncionalidades$]);
    }
}
