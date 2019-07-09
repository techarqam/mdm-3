import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';
import { NavController, ModalController } from '@ionic/angular';
import { EditBannerComponent } from '../../Profile/edit-banner/edit-banner.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  name: string = 'Profile';

  store;
  showLoader: boolean = true;

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.getStore()
  }
  gtChangePass() {
    this.navCtrl.navigateForward('/change-password');
  }

  getStore() {
    this.authService.getProfile().subscribe(snap => {
      this.store = snap.payload.data();
      this.store.id = snap.payload.id;
    });
    // this.products.subscribe(() => { this.showLoader = false });
  }

  async editBanner() {
    const modal = await this.modalCtrl.create({
      component: EditBannerComponent,
    });
    return await modal.present();
  }
}
