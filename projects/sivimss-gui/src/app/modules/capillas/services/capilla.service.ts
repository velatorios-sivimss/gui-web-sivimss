import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/sivimss-gui/src/environments/environment';
import { Observable } from 'rxjs';
import { HttpRespuesta } from '../../../models/http-respuesta.interface';
import { BaseService } from '../../../utils/base-service';

@Injectable()
export class CapillaService  extends BaseService<HttpRespuesta<any>, any> {

  private auth_token2: string = "eyJzaXN0ZW1hIjoic2l2aW1zcyIsImFsZyI6IkhTNTEyIn0.eyJzdWIiOiJ7XCJpZFwiOicxJyxcInJvbFwiOicxJyxcIm5vbWJyZVwiOidudWxsJyxcImNvcnJlb1wiOidwYWJsby5ub2xhc2NvZXhhbXBsZS5jb20nfSIsImlhdCI6MTY3OTQxMzE5NSwiZXhwIjoxNjgwMjEyNzk1fQ.kgb-Td83sP0yjzgPPIH1JoDHxRNAQO89oyuFWNBOv9MpRLn6mZaa0qv_t15M3UjTyNAp70t19OengUG42WReBQ";


  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.mssivimss}`, "capillas-crear", "capillas-actualizar",
      5, "capillas-catalogo", "capillas-detalle", "capillas-cambiar-estatus");
  }

  // obtenerCatRoles(): Observable<HttpRespuesta<any>> {
  //   const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json'});
  //   const params = new HttpParams()
  //     .append("servicio", "catalogo-roles")
  //   return this._http.get<HttpRespuesta<any>>(this._base + `1/catalogo`, {headers, params});
  // }


  // obtenerCatVelatorios(): Observable<HttpRespuesta<any>> {
  //   const headers = new HttpHeaders({Authorization: `Bearer ${this.auth_token2}`, 'Content-Type': 'application/json'});
  //   const params = new HttpParams()
  //     .append("servicio", "catalogo-roles")
  //   return this._http.get<HttpRespuesta<any>>(this._base + `1/catalogo`, {headers, params});
  // }



}
