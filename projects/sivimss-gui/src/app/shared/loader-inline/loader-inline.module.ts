import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderInlineComponent } from './components/loader-inline/loader-inline.component';



@NgModule({
  declarations: [
    LoaderInlineComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoaderInlineComponent
  ]
})
export class LoaderInlineModule { }
