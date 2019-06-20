import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product = new FormGroup({
    name: new FormControl(""),
    // category: new FormControl(""),
    brandName: new FormControl(""),
    status: new FormControl("Pending"),
  })

  mdm: string = "Products"

  constructor(
    private fs: AngularFirestore,
  ) {
  }


  addDoc(data) {
    return new Promise<any>((resolve, reject) => {
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



}
