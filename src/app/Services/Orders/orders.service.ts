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
  getStatusAOrdersinComps(status, id) {
    return this.db.collection("Orders", ref => ref.where("storeId", "==", id).where("status", "==", status)).snapshotChanges()
  }
  deliverOrder(id, data) {
    return this.db.collection("Orders").doc(id)
      .set({ status: "Out for Delivery" }, { merge: true })
    // .then(() => {
    //   this.db.collection("Sellers").doc(data.storeId).update(
    //     { dueProfits: firebase.firestore.FieldValue.increment(data.vendorProfit) })
    // }).then(() => {
    //   this.db.collection("AdminData").doc("Profits").update({
    //     vendorCredit: firebase.firestore.FieldValue.increment(data.vendorProfit),
    //   })
    // })
  }
}
