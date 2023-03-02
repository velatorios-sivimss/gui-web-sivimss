import { AfterContentInit, Component, ContentChildren, OnInit, QueryList, TemplateRef } from '@angular/core';
import { CustomTemplateDirective } from "../../../custom-template/directives/custom-template.directive";

@Component({
  selector: 'app-table-panel',
  templateUrl: './table-panel.component.html',
  styleUrls: ['./table-panel.component.scss']
})
export class TablePanelComponent implements OnInit, AfterContentInit {

  @ContentChildren(CustomTemplateDirective) templates: QueryList<any> = null;

  leftTemplate: TemplateRef<any> = null;

  rightTemplate: TemplateRef<any> = null;

  contentTemplate: TemplateRef<any> = null;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case 'left-header':
          this.leftTemplate = item.template;
          break;
        case 'right-header':
          this.rightTemplate = item.template;
          break;
        case 'header':
          this.contentTemplate = item.template;
          break;
        default:
          this.contentTemplate = item.template;
          break;
      }
    });
  }

}
