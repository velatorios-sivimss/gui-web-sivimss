import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from "@angular/router";
import { AutenticacionService, Modulo, RespuestaHttp } from "projects/sivimss-gui/src/app/services/security/autenticacion.service";
import { MenuSidebarService } from "projects/sivimss-gui/src/app/shared/sidebar/services/menu-sidebar.service";
import { idsModulos } from "projects/sivimss-gui/src/app/utils/constantes-menu";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {

  opcionAnteriorSeleccionada: any = null;
  abierto$!: Observable<boolean>;
  modulos: Modulo[] = [];

  constructor(
    private readonly router: Router,
    private readonly menuSidebarService: MenuSidebarService,
    private readonly autenticacionService: AutenticacionService,
    private readonly renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.abierto$ = this.menuSidebarService.menuSidebar$;
    this.autenticacionService.obtenerModulosPorIdRol('1').pipe(
      map((respuesta: RespuestaHttp<Modulo[]>): Modulo[] => {
        let modulos: Modulo[] = [];

        for (const modulo of respuesta.datos) {

        }
        return respuesta.datos.map((modulo: Modulo): Modulo => {

          return {
            ...modulo,
            activo: false,
            ruta: idsModulos[modulo.idModulo].ruta,
            icono: idsModulos[modulo.idModulo].icono
          }
        });
      })
    ).subscribe(
      (modulos: Modulo[]): void => {
        console.log(modulos);
        this.modulos = modulos;
      }
    );
  }

  // obtenerModuloMapeado(modulo: Modulo): any {
  //   if(!modulo.modulos){
  //     return;
  //   }
  //   return {
  //     ...this.obtenerModuloMapeado(modulo),
  //   };
  // }

  abrirModulo(event: MouseEvent, moduloSeleccionado: Modulo) {
    event.stopPropagation();
    this.navegar(moduloSeleccionado.ruta);
  }

  navegar(ruta: string | undefined): void {
    if (ruta) {
      this.router.navigate([ruta]).then((navegacionCorrecta: boolean) => {
        if (!navegacionCorrecta) {
          console.error(`Ocurrió un error con la siguiente ruta:  [ ${ruta} ] `);
        }
      });
    }
  }

}
