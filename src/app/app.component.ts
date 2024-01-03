import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import 'firebase/firestore';
import { Itinerario } from './interface/itinerario.interface';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MiViajeP2';

  days$: Observable<Itinerario[]>;

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.notificationsService.init();
  }
}
