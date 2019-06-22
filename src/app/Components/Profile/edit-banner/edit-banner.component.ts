import { Component, OnInit } from '@angular/core';
import { ViewController } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { ProfileService } from '../../../Services/Profile/profile.service';
import { CommonService } from '../../../Services/Common/common.service';

@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.scss'],
})
export class EditBannerComponent implements OnInit {

  img1: any;
  img2: any;

  constructor(
    public modalCtrl: ModalController,
    public profileService: ProfileService,
    public commonService: CommonService,
  ) { }

  ngOnInit() { }


  updateBanner() {
    if (this.img2) {
      this.profileService.updateBanner(this.img2).then(() => {
        this.close();
        this.commonService.presentToast("Banner Updated");
      })
    } else {
      this.commonService.presentToast("Select a Banner");
    }
  }

  close() {
    this.modalCtrl.dismiss();
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

}
