import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProgressSpinnerModule} from 'primeng-lts/progressspinner';

import {LoaderComponent} from './components/loader/loader.component';
import {LoaderService} from "./services/loader.service";

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  exports: [
    LoaderComponent
  ],
  providers: [
    LoaderService
  ]
})
export class LoaderModule {
}
