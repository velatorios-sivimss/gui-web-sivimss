import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRespuesta } from 'projects/sivimss-gui/src/app/models/http-respuesta.interface';
import { BaseService } from 'projects/sivimss-gui/src/app/utils/base-service';
import { environment } from 'projects/sivimss-gui/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class GenerarNotaRemisionService extends BaseService<HttpRespuesta<any>, any> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.mssivimss}`, "generar-notarem", "modificar",
      54, "consultar-notasrem", "detalle", "cambiar-estatus");
  }

  buscarPorFiltros(filtros: any, pagina: number, tamanio: number): Observable<HttpRespuesta<any>> {
    const params = new HttpParams()
      .append("pagina", pagina)
      .append("tamanio", tamanio);
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar/buscar-notasrem`, filtros, { params });
  }

  buscarTodasOdsGeneradas(): Observable<HttpRespuesta<any>> {
    return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo?servicio=lista-ods-gen`);
  }
}
