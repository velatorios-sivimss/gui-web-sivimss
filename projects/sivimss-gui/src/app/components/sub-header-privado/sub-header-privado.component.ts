import { Component, OnDestroy, OnInit } from '@angular/core';
import { AutenticacionService, Usuario } from "projects/sivimss-gui/src/app/services/security/autenticacion.service";
import { Observable, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";

@Component({
  selector: 'app-sub-header-privado',
  templateUrl: './sub-header-privado.component.html',
  styleUrls: ['./sub-header-privado.component.scss']
})
export class SubHeaderPrivadoComponent implements OnInit, OnDestroy {
  usuarioEnSesion!: Usuario | null;
  subs!: Subscription;

  constructor(private readonly autenticacionService: AutenticacionService) {
  }

  ngOnInit(): void {
    this.subs = this.autenticacionService.usuarioEnSesion$.subscribe(
      (usuarioEnSesion: Usuario | null) => {
        this.usuarioEnSesion = usuarioEnSesion;
      }
    );
  }

  cerrarSesion(): void {
    this.autenticacionService.cerrarSesion();
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
