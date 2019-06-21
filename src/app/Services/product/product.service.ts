import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { AuthService } from '../Auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  store;

  product = new FormGroup({
    name: new FormControl(""),
    category: new FormControl(""),
    subCategory: new FormControl(""),
    brandName: new FormControl(""),
    status: new FormControl("Pending"),
    quantity: new FormControl(1),
    sales: new FormControl(0),
    price: new FormControl(0),
    description: new FormControl(""),
    timestamp: new FormControl(moment().format()),
    storeId: new FormControl(""),
    storeName: new FormControl(""),
    // Images
  })

  mdm: string = "Products"

  constructor(
    private fs: AngularFirestore,
    public authService: AuthService
  ) {
    this.getStore();
  }


  getCategories() {
    return this.fs.collection('Categories', ref => ref.orderBy("name")).snapshotChanges();
  }

  getSubCategories(cat) {
    return this.fs.collection('SubCategories', ref => ref.orderBy("name").where("category", "==", cat)).snapshotChanges();
  }


  addDoc(data) {
    return new Promise<any>((resolve, reject) => {
      data.storeId = this.store.id;
      data.storeName = this.store.storeName;
      this.fs.collection(this.mdm).add(data).then(res => { }, err => reject(err));
    });
  }


  getColl() {
    return this.fs.collection(this.mdm).snapshotChanges()
  }

  deleteDoc(id) {
    return this.fs
      .collection(this.mdm)
      .doc(id)
      .delete();
  }


  getDoc(id) {
    return this.fs
      .collection(this.mdm)
      .doc(id)
      .snapshotChanges();

  }

  getStore() {
    this.authService.getProfile().subscribe(snap => {
      this.store = snap.payload.data();
      this.store.id = snap.payload.id;
    });

  }


}
