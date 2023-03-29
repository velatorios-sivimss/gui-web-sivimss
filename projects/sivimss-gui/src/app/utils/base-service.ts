import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {OperacionesComunes} from './operaciones-comunes.interface';

export abstract class BaseService<T, ID> implements OperacionesComunes<T, ID> {

//TO DO Cambiar el Id de la funcionalidad cuando se obtenga del oaut
//      Cambiar auth_token2 por el token de la sesion del usuario

  private auth_token: string = "eyJzaXN0ZW1hIjoic2l2aW1zcyIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJ7XCJpZFZlbGF0b3Jpb1wiOlwiMVwiLFwiaWRSb2xcIjpcIjFcIixcImRlc1JvbFwiOlwiQ09PUkRJTkFET1IgREUgQ0VOVFJcIixcImlkRGVsZWdhY2lvblwiOlwiMVwiLFwiaWRPZmljaW5hXCI6XCIxXCIsXCJpZFVzdWFyaW9cIjpcIjFcIixcImN2ZVVzdWFyaW9cIjpcIjFcIixcImN2ZU1hdHJpY3VsYVwiOlwiMVwiLFwibm9tYnJlXCI6XCIxIDEgMVwiLFwiY3VycFwiOlwiMVwifSIsImlhdCI6MTY3OTY4NzM1NSwiZXhwIjoxNjgwMjkyMTU1fQ.Ah2L-rpfJTpsu8VHhb4OxOe_Nj7cUxI_bB9XjAfAy2Y"

  protected constructor(
    protected _http: HttpClient,
    protected _base: string,
    protected _agregar: string,
    protected _actualizar: string,
    protected _funcionalidad: number,
    protected _paginado: string,
    protected _detalle: string,
    protected _estatus: string
  ) {
  }

  guardar(t: any): Observable<T> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_token}`, 'Content-Type': 'application/json'});
    return this._http.post<T>(this._base + `${this._funcionalidad}/${this._agregar}`, t, {headers});
  }

  actualizar(t: any): Observable<T> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_token}`, 'Content-Type': 'application/json'});
    const body = new FormData();
    body.append('datos', t);
    const params = new HttpParams().append('datos', this._actualizar);
    return this._http.put<T>(this._base + `${this._funcionalidad}/${this._actualizar}`, body, {headers, params});
  }

  cambiarEstatus(id: any): Observable<T> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_token}`, 'Content-Type': 'application/json'});
    return this._http.put<T>(this._base + `${this._funcionalidad}/${this._estatus}`, id, {headers});
  }

  buscarPorId(id: ID): Observable<T> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_token}`, 'Content-Type': 'application/json'});
    const params = new HttpParams()
      .append("servicio", this._detalle)
    return this._http.get<T>(this._base + `${this._funcionalidad}/` + id, {headers, params});
  }

  buscarPorPagina(pagina: number, tamanio: number): Observable<T> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_token}`, 'Content-Type': 'application/json'});
    const params = new HttpParams()
      .append("pagina", pagina)
      .append("tamanio", tamanio)
      .append("servicio", this._paginado)
    return this._http.get<T>(this._base + `${this._funcionalidad}`, {headers, params})
  }

}
