import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from "@angular/router";
import { HttpRespuesta } from "projects/sivimss-gui/src/app/models/http-respuesta.interface";
import { AutenticacionService, Modulo } from "projects/sivimss-gui/src/app/services/security/autenticacion.service";
import { MenuSidebarService } from "projects/sivimss-gui/src/app/shared/sidebar/services/menu-sidebar.service";
import { idsModulos } from "projects/sivimss-gui/src/app/utils/constantes-menu";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
  readonly NOMBRE_ICONO_POR_DEFECTO: string = 'default-icon.svg';
  abierto$!: Observable<boolean>;
  modulos$!: Observable<Modulo[]>;

  constructor(
    private readonly router: Router,
    private readonly menuSidebarService: MenuSidebarService,
    private readonly autenticacionService: AutenticacionService,
  ) {
  }

  ngOnInit(): void {
    this.abierto$ = this.menuSidebarService.menuSidebar$;
    this.modulos$ = this.autenticacionService.obtenerModulosPorIdRol('1').pipe(
      map((respuesta: HttpRespuesta<Modulo[]>): Modulo[] => {
        return this.agregarPropiedadesExtras(respuesta.datos);
      })
    );
    this.gestionarObsOpcionesSeleccionadas();
  }

  agregarPropiedadesExtras(modulos: Modulo[]): Modulo[] {
    return modulos.map((modulo) => {
      const moduloConPropiedadesExtras = {
        ...modulo,
        ruta: idsModulos[modulo.idModulo].ruta,
        icono: idsModulos[modulo.idModulo].icono || this.NOMBRE_ICONO_POR_DEFECTO
      };
      if (moduloConPropiedadesExtras.modulos !== null) {
        moduloConPropiedadesExtras.modulos = this.agregarPropiedadesExtras(moduloConPropiedadesExtras.modulos);
      }
      return moduloConPropiedadesExtras;
    });
  }

  gestionarObsOpcionesSeleccionadas() {
    this.menuSidebarService.opcionMenuSeleccionada$.pipe(
      filter((ruta: string | null) => !!ruta)
    ).subscribe((ruta: string | null) => {
      this.router.navigate([ruta]).then((navegacionCorrecta: boolean) => {
        if (!navegacionCorrecta) {
          console.error(`Ocurrió un error con la siguiente ruta:  [ ${ruta} ] `);
        }
      });
    });
  }

}
