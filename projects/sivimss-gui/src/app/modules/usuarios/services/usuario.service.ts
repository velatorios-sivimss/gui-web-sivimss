import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {HttpRespuesta} from "../../../models/http-respuesta.interface";
import {BaseService} from "../../../utils/base-service";
import {environment} from '../../../../environments/environment';
import {AutenticacionService} from "../../../services/security/autenticacion.service";
import {mapearArregloTipoDropdown} from "../../../utils/funciones";
import {TipoDropdown} from "../../../models/tipo-dropdown";

@Injectable()
export class UsuarioService extends BaseService<HttpRespuesta<any>, any> {

  constructor(protected _http: HttpClient, private authService: AutenticacionService) {
    super(_http, `${environment.api.mssivimss}`, "agregar-usuario", "actualizar-usuario",
      2, "consultar-usuarios", "detalle-usuario", "cambiar-estatus-usr");
  }

  buscarPorFiltros(filtros: any, pagina: number, tamanio: number): Observable<HttpRespuesta<any>> {
    const params = new HttpParams()
      .append("pagina", pagina)
      .append("tamanio", tamanio);
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar/buscar-usuarios`, filtros,
      {params});
  }

  validarCurp(curp: any): Observable<HttpRespuesta<any>> {
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar/valida-curp`, curp);
  }

  validarMatricula(matricula: any): Observable<HttpRespuesta<any>> {
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar/valida-matricula`, matricula);
  }

  obtenerCatalogoRoles(): Observable<HttpRespuesta<any>> {
    const params = new HttpParams()
      .append("servicio", "catalogo-roles")
    return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo`, {params});
  }

  obtenerCatalogoNiveles(): Observable<TipoDropdown[]> {
    const niveles = this.authService.obtenerCatalogoDeLocalStorage(('catalogo_nivelOficina'));
    return of(mapearArregloTipoDropdown(niveles, "desc", "id"));
  }

  obtenerCatalogoDelegaciones(): Observable<TipoDropdown[]> {
    const delegaciones = this.authService.obtenerCatalogoDeLocalStorage(('catalogo_delegaciones'));
    return of(mapearArregloTipoDropdown(delegaciones, "desc", "id"));
  }

  obtenerCatalogoVelatorios(): Observable<HttpRespuesta<any>> {
    return of()
  }

}
