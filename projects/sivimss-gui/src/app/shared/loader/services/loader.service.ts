import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';


@Injectable()
export class LoaderService {

    private loaderSubject = new BehaviorSubject<boolean>(false);

    loader$: Observable<boolean> = this.loaderSubject.asObservable();

    constructor() {
    }

    mostrarLoaderHastaCompletar<T>(obs$: Observable<T>): Observable<T> {
        return of(null)
            .pipe(
                tap(() => this.activar()),
                concatMap(() => obs$),
                finalize(() => this.desactivar())
            );
    }

    activar() {
        this.loaderSubject.next(true);
    }

    desactivar() {
        this.loaderSubject.next(false);
    }

}
