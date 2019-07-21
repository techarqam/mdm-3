import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    public db: AngularFirestore,
    public alertCtrl: AlertController
  ) {

  }

  getNotifications() {
    return this.db.collection(`Sellers/${firebase.auth().currentUser.uid}/Notifications`).snapshotChanges();
  }

  getUnreadNotifications() {
    return this.db.collection(`Sellers/${firebase.auth().currentUser.uid}/Notifications`, ref => ref.where("status", "==", "Unread")).snapshotChanges()
  }

  async viewSingleNotification(noti) {
    const alert = await this.alertCtrl.create({
      header: noti.head,
      message: noti.body,
      buttons: [
        {
          text: 'Done',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
    return this.markAsRead(noti.id)
  }

  async markAsRead(id) {
    await this.db.collection(`Sellers/${firebase.auth().currentUser.uid}/Notifications`).doc(id).set({ status: "Read" }, { merge: true });
  }


}
