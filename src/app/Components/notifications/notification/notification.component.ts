import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../Services/Notifications/notifications.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  name: string = 'Notifications';

  notifications: Observable<any>;

  constructor(
    public notiService: NotificationsService,
  ) {
    this.getNotifications();
  }

  ngOnInit() { }
  getNotifications() {
    this.notifications = this.notiService.getNotifications();
    this.notiService.getNotifications().subscribe(sna => {
      sna.forEach(snip => {
        console.log(snip.payload.doc.data());
      })
    })
  }
  viewSingleNotification(noti) {
    let temp: any = noti.payload.doc.data();
    temp.id = noti.payload.doc.id;
    this.notiService.viewSingleNotification(temp);
  }
}
