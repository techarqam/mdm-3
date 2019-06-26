import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AuthService } from '../Auth/auth.service';
import * as firebase from 'firebase';
import { CommonService } from '../Common/common.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  store;

  product = new FormGroup({
    id: new FormControl(""),
    name: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])),
    category: new FormControl("", Validators.compose([
      Validators.required,
    ])),
    subCategory: new FormControl("", Validators.compose([
      Validators.required,
    ])),
    brandName: new FormControl("", Validators.compose([
      Validators.required,
    ])),
    status: new FormControl("Pending"),
    quantity: new FormControl(1, Validators.compose([
      Validators.required,
      Validators.min(1)
    ])),
    sales: new FormControl(0),
    price: new FormControl(1, Validators.compose([
      Validators.required,
      Validators.min(1)
    ])),
    description: new FormControl("", Validators.compose([
      Validators.required,
    ])),
    timestamp: new FormControl(moment().format()),
    storeId: new FormControl(""),
    storeName: new FormControl(""),
    // Images
  })

  category = new FormGroup({
    name: new FormControl("")
  });
  mdm: string = "Products"

  constructor(
    private fs: AngularFirestore,
    public authService: AuthService,
    public commonService: CommonService,
  ) {
    this.getStore();
  }


  getCategories() {
    return this.fs.collection('Categories', ref => ref.orderBy("name")).snapshotChanges();
  }

  getSubCategories(cat) {
    return this.fs.collection('SubCategories', ref => ref.orderBy("name").where("category", "==", cat)).snapshotChanges();
  }

  // getProductSingleImage(prodId) {
  //   return this.fs.collection(`Products/${prodId}/Images`, ref => ref.limit(1)).snapshotChanges();
  // }
  getProductImages(prodId) {
    return this.fs.collection(`Products/${prodId}/Images`).snapshotChanges();
  }

  async addDoc(data, image) {
    let picName = this.commonService.makeid(6)
    data.storeId = this.store.id;
    data.storeName = this.store.storeName;
    return firebase.storage().ref("Products/" + this.store.storeName + "/" + picName).put(image).then(() => {
      firebase.storage().ref("Products/" + this.store.storeName + "/" + picName).getDownloadURL().then((dURL) => {
        data.primaryImage = dURL;
        this.fs.collection(this.mdm).add(data).then(res => {
          this.fs.collection(this.mdm).doc(res.id).collection("Images").add({
            imageUrl: dURL,
          }).then(() => {
            this.commonService.presentToast("Product Uploaded");
          });
        })
      })
    })
  }


  uploadProductImage(data, image) {
    let picName = this.commonService.makeid(6)
    return firebase.storage().ref("Products/" + this.store.storeName + "/" + picName).put(image).then(() => {
      firebase.storage().ref("Products/" + this.store.storeName + "/" + picName).getDownloadURL().then((dURL) => {
        this.fs.collection(this.mdm).doc(data.id).collection("Images").add({
          imageUrl: dURL,
        }).then(() => {
          this.commonService.presentToast("Product Image Uploaded");
        });
      })
    })

  }


  getColl() {
    return this.fs.collection(this.mdm, ref => ref.where("storeId", "==", firebase.auth().currentUser.uid)).snapshotChanges()
  }

  getCollbyCat(catId) {
    return this.fs.collection(this.mdm, ref => ref.where("storeId", "==", firebase.auth().currentUser.uid).where("category", "==", catId)).snapshotChanges()
  }

  deleteDoc(id) {
    return this.fs
      .collection(this.mdm)
      .doc(id)
      .delete();
  }

  getLimitedProducts(lim) {
    return this.fs.collection(this.mdm, ref => ref.where("storeId", "==", firebase.auth().currentUser.uid).limit(lim).orderBy("sales", "desc")).snapshotChanges()
  }


  getProduct(id) {
    return this.fs.doc(`Products/${id}`).snapshotChanges();
  }

  getStore() {
    this.authService.getProfile().subscribe(snap => {
      this.store = snap.payload.data();
      this.store.id = snap.payload.id;
    });

  }
  //Inventory
  async updateInventory(product, quantity) {
    if (quantity > 0) {
      let fQuan: Number = Number(product.quantity) + Number(quantity);
      return this.fs.collection("Products").doc(product.id)
        .set({ quantity: fQuan }, { merge: true }).then(() => {
          this.commonService.presentToast("Quantity Updated")
        });
    } else {
      this.commonService.presentToast("Quantity not Valid")
    }
  }
  async sellProduct(product, quantity) {
    if (quantity > 0) {
      if (product.quantity > quantity) {
        let fQuan: Number = Number(product.quantity) - Number(quantity);
        let fSales: Number = Number(product.sales) + Number(quantity);

        return this.fs.collection("Products").doc(product.id)
          .set({ quantity: fQuan, sales: fSales }, { merge: true }).then(() => {
            this.commonService.presentToast("Product Sold")
          });
      } else {
        this.commonService.presentToast("Quantity not Valid")
      }
    } else {
      this.commonService.presentToast("No units in the Inventory")
    }

  }
  async updateProduct(product) {
    return this.fs.collection("Products").doc(product.id)
      .set(product, { merge: true }).then(() => {
        this.commonService.presentToast("Product Updated")
      });
  }
  async deleteProduct(product) {
    return this.fs.collection("Products").doc(product.id).delete()
      .then(() => {
        this.commonService.presentToast("Product Deleted")
      });
  }
}
