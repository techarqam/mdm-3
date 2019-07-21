import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import { PopoverController, NavController } from '@ionic/angular';
import { NotificationPopComponent } from '../../Components/notifications/notification-pop/notification-pop.component';
import { NotificationsService } from '../../Services/Notifications/notifications.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {
  @Input() name: string;

  store;
  unVerified: boolean = false;
  unReadNotis: number = 0;

  constructor(
    public authService: AuthService,
    public notiService: NotificationsService,
    public popoverController: PopoverController,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.getStore()
    this.getUnreadNotifications();
  }

  getStore() {
    this.authService.getProfile().subscribe(snap => {
      this.store = snap.payload.data();
      this.store.id = snap.payload.id;
      if (this.store.Status == "Unverified") {
        this.unVerified = true;
      }
    });
  }

  getUnreadNotifications() {
    this.notiService.getUnreadNotifications().subscribe(snap => {
      this.unReadNotis = snap.length;
      // console.log(this.unReadNotis);
    })
  }

  async presentNotifications(ev: any) {
    const popover = await this.popoverController.create({
      component: NotificationPopComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  gtSettings() {
    this.navCtrl.navigateRoot('/settings');
  }
}
