import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { MainServiceService } from '../../../../Services/mainService/main-service.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { CommonService } from '../../../../Services/commonService/common.service';

@Component({
  selector: 'app-edit-slave',
  templateUrl: './edit-slave.component.html',
  styleUrls: ['./edit-slave.component.scss'],
})
export class EditSlaveComponent implements OnInit {

  slaveData = this.navParams.get('slaveData');

  masterCollection = this.navParams.get("masterCollection");
  master;
  questions: Array<any> = [];
  mdmForm: FormGroup;
  posT = 'floating';


  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public mainService: MainServiceService,
    public commonService: CommonService,
    public fb: FormBuilder,
  ) {
    console.log(this.masterCollection);
    this.getMaster(this.masterCollection);
    this.getMasterFields(this.masterCollection);
    this.setSlaveValue();
  }
  getMaster(masterCollection) {
    this.mainService.getSingleMaster(masterCollection).subscribe(snap => {
      this.master = snap.payload.data();
      this.master.id = snap.payload.id;
    })
  }

  ngOnInit() { }
  getMasterFields(masterCollection) {
    console.log("masterCollection :", masterCollection)
    let group: any = {};
    this.mainService.getMasterFields(masterCollection).subscribe(snap => {
      this.questions = snap;
      this.questions.forEach(question => {
        let valArr: Array<any> = [];
        if (question.required) { valArr.push(Validators.required); }
        if (question.pattern) { valArr.push(Validators.pattern(question.pattern)); }
        if (question.minLength) { valArr.push(Validators.minLength(question.minLength)); }
        if (question.maxLength) { valArr.push(Validators.maxLength(question.maxLength)); }
        group[question.key] =
          question.required ?
            new FormControl(question.value || '', Validators.compose(valArr))
            : new FormControl(question.value || '');
      });
      group.timestamp = new FormControl(moment().format());
      console.log("group :", group)
      this.mdmForm = this.fb.group(group);
      console.log("this.mdmForm :", this.mdmForm)
      console.log("questions  :", this.questions)
    });
  }
  onSubmit() {
    let temp = this.mdmForm.value;
    console.log(temp);
    // if (this.mdmForm.valid) {
    //   this.mainService.addSlaveData(this.masterCollection, temp).then(() => {
    //     this.close();
    //     this.mdmForm.reset();
    //     this.commonService.presentToast(this.master.masterName + "updated")
    //   });
    // } else {
    //   this.commonService.presentToast("Try again");
    // }
  }

  setSlaveValue() {
    console.log(this.slaveData)
    console.log("this.mdmForm 2 :", this.mdmForm)
    let tt = this.slaveData;
    delete tt.id;
    this.mdmForm.patchValue(this.slaveData)
  }
  close() {
    this.modalCtrl.dismiss();
  }
}