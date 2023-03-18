import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { HttpRespuesta } from "../../../models/http-respuesta.interface"; 
import { UsuarioService } from "./usuario.service";


@Injectable()
export class UsuarioResolver implements Resolve<HttpRespuesta<any>>{

    constructor(private usuarioService: UsuarioService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HttpRespuesta<any>> {
        debugger
        let pagina = 0;
        let tamanio = 10;
        return this.usuarioService.buscarPorPagina(pagina, tamanio);
    }
}
