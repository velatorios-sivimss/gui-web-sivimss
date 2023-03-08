import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';
import { AccordionModule } from 'primeng-lts/accordion';


@NgModule({
  declarations: [
    MenuSidebarComponent
  ],
  imports: [
    CommonModule,
    AccordionModule
  ],
  exports: [
    MenuSidebarComponent
  ]
})
export class MenuSidebarModule {
}
