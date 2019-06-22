import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    public db: AngularFirestore,
  ) {

  }

  getNotifications() {
    return this.db.collection("VendorNotifications").snapshotChanges()
  }
}
