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
    this.getMaster(this.masterCollection);
    this.getMasterFields(this.masterCollection);
  }
  getMaster(masterCollection) {
    this.mainService.getSingleMaster(masterCollection).subscribe(snap => {
      this.master = snap.payload.data();
      this.master.id = snap.payload.id;
    })
  }

  checkW(data) {
    console.log(data)
  }


  ngOnInit() { }
  getMasterFields(masterCollection) {
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

      // console.log(this.questions);
      group.timestamp = new FormControl(moment().format());
      this.mdmForm = this.fb.group(group);
      // console.log("before", this.mdmForm.value)
      this.mdmForm.patchValue(this.slaveData)
      // console.log("after", this.mdmForm.value)
    });
  }
  onSubmit() {
    let temp = this.mdmForm.value;
    console.log(temp);
    if (this.mdmForm.valid) {
      this.mainService.updateSlaveData(this.masterCollection, temp, this.slaveData.id).then(() => {
        this.close();
        this.mdmForm.reset();
        this.commonService.presentToast(this.master.masterName + " updated")
      });
    } else {
      this.commonService.presentToast("Try again");
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }
}