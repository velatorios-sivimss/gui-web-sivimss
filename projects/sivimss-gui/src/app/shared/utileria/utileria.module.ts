import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDirective } from './directives/only-numbers.directive';
import { TwoDigitDecimaNumbersDirective } from './directives/two-digit-decimal-numbers.directive';
import { LettersDirective } from './directives/only-letters.directive';
import { AlphanumericDirective } from './directives/only-alphanumeric.directive';
import { TrimmerDirective } from './directives/trimmer.directive';

@NgModule({
  declarations: [
    NumberDirective,
    TwoDigitDecimaNumbersDirective,
    LettersDirective,
    AlphanumericDirective,
    TrimmerDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumberDirective,
    TwoDigitDecimaNumbersDirective,
    LettersDirective,
    AlphanumericDirective,
    TrimmerDirective
  ]
})
export class UtileriaModule { }
