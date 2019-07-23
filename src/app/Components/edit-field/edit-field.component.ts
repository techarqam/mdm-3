import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/Services/mainService/main-service.service';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { CommonService } from '../../Services/commonService/common.service';
import { FieldTypesService } from '../../Services/ExtraServices/FieldTypes/field-types.service';

@Component({
  selector: 'app-edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.scss'],
})
export class EditFieldComponent implements OnInit {
  masterCollection = this.navParams.get('masterCollection');
  // order = this.navParams.get('order');

  masterFields: Observable<any>;
  ldngFields: boolean = true;
  mdmForm: FormGroup;
  posT = 'floating';
  showCustom: boolean = false;

  questions: Array<any> = [];

  constructor(
    public mainService: MainServiceService,
    public commonService: CommonService,
    public modalCtrl: ModalController,
    public fieldTypes: FieldTypesService,
    public fb: FormBuilder,
    public navParams: NavParams,
  ) { }

  ngOnInit() {
  }

  selectType(type) {
    this.fieldTypes.selectType(type, this.questions.length + 1)
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
