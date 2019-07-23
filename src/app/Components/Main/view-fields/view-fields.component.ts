import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainServiceService } from 'src/app/Services/mainService/main-service.service';
import { Observable } from 'rxjs';
import { AddFieldsComponent } from '../add-fields/add-fields.component';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/Services/commonService/common.service';
import * as moment from 'moment';
import { FieldTypesService } from '../../../Services/ExtraServices/FieldTypes/field-types.service';

@Component({
  selector: 'app-view-fields',
  templateUrl: './view-fields.component.html',
  styleUrls: ['./view-fields.component.scss'],
})
export class ViewFieldsComponent implements OnInit {

  masterCollection: string;
  master;
  // Slave Data
  slaveData: Observable<any>;
  // Fields 
  masterFields: Observable<any>;
  ldngFields: boolean = true;

  questions: Array<any> = [];
  mdmForm: FormGroup;

  posT = 'floating';
  showCustom: boolean = false;

  constructor(
    public router: ActivatedRoute,
    public mainService: MainServiceService,
    public fb: FormBuilder,
    public modalCtrl: ModalController,
    public commonService: CommonService,
    public alertCtrl: AlertController,
    public fieldTypes: FieldTypesService,
  ) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.masterCollection = params['mastername'];
      this.getMaster(params['mastername']);
      this.getMasterFields(params['mastername']);
    });
    // this.addField();
  }
  getMaster(masterCollection) {
    this.mainService.getSingleMaster(masterCollection).subscribe(snap => {
      this.master = snap.payload.data();
      this.master.id = snap.payload.id;
    })
  }
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
      group.required = new FormControl(true);
      group.columnWidth = new FormControl(2);
      this.mdmForm = this.fb.group(group);
      console.log("questions  :", this.questions)
    });
  }


  selectType(type) {
    this.fieldTypes.selectType(type, this.questions.length + 1)
  }

  async delFieldConfirm(fieldData) {
    const alert = await this.alertCtrl.create({
      header: 'Delete ' + fieldData.label + '? ',
      message: 'This action cannot be recovered.',
      buttons: [
        {
          text: 'No, Its a mistake',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Yes, I understand',
          handler: () => {
            this.mainService.delField(this.masterCollection, fieldData.key).then(() => {
              this.commonService.presentToast(fieldData.label + " has been deleted");
            })
          }
        }
      ]
    });

    await alert.present();
  }

  editField(q) {
    console.log(q);
    this.mainService.masterFieldType.patchValue(q);
    this.mainService.masterField.patchValue(q);
  }
  saveSlave() {
    let temp = this.mainService.masterField.value;
    if (this.mainService.masterField.valid) {
      this.mainService.addField(temp, this.masterCollection).then(() => {
        this.commonService.presentToast("Field Added");
        this.mainService.masterField.reset();
        this.mainService.masterFieldType.reset();
        this.modalCtrl.dismiss();
      });
    } else {
      this.commonService.presentToast("Data Not Valid")
    }
  }

}
