import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UsuarioEnSesion} from "projects/sivimss-gui/src/app/models/usuario-en-sesion.interface";
import {AutenticacionService} from "projects/sivimss-gui/src/app/services/autenticacion.service";
import {Subscription} from "rxjs";
import {NotificacionService} from "../../services/notificacion.service";
import {ConfirmationService} from "primeng-lts/api";
import {ConfirmPopup} from "primeng-lts/confirmpopup";

@Component({
  selector: 'app-sub-header-privado',
  templateUrl: './sub-header-privado.component.html',
  styleUrls: ['./sub-header-privado.component.scss'],
  providers: [NotificacionService,]
})
export class SubHeaderPrivadoComponent implements OnInit, OnDestroy {

  usuarioEnSesion!: UsuarioEnSesion | null;
  subs!: Subscription;
  existeNotificacion: boolean;
  verNotificaciones: boolean = false;

  constructor(private readonly autenticacionService: AutenticacionService,
              private readonly notificacionService: NotificacionService) {
    this.existeNotificacion = notificacionService.existenNotificaciones();
  }

  ngOnInit(): void {
    this.subs = this.autenticacionService.usuarioEnSesion$.subscribe(
      (usuarioEnSesion: UsuarioEnSesion | null) => {
        this.usuarioEnSesion = usuarioEnSesion;
      }
    );
  }

  cerrarSesion(): void {
    this.autenticacionService.cerrarSesion();
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
