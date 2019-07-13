import { Component } from '@angular/core';
import { Platform, AlertController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './Services/Auth/auth.service';
import { tap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { OrdersService } from './Services/Orders/orders.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  pOrders: number = 20;
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'analytics'
    },
    {
      title: 'Sales',
      url: '/sales',
      icon: 'cash'
    },
    {
      title: 'Orders',
      url: '/orders',
      icon: 'cart',
      notis: this.pOrders,
    },
    {
      title: 'Payments',
      url: '/payments',
      icon: 'cash'
    },
    {
      title: 'Inventory',
      url: '/inventory',
      icon: 'logo-buffer'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Help',
      url: '/help',
      icon: 'ios-help-buoy'
    },

  ];

  isMobile: boolean = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private authService: AuthService,
    public alertController: AlertController,
    public orderService: OrdersService,
    private statusBar: StatusBar,
    public navCtrl: NavController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('android') || this.platform.is('ios')) { this.isMobile = true; }
      this.getPendingOrders();
      this.pOrders++;
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }



  async signOutConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: "I'm Sure",
          handler: () => {
            this.authService.logout().then(() => {
              this.navCtrl.navigateRoot('login');
            })
          }
        }
      ]
    });

    await alert.present();
  }
  getPendingOrders() {
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.orderService.getStatusAOrdersinComps("Pending", user.uid).subscribe(snap => {
          console.log(this.pOrders)
          this.pOrders = snap.length + 3;
          console.log(this.pOrders)
        })
      }
    });
  }

}
