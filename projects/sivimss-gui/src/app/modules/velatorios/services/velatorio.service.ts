import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpRespuesta} from "../../../models/http-respuesta.interface";
import {BaseService} from "../../../utils/base-service";
import {environment} from '../../../../environments/environment';

@Injectable()
export class VelatorioService extends BaseService<HttpRespuesta<any>, any> {
//TO DO Cambiar el Id de la funcionalidad cuando se obtenga del oaut
//      Cambiar auth_token2 por el token de la sesion del usuario

  private auth_token2: string = "eyJzaXN0ZW1hIjoic2l2aW1zcyIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJ7XCJpZFZlbGF0b3Jpb1wiOlwiMVwiLFwiaWRSb2xcIjpcIjFcIixcImRlc1JvbFwiOlwiQ09PUkRJTkFET1IgREUgQ0VOVFJcIixcImlkRGVsZWdhY2lvblwiOlwiMVwiLFwiaWRPZmljaW5hXCI6XCIxXCIsXCJpZFVzdWFyaW9cIjpcIjFcIixcImN2ZVVzdWFyaW9cIjpcIjFcIixcImN2ZU1hdHJpY3VsYVwiOlwiMVwiLFwibm9tYnJlXCI6XCIxIDEgMVwiLFwiY3VycFwiOlwiMVwifSIsImlhdCI6MTY3OTY4NzM1NSwiZXhwIjoxNjgwMjkyMTU1fQ.Ah2L-rpfJTpsu8VHhb4OxOe_Nj7cUxI_bB9XjAfAy2Y";

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.mssivimss}`, "agregar-velatorio", "modificar-velatorio",
      1, "catalogo-velatorio", "", "estatus-velatorio");
  }

  buscarPorFiltros(filtros: any, pagina: number, tamanio: number): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json'});
    const params = new HttpParams()
      .append("pagina", pagina)
      .append("tamanio", tamanio);
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar/buscar-usuarios`, filtros,
      {headers, params});
  }

  obtenerCP(cp: string): Observable<HttpRespuesta<any>>  {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json'});
    const params = new HttpParams()
      .append("servicio", "buscar-cp")
      .append("palabra", cp);
    return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar`,
    {headers, params});
  }

}