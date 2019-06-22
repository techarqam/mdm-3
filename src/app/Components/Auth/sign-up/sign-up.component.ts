import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';
import { MenuController, NavController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  img1: any;
  img2: any;


  constructor(
    private authService: AuthService,
    public menuCtrl: MenuController,
    public commonService: CommonService,
    public navCtrl: NavController,
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }



  onSubmit() {
    let data = this.authService.signUp.value;
    this.authService.signUpM(data, this.img2).then(res => {
      this.authService.signUp.reset();
    }).catch(err => {
      this.commonService.presentToast(err.message);
    }).then(() => {
      if (this.authService.isLoggedIn()) {
        this.navCtrl.navigateRoot('/dashboard');
      }
    });
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
