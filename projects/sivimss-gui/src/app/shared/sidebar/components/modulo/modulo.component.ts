import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Modulo } from "projects/sivimss-gui/src/app/services/security/autenticacion.service";

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.scss']
})
export class ModuloComponent implements OnInit {

  @Input()
  modulo!: Modulo;

  @Input()
  esModuloRaiz: boolean = false;

  @Input()
  abierto:boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  abrirCerrarModulo(){
    this.abierto = !this.abierto;
  }

  get clasesModulo() {
    return {
      'es-raiz': this.esModuloRaiz,
      'seleccionado': this.modulo.activo,
      'abierto': false
    };
  }

}
