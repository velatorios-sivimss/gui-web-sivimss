import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AutenticacionService } from "projects/sivimss-gui/src/app/services/autenticacion.service";
import { funcionalidades, permisos } from "projects/sivimss-gui/src/app/utils/constantes-funcionalidades-permisos";
import { Observable } from 'rxjs';

@Injectable()
export class ValidaRolGuard implements CanActivate, CanActivateChild {
  constructor(private readonly aut: AutenticacionService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (route.data && route.data.validaRol) {
      const {funcionalidad, permiso} = route.data.validaRol;
      const idFuncionalidad: string = funcionalidades[funcionalidad];
      const idPermiso: string = permisos[permiso];
      return this.aut.existeFuncionalidadConPermiso(idFuncionalidad, idPermiso);
    }
    return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (childRoute.data && childRoute.data.validaRol) {
      const {idFuncionalidad, idPermiso} = childRoute.data.validaRol;
      return this.aut.existeFuncionalidadConPermiso(idFuncionalidad, idPermiso);
    }
    return true;
  }

}
