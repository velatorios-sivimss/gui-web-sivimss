import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertaService } from "projects/sivimss-gui/src/app/shared/alerta/services/alerta.service";
import { BreadcrumbService } from "projects/sivimss-gui/src/app/shared/breadcrumb/services/breadcrumb.service";

@Component({
  selector: 'app-generar-orden-servicio',
  templateUrl: './generar-orden-servicio.component.html',
  styleUrls: ['./generar-orden-servicio.component.scss']
})
export class GenerarOrdenServicioComponent implements OnInit {

  items = [
    {label: 'Datos del contratante'},
    {label: 'Datos del finado'},
    {label: 'Características del presupuesto'},
    {label: 'Información del servicio'},
  ];

  ngOnInit(): void {
  }

}
