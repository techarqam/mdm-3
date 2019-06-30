import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommonService } from '../Common/common.service';
import * as firebase from 'firebase';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  store;

  constructor(
    public db: AngularFirestore,
    public commonService: CommonService,
    public authService: AuthService,
  ) {
    this.getStore();
  }

  updateBanner(banner) {
    return firebase.storage().ref("Seller Banners/" + this.store.storeName).put(banner).then(() => {
      firebase.storage().ref("Seller Banners/" + this.store.storeName).getDownloadURL().then((dURL) => {
        return this.db.collection("Sellers").doc(this.store.id)
          .set({ bannerImage: dURL }, { merge: true });
      })
    })
  }
  getStore() {
    this.authService.getProfile().subscribe(snap => {
      this.store = snap.payload.data();
      this.store.id = snap.payload.id;
    });
  }

}
