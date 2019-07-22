import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';
import { MenuController, NavController, ModalController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';
import { SetLocationComponent } from '../../../ExtraComps/set-location/set-location.component';
import { TermsComponent } from '../../../ExtraComps/terms/terms.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  img1: any;
  img2: any;

  locBtnText: string = "Select Location";
  constructor(
    private authService: AuthService,
    public menuCtrl: MenuController,
    public commonService: CommonService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }



  onSubmit() {
    let data = this.authService.signUp.value;
    if (this.authService.signUp.valid) {
      if (this.img1) {

        this.showTerms(data, this.img2);

        // this.authService.signUpM(data, this.img2).then(res => {
        //   this.authService.signUp.reset();
        // }).catch(err => {
        //   this.commonService.presentToast(err.message);
        // })
        //   .then(() => {
        //     if (this.authService.isLoggedIn()) {
        //       this.navCtrl.navigateRoot('/dashboard');
        //     }
        //   });
      } else {
        this.commonService.presentToast("Upload a banner image");
      }
    } else {
      this.commonService.presentToast("Store data not valid");
    }
  }


  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    this.img2 = file;
  }


  removeImage() {
    this.img1 = null;
  }
  async launchLocationPage() {
    const modal = await this.modalCtrl.create({
      component: SetLocationComponent,
    });
    await modal.present();
    const data = await modal.onWillDismiss()
    this.authService.signUp.patchValue({ sellerLocationLat: data.data.location.lat, sellerLocationLng: data.data.location.lng })
    this.locBtnText = "Change Location";
  }
  async showTerms(data, image) {
    const modal = await this.modalCtrl.create({
      component: TermsComponent,
      componentProps: {
        data: data,
        image: image,
      }
    });
    return await modal.present();
  }

}
