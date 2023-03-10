import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng-lts/overlaypanel';
import { BreadcrumbService } from 'projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service';
import { RESERVAR_SALAS_BREADCRUMB } from '../../constants/breadcrumb';

@Component({
  selector: 'app-reservar-salas',
  templateUrl: './reservar-salas.component.html',
  styleUrls: ['./reservar-salas.component.scss']
})
export class ReservarSalasComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.actualizarBreadcrumb();
  }

  actualizarBreadcrumb(): void {
    this.breadcrumbService.actualizar(RESERVAR_SALAS_BREADCRUMB);
  }

}
