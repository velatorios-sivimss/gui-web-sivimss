import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/sivimss-gui/src/environments/environment';
import { Observable } from 'rxjs';
import { HttpRespuesta } from '../../../models/http-respuesta.interface';
import { BaseService } from '../../../utils/base-service';

@Injectable()
export class ArticulosService extends BaseService<HttpRespuesta<any>, any> {

  private auth_token2: string = "eyJzaXN0ZW1hIjoic2l2aW1zcyIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJ7XCJpZFZlbGF0b3Jpb1wiOlwiMVwiLFwiaWRSb2xcIjpcIjFcIixcImRlc1JvbFwiOlwiQ09PUkRJTkFET1IgREUgQ0VOVFJcIixcImlkRGVsZWdhY2lvblwiOlwiMVwiLFwiaWRPZmljaW5hXCI6XCIxXCIsXCJpZFVzdWFyaW9cIjpcIjFcIixcImN2ZVVzdWFyaW9cIjpcIjFcIixcImN2ZU1hdHJpY3VsYVwiOlwiMVwiLFwibm9tYnJlXCI6XCIxIDEgMVwiLFwiY3VycFwiOlwiMVwifSIsImlhdCI6MTY3OTY4NzM1NSwiZXhwIjoxNjgwMjkyMTU1fQ.Ah2L-rpfJTpsu8VHhb4OxOe_Nj7cUxI_bB9XjAfAy2Y";
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.mssivimss}`, "art-agregar", "art-modificar",
      6, "art-buscar", "art-detalle", "art-cambiar-estatus");
  }

  buscarPorFiltros(filtros: any, pagina: number, tamanio: number): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json' });
    const params = new HttpParams()
      .append("pagina", pagina)
      .append("tamanio", tamanio);
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar/art-buscar`, filtros, { headers, params });
  }

  buscarPorPagina(pagina: number, tamanio: number): Observable<HttpRespuesta<any>> {
    let obj = {
      "nivel": null,
      "nombreArticulo": "ata"
    }
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json' });
    const params = new HttpParams()
      .append("pagina", pagina)
      .append("tamanio", tamanio)
      .append("servicio", this._paginado)
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar/art-buscar?pagina=0&tamanio=10`, obj, { headers, params })
  }

  // cambiarEstatus(id: any): Observable<HttpRespuesta<any>> {
  //   const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json' });
  //   let obj = {
  //     idArticulo: id
  //   }
  //   const formData = new FormData();
  //   const params = new HttpParams().append('datos', JSON.stringify(obj));
  //   return this._http.put<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/${this._estatus}`, formData, { headers, params });
  // }

  obtenerCatalogoCategorias(): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json' });
    const params = new HttpParams().append("servicio", "art-categoria")
    return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo`, { headers, params });
  }
  
  obtenerCatalogoTiposArticulos(): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json' });
    const params = new HttpParams().append("servicio", "art-tipo-articulo")
    return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo`, { headers, params });
  }

  obtenerCatalogoTiposMateriales(): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json' });
    const params = new HttpParams().append("servicio", "art-tipo-materiales")
    return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo`, { headers, params });
  }

  obtenerCatalogoTamanios(): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json' });
    const params = new HttpParams().append("servicio", "art-tamanios")
    return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo`, { headers, params });
  }

  obtenerCatalogoClasificacionProductos(): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json' });
    const params = new HttpParams().append("servicio", "art-clasif-prod")
    return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo`, { headers, params });
  }

  obtenerCatalogoPartidasPresupuestales(): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json' });
    const params = new HttpParams().append("servicio", "art-partida-pre")
    return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo`, { headers, params });
  }

  obtenerCatalogoCuentasContables(): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json' });
    const params = new HttpParams().append("servicio", "art-cuenta-cont")
    return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo`, { headers, params });
  }

  obtenerCatalogoClavesSat(): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json' });
    const params = new HttpParams().append("servicio", "art-clave-sat")
    return this._http.get<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/catalogo`, { headers, params });
  }
}
