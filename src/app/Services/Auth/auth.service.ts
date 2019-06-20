import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { first } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  signIn = new FormGroup({
    email: new FormControl(""),
    pass: new FormControl(""),
  });

  signUp = new FormGroup({
    storeName: new FormControl(""),
    ownerName: new FormControl(""),
    phonenumber: new FormControl(""),
    storeCategory: new FormControl(""),
    Status: new FormControl("Unverified"),
    email: new FormControl(""),
    pass: new FormControl(""),
    timeStamp: new FormControl(moment().format())
  });


  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }


  isLoggedIn() {
    return this.fireAuth.authState.pipe(first())
  }

  loginM(data) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(data.mail, data.pass).then(res => { }, err => reject(err));
    });
  }


  signUpM(data) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.createUserWithEmailAndPassword(data.email, data.pass).then(res => {

        this.firestore
          .collection(`Sellers`).doc(`${res.user.uid}`)
          .set(data)
          .then(res => { }, err => reject(err));


      }, err => reject(err));
    });
  }



  logout() {
    return this.fireAuth.auth.signOut();
  }
}
