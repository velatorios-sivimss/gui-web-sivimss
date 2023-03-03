import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './components/stepper/stepper.component';
import { StepsModule } from 'primeng-lts/steps';

@NgModule({
  declarations: [
    StepperComponent
  ],
  imports: [
    CommonModule,
    StepsModule,
  ],
  exports: [
    StepperComponent
  ]
})
export class StepperModule { }
