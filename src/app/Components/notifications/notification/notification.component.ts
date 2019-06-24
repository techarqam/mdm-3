import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../Services/Notifications/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  name: string = 'Notifications';

  constructor(
    public notiService: NotificationsService,
  ) {
    this.getNotifications();
  }

  ngOnInit() { }
  getNotifications() {
    this.notiService.getNotifications();
  }
}
