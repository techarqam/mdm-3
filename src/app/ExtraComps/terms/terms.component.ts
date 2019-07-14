import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, NavController } from '@ionic/angular';
import { AuthService } from '../../Services/Auth/auth.service';
import { CommonService } from '../../Services/Common/common.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {

  data = this.navParams.get("data")
  image = this.navParams.get("image")

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public authService: AuthService,
    public commonService: CommonService,
    public navCtrl: NavController,
  ) {
  }

  ngOnInit() { }


  agree() {
    this.authService.signUpM(this.data, this.image).then(res => {
      this.authService.signUp.reset();
    }).catch(err => {
      this.commonService.presentToast(err.message);
    })
      .then(() => {
        if (this.authService.isLoggedIn()) {
          this.navCtrl.navigateRoot('/dashboard');
        }
      });

  }
  close() {
    this.modalCtrl.dismiss();
  }
}
