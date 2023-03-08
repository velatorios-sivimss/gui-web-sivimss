import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng-lts/api';
import {TranslateService} from '@ngx-translate/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  rutaActual!: string;

  constructor(
    private primengConfig: PrimeNGConfig,
    private translateService: TranslateService,
    private router: Router
  ) {
    /*Esta implementacion es temporal*/
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.rutaActual = event.url;
      }
    });
  }


  ngOnInit(): void {
    this.permitirAnimacionRippleComponentesPrime();
    this.establecerIdiomaGeneral('es');
  }

  ngAfterViewInit(): void {
    this.establecerIdiomaComponentesPrime('es');
  }

  establecerIdiomaGeneral(idiomaGeneral: string) {
    this.translateService.setDefaultLang(idiomaGeneral);
  }

  permitirAnimacionRippleComponentesPrime() {
    this.primengConfig.ripple = true;
  }

  establecerIdiomaComponentesPrime(idioma: string) {
    this.translateService.use(idioma);
    this.translateService.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
  }
}
