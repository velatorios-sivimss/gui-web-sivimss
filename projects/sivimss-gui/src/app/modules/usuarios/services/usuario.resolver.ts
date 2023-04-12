import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {forkJoin, Observable} from "rxjs";
import {HttpRespuesta} from "../../../models/http-respuesta.interface";
import {UsuarioService} from "./usuario.service";

@Injectable()
export class UsuarioResolver implements Resolve<HttpRespuesta<any>> {

  constructor(private usuarioService: UsuarioService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const roles$ = this.usuarioService.obtenerCatalogoRoles();
    const niveles$ = this.usuarioService.obtenerCatalogoNiveles();
    const delegaciones$ = this.usuarioService.obtenerCatalogoDelegaciones();
    return forkJoin([roles$, niveles$, delegaciones$])

  }
}
