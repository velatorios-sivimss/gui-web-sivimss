import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {HttpRespuesta} from "../../../models/http-respuesta.interface";
import {BaseService} from "../../../utils/base-service";
import {environment} from '../../../../environments/environment';
import {Header} from "primeng-lts/api";

@Injectable()
export class UsuarioService extends BaseService<HttpRespuesta<any>, any> {
//TO DO Cambiar el Id de la funcionalidad cuando se obtenga del oaut
//      Cambiar auth_token2 por el token de la sesion del usuario

  private auth_token2: string = "eyJzaXN0ZW1hIjoic2l2aW1zcyIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJ7XCJpZFZlbGF0b3Jpb1wiOlwiMVwiLFwiaWRSb2xcIjpcIjFcIixcImRlc1JvbFwiOlwiQ09PUkRJTkFET1IgREUgQ0VOVFJcIixcImlkRGVsZWdhY2lvblwiOlwiMVwiLFwiaWRPZmljaW5hXCI6XCIxXCIsXCJwZXJtaXNvc1VzdWFyaW9cIjpbe1wiaWRGdW5jaW9uYWxpZGFkXCI6XCIxXCIsXCJwZXJtaXNvc1wiOlt7XCJpZFBlcm1pc29cIjpcIjFcIixcImRlc2NQZXJtaXNvXCI6XCJBTFRBXCJ9LHtcImlkUGVybWlzb1wiOlwiMlwiLFwiZGVzY1Blcm1pc29cIjpcIkJBSkFcIn0se1wiaWRQZXJtaXNvXCI6XCIzXCIsXCJkZXNjUGVybWlzb1wiOlwiQ09OU1VMVEFcIn0se1wiaWRQZXJtaXNvXCI6XCI0XCIsXCJkZXNjUGVybWlzb1wiOlwiTU9ESUZJQ0FSXCJ9LHtcImlkUGVybWlzb1wiOlwiNVwiLFwiZGVzY1Blcm1pc29cIjpcIkFQUk9CQUNJw5NOXCJ9LHtcImlkUGVybWlzb1wiOlwiNlwiLFwiZGVzY1Blcm1pc29cIjpcIklNUFJJTUlSXCJ9XX1dLFwiaWRVc3VhcmlvXCI6XCIxXCIsXCJjdmVVc3VhcmlvXCI6XCIxXCIsXCJjdmVNYXRyaWN1bGFcIjpcIjFcIixcIm5vbWJyZVwiOlwiMSAxIDFcIixcImN1cnBcIjpcIjFcIn0iLCJpYXQiOjE2Nzk1MDgyMDgsImV4cCI6MTY4MDExMzAwOH0.HKZVMqii_eBGWISOrHwUxoK4RTp7vuc8LFN0hFK62eM";
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.mssivimss}`, "agregar-usuario", "actualizar-usuario",
      1, "consultar-usuarios", "detalle-usuario", "cambiar-estatus-usr");
  }

  buscarPorFiltros(filtros: any, pagina: number, tamanio: number): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json'});
    const params = new HttpParams()
      .append("pagina", pagina)
      .append("tamanio", tamanio);
    return this._http.post<HttpRespuesta<any>>(this._base + `1/buscar/buscar-usuarios`, filtros, {headers, params});
  }

  validarCurp(curp: any): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json'});
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar/valida-curp`, curp, {headers});
  }

  validarMatricula(matricula: any): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json'});
    const params = new HttpParams()
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar/valida-matricula`, matricula, {headers});
  }

  obtenerCatRoles(): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json'});
    const params = new HttpParams()
      .append("servicio", "catalogo-roles")
    return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo`, {headers, params});
  }

}
