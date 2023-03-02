import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertaComponent} from './components/alerta/alerta.component';
import {ToastModule} from "primeng-lts/toast";
import {MessageService} from "primeng-lts/api";
import {AlertaService} from "./services/alerta.service";


@NgModule({
  declarations: [
    AlertaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertaComponent,
    ToastModule
  ],
  providers: [
    AlertaService,
    MessageService
  ]
})
export class AlertaModule {
}
