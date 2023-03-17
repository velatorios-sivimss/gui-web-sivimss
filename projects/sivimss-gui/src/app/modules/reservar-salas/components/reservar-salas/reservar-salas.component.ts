import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng-lts/overlaypanel';
import { BreadcrumbService } from 'projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service';
import { RESERVAR_SALAS_BREADCRUMB } from '../../constants/breadcrumb';
import { OpcionesReservarSalas, SelectButtonOptions } from '../../constants/opciones-reservar-salas';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservar-salas',
  templateUrl: './reservar-salas.component.html',
  styleUrls: ['./reservar-salas.component.scss']
})
export class ReservarSalasComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  OpcionesReservarSalas = OpcionesReservarSalas;
  opcionSala: any = OpcionesReservarSalas[0];

  constructor(private breadcrumbService: BreadcrumbService,
    private router: Router) { }

  ngOnInit(): void {
    this.actualizarBreadcrumb();
  }

  actualizarBreadcrumb(): void {
    this.breadcrumbService.actualizar(RESERVAR_SALAS_BREADCRUMB);
  }

  redirigirOpcionSala(opcion: { value: SelectButtonOptions }): void {
    this.router.navigate(["/reservar-salas", { outlets: { salas: [this.opcionSala.route] } }]);
  }

}
