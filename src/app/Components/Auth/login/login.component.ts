import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';
import { MenuController, NavController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public menuCtrl: MenuController,
    public commonService: CommonService,
    public navCtrl: NavController,
  ) {
    this.menuCtrl.enable(false);

  }

  ngOnInit() { }



  onSubmit() {
    let data = this.authService.signIn.value;
    this.authService.loginM(data).then(res => {
      this.authService.signIn.reset();
    }).catch(err => {
      this.commonService.presentToast(err.message);
    }).then(() => {
      if (this.authService.isLoggedIn()) {
        this.navCtrl.navigateRoot('/dashboard');
      }
    });
  }
}
