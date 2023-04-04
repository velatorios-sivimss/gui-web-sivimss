import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng-lts/api';
import { TranslateService } from '@ngx-translate/core';
import { AutenticacionService } from "projects/sivimss-gui/src/app/services/security/autenticacion.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  existeUnaSesion$!: Observable<boolean>;

  constructor(
    private primengConfig: PrimeNGConfig,
    private translateService: TranslateService,
    private aut: AutenticacionService
  ) {
  }


  ngOnInit(): void {
    this.existeUnaSesion$ = this.aut.existeUnaSesion$;
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
