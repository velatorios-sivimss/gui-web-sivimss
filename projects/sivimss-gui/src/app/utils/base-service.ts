import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { OperacionesComunes } from './operaciones-comunes.interface';

export abstract class BaseService<T, ID> implements OperacionesComunes<T, ID> {

//TO DO Cambiar el Id de la funcionalidad cuando se obtenga del oaut
//      Cambiar auth_token2 por el token de la sesion del usuario

private auth_token: string = "eyJzaXN0ZW1hIjoic2l2aW1zcyIsImFsZyI6IkhTNTEyIn0.eyJzdWIiOiJ7XCJpZFwiOicxJyxcInJvbFwiOicxJyxcIm5vbWJyZVwiOidudWxsJyxcImNvcnJlb1wiOidwYWJsby5ub2xhc2NvZXhhbXBsZS5jb20nfSIsImlhdCI6MTY3OTQxMzE5NSwiZXhwIjoxNjgwMjEyNzk1fQ.kgb-Td83sP0yjzgPPIH1JoDHxRNAQO89oyuFWNBOv9MpRLn6mZaa0qv_t15M3UjTyNAp70t19OengUG42WReBQ";
  
    constructor(
        protected _http: HttpClient,
        protected _base: string
    ) { }
    
    guardar(usuario:any): Observable<T> {
        const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token}`,'Content-Type': 'application/json'});
        const body = new FormData();
        body.append('datos',usuario);
        const params = new HttpParams().append('datos', usuario );
        return this._http.post<T>(this._base + `1/agregar-usuario`,body, {headers, params});
    }

    actualizar(usuario: any): Observable<T> {
        const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token}`,'Content-Type': 'application/json'});
        const body = new FormData();
        body.append('datos',usuario);
        const params = new HttpParams().append('datos', usuario );
        return this._http.put<T>(this._base + "1/actualizar-usuario",body, {headers, params});
    }

    cambiarEstatus(id: any): Observable<T> {
        const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token}`,'Content-Type': 'application/json'});
        const body = new FormData();
        body.append('datos',id);
        const params = new HttpParams().append('datos', id );
        return this._http.put<T>(this._base + "1/cambiar-estatus-usr", body, {headers, params});
    }
    
    buscarPorId(id: ID): Observable<T> {
        const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token}`,'Content-Type': 'application/json'});
        return this._http.get<T>(this._base + "1/" + id, {headers});
    }

    buscarPorPagina(pagina: number, tamanio: number): Observable<T> {
        const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth_token}`,'Content-Type': 'application/json'});
        return this._http.get<T>(this._base + `1?pagina=${pagina}&tamanio=${tamanio}&servicio=consultar-usuarios`,{headers})
    }

}
