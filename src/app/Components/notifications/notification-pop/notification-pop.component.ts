import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../Services/Notifications/notifications.service';
import { NavController, PopoverController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification-pop',
  templateUrl: './notification-pop.component.html',
  styleUrls: ['./notification-pop.component.scss'],
})
export class NotificationPopComponent implements OnInit {


  unReadNotis: Observable<any>;
  constructor(
    public notiService: NotificationsService,
    public popCtrl: PopoverController,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
  ) {
    this.getUnreadNotifications();
  }
  async gtNotis() {
    this.navCtrl.navigateForward("/notifications").then(() => {
      this.popCtrl.dismiss();
    })
  }
  ngOnInit() { }
  getUnreadNotifications() {
    this.unReadNotis = this.notiService.getUnreadNotifications()
  }
  viewSingleNotification(noti) {
    let temp: any = noti.payload.doc.data();
    temp.id = noti.payload.doc.id;
    this.notiService.viewSingleNotification(temp);
  }

}
