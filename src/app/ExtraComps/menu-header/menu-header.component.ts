import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import { PopoverController } from '@ionic/angular';
import { NotificationPopComponent } from '../../Components/notifications/notification-pop/notification-pop.component';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {

  store;
  unVerified: boolean = false;

  constructor(
    public authService: AuthService,
    public popoverController: PopoverController,
  ) { }

  ngOnInit() {
    this.getStore()
  }

  getStore() {
    this.authService.getProfile().subscribe(snap => {
      this.store = snap.payload.data();
      this.store.id = snap.payload.id;
      if (this.store.Status == "Unverified") {
        // this.unVerified = true;
      }
    });
  }

  async presentNotifications(ev: any) {
    const popover = await this.popoverController.create({
      component: NotificationPopComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
