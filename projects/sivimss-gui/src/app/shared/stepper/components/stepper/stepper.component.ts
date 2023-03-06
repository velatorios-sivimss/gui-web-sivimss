import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng-lts/api';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  @Input() items: MenuItem[] = [];
  @Input() checked: boolean = false;
  @Input() index: number = 0;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (this.checked) {
      this.colocarCheck();
    }
  }

  colocarCheck(): void {
    // renderer2 
    const spans = document.querySelectorAll(".p-steps-number");
    spans.forEach((span) => {
      span.classList.add('pi')
      span.classList.add('pi-check')
      span.textContent = "";
    });
  }

}
