import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonService } from '../../../Services/Common/common.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public menuCtrl: MenuController,
    public commonService: CommonService,
    public router: Router,
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() { }



  onSubmit() {
    let data = this.authService.signUp.value;
    this.authService.signUpM(data).then(res => {
      this.authService.signUp.reset();
    }).catch(err => {
      this.commonService.presentToast(err.message);
    }).then(() => {
      if (this.authService.isLoggedIn()) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

}
