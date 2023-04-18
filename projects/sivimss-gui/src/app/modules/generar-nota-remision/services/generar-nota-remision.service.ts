import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRespuesta } from 'projects/sivimss-gui/src/app/models/http-respuesta.interface';
import { BaseService } from 'projects/sivimss-gui/src/app/utils/base-service';
import { environment } from 'projects/sivimss-gui/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class GenerarNotaRemisionService extends BaseService<HttpRespuesta<any>, any> {

  private auth_token2: string = "eyJzaXN0ZW1hIjoic2l2aW1zcyIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJ7XCJpZFZlbGF0b3Jpb1wiOlwiMVwiLFwiaWRSb2xcIjpcIjFcIixcImRlc1JvbFwiOlwiQ09PUkRJTkFET1IgREUgQ0VOVFJcIixcImlkRGVsZWdhY2lvblwiOlwiMVwiLFwiaWRPZmljaW5hXCI6XCIxXCIsXCJpZFVzdWFyaW9cIjpcIjFcIixcImN2ZVVzdWFyaW9cIjpcIjFcIixcImN2ZU1hdHJpY3VsYVwiOlwiMVwiLFwibm9tYnJlXCI6XCIxIDEgMVwiLFwiY3VycFwiOlwiMVwifSIsImlhdCI6MTY4MTMyMDkyMSwiZXhwIjoxNjgxOTI1NzIxfQ.6O92d4wazrJdHWiByF_YaoVScQshV8CPUEgK0O-4PpA";
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.mssivimss}`, "art-agregar", "art-modificar",
      54, "consultar-notasrem", "art-detalle", "art-cambiar-estatus");
  }

  buscarPorFiltros(filtros: any, pagina: number, tamanio: number): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json' });
    const params = new HttpParams()
      .append("pagina", pagina)
      .append("tamanio", tamanio);
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar/buscar-notasrem`, filtros, { headers, params });
  }

  buscarTodasOdsGeneradas(): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json' });
    return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo?servicio=lista-ods-gen`, { headers });
  }
}
