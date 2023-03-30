import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from "projects/sivimss-gui/src/app/services/security/autenticacion.service";

@Component({
  selector: 'app-sub-header-privado',
  templateUrl: './sub-header-privado.component.html',
  styleUrls: ['./sub-header-privado.component.scss']
})
export class SubHeaderPrivadoComponent implements OnInit {

  constructor(private readonly autenticacionService:AutenticacionService) { }

  ngOnInit(): void {
  }

  cerrarSesion():void{
    this.autenticacionService.cerrarSesion();
  }

}
