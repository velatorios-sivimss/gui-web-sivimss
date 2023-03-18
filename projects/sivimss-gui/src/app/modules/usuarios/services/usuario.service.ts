import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpRespuesta } from "../../../models/http-respuesta.interface";
import { BaseService } from "../../../utils/base-service";
import { environment } from '../../../../environments/environment';
import { Header } from "primeng-lts/api";

@Injectable()
export class UsuarioService extends BaseService<HttpRespuesta<any>, any> {
//TO DO Cambiar el Id de la funcionalidad cuando se obtenga del oaut
//      Cambiar auth_token2 por el token de la sesion del usuario

  private auth_token2: string = "eyJzaXN0ZW1hIjoic2l2aW1zcyIsImFsZyI6IkhTNTEyIn0.eyJzdWIiOiJ7XCJpZFwiOicxJyxcInJvbFwiOicxJyxcIm5vbWJyZVwiOidudWxsJyxcImNvcnJlb1wiOidwYWJsby5ub2xhc2NvZXhhbXBsZS5jb20nfSIsImlhdCI6MTY3ODQ2NTA2MywiZXhwIjoxNjc5MjY0NjYzfQ.eOAuyK5Mg1HSS6_GRuYknbs0jvG3Um6QOtVXsS9RLa8BzPrJdx5vId8VKOx23gKIfoJQ6lRP1Jzd54Y7juUscw";
   
  constructor(protected _http: HttpClient) { 
    super(_http, `${environment.api.mssivimss}`);
  }

  buscarPorFiltros(filtros:any, pagina: number, tamanio: number): Observable<HttpRespuesta<any>> {
    debugger
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token2}`,'Content-Type': 'application/json'});
    const params = new HttpParams()
    .append("pagina", pagina)
    .append("tamanio", tamanio);
    return this._http.post<HttpRespuesta<any>>(this._base + `1/buscar/buscar-usuarios`,filtros, {headers, params});
  }

  validarCurp(curp:any): Observable<HttpRespuesta<any>> {
    debugger
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token2}`,'Content-Type': 'application/json'});
    return this._http.post<HttpRespuesta<any>>(this._base + `1/buscar/valida-curp`,curp, {headers});
  }
  
  validarMatricula(matricula:any): Observable<HttpRespuesta<any>> {
    debugger
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token2}`,'Content-Type': 'application/json'});
    const params = new HttpParams()
    return this._http.post<HttpRespuesta<any>>(this._base + `1/buscar/valida-matricula`,matricula, {headers});
  }

}
