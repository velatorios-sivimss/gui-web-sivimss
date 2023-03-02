import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDirective } from './directives/only-numbers.directive';
import { TwoDigitDecimaNumbersDirective } from './directives/two-digit-decimal-numbers.directive';
import { LettersDirective } from './directives/only-letters.directive';

@NgModule({
  declarations: [
    NumberDirective,
    TwoDigitDecimaNumbersDirective,
    LettersDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumberDirective,
    TwoDigitDecimaNumbersDirective,
    LettersDirective
  ]
})
export class UtileriaModule { }
