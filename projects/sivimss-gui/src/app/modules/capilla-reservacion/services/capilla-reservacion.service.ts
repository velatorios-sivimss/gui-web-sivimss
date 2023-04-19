import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { HttpRespuesta } from "../../../models/http-respuesta.interface";
import { BaseService } from "../../../utils/base-service";
import { environment } from "projects/sivimss-gui/src/environments/environment";
import { Observable } from "rxjs";


@Injectable()
export class CapillaReservacionService extends BaseService<HttpRespuesta<any>, any> {

  private auth_tokenCap: string = "eyJzaXN0ZW1hIjoic2l2aW1zcyIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJ7XCJpZFZlbGF0b3Jpb1wiOlwiMVwiLFwiaWRSb2xcIjpcIjFcIixcImRlc1JvbFwiOlwiQ09PUkRJTkFET1IgREUgQ0VOVFJcIixcImlkRGVsZWdhY2lvblwiOlwiMVwiLFwiaWRPZmljaW5hXCI6XCIxXCIsXCJpZFVzdWFyaW9cIjpcIjFcIixcImN2ZVVzdWFyaW9cIjpcIjFcIixcImN2ZU1hdHJpY3VsYVwiOlwiMVwiLFwibm9tYnJlXCI6XCIxIDEgMVwiLFwiY3VycFwiOlwiMVwifSIsImlhdCI6MTY4MTc0NjI2NSwiZXhwIjoxNjgyMzUxMDY1fQ.3L9_1iiGWy7NEqFOEpf5g2LwpcJ7j1QlOTIdtNq5KBo";


  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.mssivimss}`, "registrar-entrada", "art-modificar",
      1, "art-buscar", "art-detalle", "art-cambiar-estatus");
  }


  buscarPorFiltros(filtros: any, pagina: number, tamanio: number): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_tokenCap}`, 'Content-Type': 'application/json' });
    const params = new HttpParams()
      .append("pagina", pagina)
      .append("tamanio", tamanio);
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar/${this._paginado}`, filtros, { headers, params });
  }

  buscarTodosPorFiltros(filtros: any): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_tokenCap}`, 'Content-Type': 'application/json' });
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar-filtros/art-buscar-general`, filtros, { headers });
  }


  registrarSalida(t: any): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_tokenCap}`, 'Content-Type': 'application/json'});
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/registrar-salida`, t, {headers});
  }



  obtenerCatalogoCapillasDisponibles(): Observable<HttpRespuesta<any>> {
    let velatorios = 'DOCTORES'
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_tokenCap}`, 'Content-Type': 'application/json' });
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/capillas-disponibles`, velatorios, { headers });
  }

  obtenerCatalogoVelatorios(): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_tokenCap}`, 'Content-Type': 'application/json' });
     const params = new HttpParams().append("servicio", "catalogo")
     return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar`, { headers, params });
   }


   buscarCapillasPorIdVelatorio(id: number): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_tokenCap}`, 'Content-Type': 'application/json'});
    const params = new HttpParams()
      .append("servicio", this._detalle)
    return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}` + id, {headers, params});
  }



  // buscarPorIdVelatorio(id: number): Observable<HttpRespuesta<any>> {
  //   const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_tokenCap}`, 'Content-Type': 'application/json'});
  //   const params = new HttpParams()
  //     .append("servicio", this._detalle)
  //   return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}` + id, {headers, params});
  // }


  buscarPorIdVelatorio(id: number): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_tokenCap}`, 'Content-Type': 'application/json'});
    const params = new HttpParams().append("servicio", "capillas-disponibles").append("palabra", id);
    return this._http.get<HttpRespuesta<any>>(`${this._base} 1/buscar`, {headers, params});
  }


  consultarCapillas(parametros: any): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_tokenCap}`, 'Content-Type': 'application/json'});
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar/disponibilidad`, parametros, { headers });
  }


  // obtenerCatalogoTiposMateriales(): Observable<HttpRespuesta<any>> {
  //   const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_tokenCap}`, 'Content-Type': 'application/json' });
  //   const params = new HttpParams().append("servicio", "art-tipo-materiales")
  //   return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo`, { headers, params });
  // }

  // obtenerCatalogoTamanios(): Observable<HttpRespuesta<any>> {
  //   const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_tokenCap}`, 'Content-Type': 'application/json' });
  //   const params = new HttpParams().append("servicio", "art-tamanios")
  //   return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo`, { headers, params });
  // }

  // obtenerCatalogoClasificacionProductos(): Observable<HttpRespuesta<any>> {
  //   const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_tokenCap}`, 'Content-Type': 'application/json' });
  //   const params = new HttpParams().append("servicio", "art-clasif-prod")
  //   return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo`, { headers, params });
  // }

  // obtenerCatalogoPartidasPresupuestales(): Observable<HttpRespuesta<any>> {
  //   const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_tokenCap}`, 'Content-Type': 'application/json' });
  //   const params = new HttpParams().append("servicio", "art-partida-pre")
  //   return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo`, { headers, params });
  // }

  // obtenerCatalogoCuentasContables(): Observable<HttpRespuesta<any>> {
  //   const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_tokenCap}`, 'Content-Type': 'application/json' });
  //   const params = new HttpParams().append("servicio", "art-cuenta-cont")
  //   return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo`, { headers, params });
  // }

  // obtenerCatalogoClavesSat(): Observable<HttpRespuesta<any>> {
  //   const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_tokenCap}`, 'Content-Type': 'application/json' });
  //   const params = new HttpParams().append("servicio", "art-clave-sat")
  //   return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo`, { headers, params });
  // }

}
