import {Injectable} from "@angular/core";

@Injectable()
export class NotificacionService {


  constructor() {
  }

  existenNotificaciones(): boolean {
    return true;
  }

  guardarNotificaciones(): void {
  }

  consultarNotificaciones(): string {
    const notificaciones = ["Notificion1", "Notificion2", "Notifiacion3", "Notificacion4"];
    return `<ul>${notificaciones.map(item => `<li>${item}</li>`).join('')}</ul>`;
  }

  borrarNotificaciones(): void {
  }
}
