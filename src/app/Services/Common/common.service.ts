import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  settings = new FormGroup({
    visibility: new FormControl("", Validators.required),
  });


  constructor(
    public toastCtrl: ToastController,
    public db: AngularFirestore,
  ) { }


  async toggleVisibility(storeId, status) {
    return this.db.collection("Sellers").doc(storeId)
      .set({ Visible : status }, { merge: true });
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
