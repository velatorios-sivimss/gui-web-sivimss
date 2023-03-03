import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng-lts/api';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  @Input() items: MenuItem[] = [];
  @Input() readonly: boolean = false;
  @Input() checked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.checked) {
      this.colocarCheck();
    }
  }

  colocarCheck(): void {
    const spans = document.querySelectorAll(".p-steps-number");
    spans.forEach((span) => {
      span.classList.add('pi')
      span.classList.add('pi-check')
      span.textContent = "";
    });
  }

}
