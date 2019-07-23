import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/Services/mainService/main-service.service';
import { CommonService } from '../../../Services/commonService/common.service';
import { ModalController, NavParams } from '@ionic/angular';
import { FieldTypesService } from '../../../Services/ExtraServices/FieldTypes/field-types.service';

@Component({
  selector: 'app-add-fields',
  templateUrl: './add-fields.component.html',
  styleUrls: ['./add-fields.component.scss'],
})
export class AddFieldsComponent implements OnInit {
  masterCollection = this.navParams.get('masterName');
  order = this.navParams.get('order');

  showCustom: boolean = false;

  constructor(
    public mainService: MainServiceService,
    public commonService: CommonService,
    public modalCtrl: ModalController,
    public fieldTypes: FieldTypesService,
    public navParams: NavParams,
  ) { }

  ngOnInit() {
  }

  selectType(type) {
    this.fieldTypes.selectType(type, this.order)
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
