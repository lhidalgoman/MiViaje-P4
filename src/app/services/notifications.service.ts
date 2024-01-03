import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Messaging, getMessaging, getToken } from 'firebase/messaging';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private _messaging!: Messaging;

  constructor(private firebaseApp: FirebaseApp) {}

  public async init() {
    const permission = await this.requestPermission();

    if (!permission) {
      return;
    }

    this._messaging = getMessaging(this.firebaseApp);
    const vapidKey = environment.notificationsConf.vapidKey;
    const token = await getToken(this._messaging, {
      vapidKey,
    });

    console.log('token', token);

    this.listenEventsFromSW();
  }

  private async requestPermission(): Promise<boolean> {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      console.log('Notification permission granted.');
      return true;
    }

    // TODO: avisa al usuario de que no hay permisos para mostrar notificaciones

    return false;
  }

  private listenEventsFromSW() {
    const channel = new BroadcastChannel('sw-messages');
    channel.addEventListener('message', (event) => {
      //   // TODO: aqui ya haz lo que necesites con la info de la notification
      console.log('Received in client!', event.data);
    });
  }
}
