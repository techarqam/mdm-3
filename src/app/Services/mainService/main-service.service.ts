import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  master = new FormGroup({
    masterName: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(3)
    ])),
    collectionName: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(3)
    ])),
    timestamp: new FormControl(moment().format()),
  });

  masterFieldType = new FormGroup({
    controlType: new FormControl(""),
  });

  masterField = new FormGroup({
    controlType: new FormControl(""),
    key: new FormControl("", Validators.required),
    label: new FormControl("", Validators.required),
    maxLength: new FormControl(""),
    minLength: new FormControl(""),
    pattern: new FormControl(""),
    order: new FormControl(0, Validators.required),
    required: new FormControl(false),
    fieldType: new FormControl(""),
    value: new FormControl(""),
    displayFormat: new FormControl(""),
    pickerformat: new FormControl(""),
    timestamp: new FormControl(moment().format()),
    columnWidth: new FormControl(2),
    id: new FormControl(""),
  });



  constructor(
    public db: AngularFirestore,
  ) { }

  addMaster(data) {
    return this.db.collection("Forms").doc(data.collectionName.toLowerCase()).set({ masterName: data.masterName, timestamp: data.timestamp });
  }
  checkIfDocExists(docRef) {
    return new Promise((resolve, reject) => {
      this.db.doc(docRef).get().subscribe(snap => {
        console.log('snap : ', snap)
        if (!snap.exists) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  }

  getMasters() {
    return this.db.collection("Forms").snapshotChanges();
  }

  getSingleMaster(masterCollection) {
    return this.db.collection("Forms").doc(masterCollection).snapshotChanges();
  }
  getMasterFields(masterCollection) {
    return this.db.collection("Forms").doc(masterCollection).collection("Fields", ref => ref.orderBy('order', 'asc')).valueChanges();
  }
  addSlaveData(masterCollection, data) {
    return this.db.collection(masterCollection).add(data);
  }
  getSlaveData(masterCollection) {
    return this.db.collection(masterCollection).snapshotChanges();
  }
  update(masterCollection, slaveData) {
    let temp = slaveData;
    delete temp.id;
    return this.db.collection(masterCollection).doc(slaveData.id).update(temp);
  }
  delSlave(masterCollection, id) {
    return this.db.collection(masterCollection).doc(id).delete();
  }
  addField(fieldData, masterCollection) {
    return this.db.collection("Forms").doc(masterCollection).collection("Fields").doc(fieldData.key).set(fieldData)
  }
  delField(masterCollection, fieldId) {
    return this.db.collection("Forms").doc(masterCollection).collection("Fields").doc(fieldId).delete();
  }
}
