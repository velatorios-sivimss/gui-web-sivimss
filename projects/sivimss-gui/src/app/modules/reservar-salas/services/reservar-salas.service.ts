import {BaseService} from "../../../utils/base-service";
import {HttpRespuesta} from "../../../models/http-respuesta.interface";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class ReservarSalasService extends  BaseService<HttpRespuesta<any>, any> {

  private auth_token2: string = "eyJzaXN0ZW1hIjoic2l2aW1zcyIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJ7XCJpZFZlbGF0b3Jpb1wiOlwiMVwiLFwiaWRSb2xcIjpcIjFcIixcImRlc1JvbFwiOlwiQ09PUkRJTkFET1IgREUgQ0VOVFJcIixcImlkRGVsZWdhY2lvblwiOlwiMVwiLFwiaWRPZmljaW5hXCI6XCIxXCIsXCJpZFVzdWFyaW9cIjpcIjFcIixcImN2ZVVzdWFyaW9cIjpcIjFcIixcImN2ZU1hdHJpY3VsYVwiOlwiMVwiLFwibm9tYnJlXCI6XCIxIDEgMVwiLFwiY3VycFwiOlwiMVwifSIsImlhdCI6MTY4MTIyNzMzNCwiZXhwIjoxNjgxODMyMTM0fQ.jj6iWoQLQTsqI3-z4NTuaN6J1NTCVSUrsum3Mwxr5r0";

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.mssivimss}`,"veri-registrar","veri-salida",
      1,"","veri-consulta-dia","");
  }

  obtenerCatalogoVelatorio(): Observable<HttpRespuesta<any>>{
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json'});
    return this._http.get<HttpRespuesta<any>>(this._base + `consultaVelatorio/1`, { headers});
  }

  consultarSalas(idVelatorio?: number,tipoSala?: number): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json'});
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar-filtros/veri-buscar`,{idVelatorio:idVelatorio, tipoSala:tipoSala}, { headers});
  }

  consultarODS(folioODS: number): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json'});
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar-filtros/veri-consulta-datos`,{folioODS:folioODS}, { headers});
  }

  consultarDetalleDia(fechaConsulta:string, idSala:number): Observable<HttpRespuesta<any>> {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json'});
    return this._http.post<HttpRespuesta<any>>(this._base + `${this._funcionalidad}/buscar-filtros/veri-consulta-dia`,{fechaConsulta:fechaConsulta,idSala:idSala}, { headers});

  }
}

