import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { first } from 'rxjs/operators';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  signIn = new FormGroup({
    email: new FormControl("", Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    pass: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])),
  });

  signUp = new FormGroup({

    storeName: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])),
    ownerName: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])),
    phonenumber: new FormControl("", Validators.compose([
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
    ])),

    storeCategory: new FormControl("", Validators.compose([
      Validators.required,
    ])),

    Status: new FormControl("Unverified"),

    email: new FormControl("", Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),

    pass: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])),

    bannerImage: new FormControl(""),
    profits: new FormControl(0),
    timeStamp: new FormControl(moment().format())
  });


  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) {
  }


  isLoggedIn() {
    return this.fireAuth.authState.pipe(first())
  }

  loginM(data) {
    return this.fireAuth.auth.signInWithEmailAndPassword(data.email, data.pass)
  }


  signUpM(data, banner) {
    return new Promise<any>((resolve, reject) => {

      firebase.storage().ref("Seller Banners/" + data.storeName).put(banner).then(() => {
        firebase.storage().ref("Seller Banners/" + data.storeName).getDownloadURL().then((dURL) => {
          data.bannerImage = dURL;
          this.fireAuth.auth.createUserWithEmailAndPassword(data.email, data.pass).then(res => {
            this.firestore.collection(`Sellers`).doc(`${res.user.uid}`).set(data)
              .then(res => { }, err => reject(err));
          }, err => reject(err));
        });

      })
    })

  }



  logout() {
    return this.fireAuth.auth.signOut();
  }

  getProfile() {
    return this.firestore.doc(`Sellers/${firebase.auth().currentUser.uid}`).snapshotChanges();
  }
}
