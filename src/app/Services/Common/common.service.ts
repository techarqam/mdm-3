import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public toastCtrl: ToastController,
    public db: AngularFirestore,
  ) { }


  checkDocExists() {

  }


  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "bottom",
      showCloseButton: false,
    });
    toast.present();
  }

}
