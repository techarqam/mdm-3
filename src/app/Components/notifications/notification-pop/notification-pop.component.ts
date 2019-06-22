import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../Services/Notifications/notifications.service';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-notification-pop',
  templateUrl: './notification-pop.component.html',
  styleUrls: ['./notification-pop.component.scss'],
})
export class NotificationPopComponent implements OnInit {

  constructor(
    public notiService: NotificationsService,
    public popCtrl: PopoverController,
    public navCtrl: NavController,
  ) {
    this.getNotifications();
  }
  async gtNotis() {
    this.navCtrl.navigateForward("/notifications").then(() => {
      this.popCtrl.dismiss();
    })
  }
  ngOnInit() { }
  getNotifications() {
    this.notiService.getNotifications();
  }

}
