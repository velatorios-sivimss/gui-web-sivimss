import { Inject, Injectable } from '@angular/core';
import { Usuario } from "projects/sivimss-gui/src/app/models/usuario.interface";
import { INICIALIZAR_SIDEBAR_ABIERTO } from "projects/sivimss-gui/src/app/shared/sidebar/tokens/sidebar.tokens";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class MenuSidebarService {
  private subject: BehaviorSubject<boolean>;
  menuSidebar$: Observable<boolean>;

  constructor(@Inject(INICIALIZAR_SIDEBAR_ABIERTO) inicializarSidebarAbiertoToken: boolean) {
    this.subject = new BehaviorSubject<boolean>(inicializarSidebarAbiertoToken);
    this.menuSidebar$ = this.subject.asObservable()
  }

  toggle(): void {
    this.subject.next(!this.subject.getValue());
  }

}
