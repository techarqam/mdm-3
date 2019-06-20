import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './Services/Auth/auth.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
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
      icon: 'cart'
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
  userId: string = '';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private authService: AuthService,
    public alertController: AlertController,
    private router: Router,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.getuser();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  getuser() {
    this.authService.isLoggedIn().pipe(
      tap(user => {
        if (user) {
          this.userId = user.uid;
          console.log(user.uid);
        }
      })
    )
      .subscribe()
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
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: "I'm Sure",
          handler: () => {
            this.authService.logout().then(() => {
              this.router.navigateByUrl('/login');
            })
          }
        }
      ]
    });

    await alert.present();
  }

}
