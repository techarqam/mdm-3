import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import { CommonService } from '../../Services/Common/common.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  name: string = 'Settings';

  store;
  unVerified: boolean;
  visible: boolean;

  statText: string;

  constructor(
    public authService: AuthService,
    public commonService: CommonService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
  ) {
    this.getStore()
  }

  ngOnInit() { }

  // async confirmVisibility(status) {
  //   if (status) { this.statText = "Visible" } else { this.statText = "Invisible" }
  //   const alert = await this.alertCtrl.create({
  //     header: 'Make store' + this.statText + '?',
  //     buttons: [
  //       {
  //         text: 'No, Its a mistake',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //         }
  //       }, {
  //         text: 'Yes, I understand',
  //         handler: () => {
  //           this.toggleVisibility(status);
  //         }
  //       }
  //     ]
  //   });

  // }

  toggleVisibility(status) {
    if (status) { this.statText = "Visible" } else { this.statText = "Invisible" }
    this.commonService.toggleVisibility(this.store.id, status).then(() => {
      this.commonService.presentToast("Store is now" + " " + this.statText);
    })
  }

  gtChangePass() {
    this.navCtrl.navigateForward('/change-password');
  }

  getStore() {
    this.authService.getProfile().subscribe(snap => {
      this.store = snap.payload.data();
      this.store.id = snap.payload.id;
      if (this.store.Status == "Unverified") {
        this.unVerified = true;
      }
      if (this.store.Visible) {
        this.visible = true;
      } else {
        this.visible = false;
      }
    });
  }

}
