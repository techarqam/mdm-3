import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { MainServiceService } from '../../../../Services/mainService/main-service.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { CommonService } from '../../../../Services/commonService/common.service';
@Component({
  selector: 'app-add-slave',
  templateUrl: './add-slave.component.html',
  styleUrls: ['./add-slave.component.scss'],
})
export class AddSlaveComponent implements OnInit {

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
      group.timestamp = new FormControl(moment().format());
      this.mdmForm = this.fb.group(group);
      console.log("questions  :", this.questions)
    });
  }
  onSubmit() {
    let temp = this.mdmForm.value;
    if (this.mdmForm.valid) {
      this.mainService.addSlaveData(this.masterCollection, temp).then(() => {
        this.close();
        this.mdmForm.reset();
      });
    } else {
      this.commonService.presentToast("Try again");
    }
  }


  close() {
    this.modalCtrl.dismiss();
  }


}
