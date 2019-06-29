import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    public db: AngularFirestore,
  ) { }

  orders = new FormGroup({
    status: new FormControl("")
  });

  getAllAOrders() {
    return this.db.collection("Orders", ref => ref.where("storeId", "==", firebase.auth().currentUser.uid)).snapshotChanges()
  }
  getStatusAOrders(status) {
    return this.db.collection("Orders", ref => ref.where("storeId", "==", firebase.auth().currentUser.uid).where("status", "==", status)).snapshotChanges()
  }
  deliverOrder(id) {
    return this.db.collection("Orders").doc(id)
      .set({ status: "Completed" }, { merge: true });
  }
}
