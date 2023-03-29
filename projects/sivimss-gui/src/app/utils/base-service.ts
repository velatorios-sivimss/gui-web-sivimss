import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {OperacionesComunes} from './operaciones-comunes.interface';

export abstract class BaseService<T, ID> implements OperacionesComunes<T, ID> {

//TO DO Cambiar el Id de la funcionalidad cuando se obtenga del oaut
//      Cambiar auth_token2 por el token de la sesion del usuario

  private auth_token: string = "eyJzaXN0ZW1hIjoic2l2aW1zcyIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJ7XCJpZFZlbGF0b3Jpb1wiOlwiMVwiLFwiaWRSb2xcIjpcIjFcIixcImRlc1JvbFwiOlwiQ09PUkRJTkFET1IgREUgQ0VOVFJcIixcImlkRGVsZWdhY2lvblwiOlwiMVwiLFwiaWRPZmljaW5hXCI6XCIxXCIsXCJwZXJtaXNvc1VzdWFyaW9cIjpbe1wiaWRGdW5jaW9uYWxpZGFkXCI6XCIxXCIsXCJwZXJtaXNvc1wiOlt7XCJpZFBlcm1pc29cIjpcIjFcIixcImRlc2NQZXJtaXNvXCI6XCJBTFRBXCJ9LHtcImlkUGVybWlzb1wiOlwiMlwiLFwiZGVzY1Blcm1pc29cIjpcIkJBSkFcIn0se1wiaWRQZXJtaXNvXCI6XCIzXCIsXCJkZXNjUGVybWlzb1wiOlwiQ09OU1VMVEFcIn0se1wiaWRQZXJtaXNvXCI6XCI0XCIsXCJkZXNjUGVybWlzb1wiOlwiTU9ESUZJQ0FSXCJ9LHtcImlkUGVybWlzb1wiOlwiNVwiLFwiZGVzY1Blcm1pc29cIjpcIkFQUk9CQUNJw5NOXCJ9LHtcImlkUGVybWlzb1wiOlwiNlwiLFwiZGVzY1Blcm1pc29cIjpcIklNUFJJTUlSXCJ9XX1dLFwiaWRVc3VhcmlvXCI6XCIxXCIsXCJjdmVVc3VhcmlvXCI6XCIxXCIsXCJjdmVNYXRyaWN1bGFcIjpcIjFcIixcIm5vbWJyZVwiOlwiMSAxIDFcIixcImN1cnBcIjpcIjFcIn0iLCJpYXQiOjE2Nzk1MDgyMDgsImV4cCI6MTY4MDExMzAwOH0.HKZVMqii_eBGWISOrHwUxoK4RTp7vuc8LFN0hFK62eM";

  constructor(
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
    return this._http.put<T>(this._base + `${this._funcionalidad}/${this._actualizar}`, t, {headers});
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
