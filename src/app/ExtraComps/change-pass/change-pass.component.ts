import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CommonService } from 'src/app/Services/Common/common.service';
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent implements OnInit {

  showLoader: boolean = false;
  admin;

  constructor(
    public authService: AuthService,
    public commonService: CommonService,
  ) { }

  ngOnInit() {
    this.getAdmin();
  }


  getAdmin() {
    this.showLoader = true;
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.authService.getProfile().subscribe(snap => {
          this.admin = snap.payload.data();
          console.log(this.admin)
        })
      }
    });
    this.showLoader = true;
  }

  onSubmit() {
    let temp: any = this.authService.changePass.value;
    if (this.authService.changePass.valid) {
      if (temp.oldPass == this.admin.pass) {
        if (temp.newPass == temp.newPassConfirm) {
          firebase.auth().onAuthStateChanged((user: firebase.User) => {
            if (user) {
              this.authService.changePassword(temp.newPass).then(() => {
                this.authService.updatePassword(temp.newPass, user.uid).then(() => {
                  this.authService.changePass.reset();
                  this.commonService.presentToast("Password Changed")
                })
              })
            }
          })
        } else {
          this.commonService.presentToast("New Passwords do not match");
        }
      } else {
        this.commonService.presentToast("Current Password not valid");
      }
    } else {
      this.commonService.presentToast("Enter all Passwords");
    }
  }

}
