import { Component, OnInit } from '@angular/core';
import { AutenticacionService, Usuario } from "projects/sivimss-gui/src/app/services/security/autenticacion.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-sub-header-privado',
  templateUrl: './sub-header-privado.component.html',
  styleUrls: ['./sub-header-privado.component.scss']
})
export class SubHeaderPrivadoComponent implements OnInit {
  usuario$!: Observable<Usuario | null>;

  constructor(private readonly autenticacionService: AutenticacionService) {
  }

  ngOnInit(): void {
    this.usuario$ = this.autenticacionService.usuario$;
  }

  cerrarSesion(): void {
    this.autenticacionService.cerrarSesion();
  }

}
