import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../../../Services/mainService/main-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { CommonService } from '../../../Services/commonService/common.service';
import { AlertController, ModalController } from '@ionic/angular';
import { AddSlaveComponent } from '../SlaveComps/add-slave/add-slave.component';
import { EditSlaveComponent } from '../SlaveComps/edit-slave/edit-slave.component';

@Component({
  selector: 'app-salve-data',
  templateUrl: './salve-data.component.html',
  styleUrls: ['./salve-data.component.scss'],
})
export class SalveDataComponent implements OnInit {

  masterCollection: string;
  master = {
    id: '',
    masterName: '',
    timestamp: ''
  };
  questions: Array<any> = [];


  // Slave Data
  slaveData: Array<any> = [];


  constructor(
    public router: ActivatedRoute,
    public mainService: MainServiceService,
    public alertCtrl: AlertController,
    public commonService: CommonService,
    public modalCtrl: ModalController,
    public fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.masterCollection = params['mastername'];
      this.getMaster(params['mastername']);
      this.getMasterFields(this.masterCollection);
      this.getSlaveData(params['mastername']);
    })
  }
  getMaster(masterCollection) {
    this.mainService.getSingleMaster(masterCollection).subscribe(snap => {
      let temp: any = snap.payload.data();
      temp.id = snap.payload.id;
      this.master = temp;
    })
  }
  getMasterFields(masterCollection) {
    let group: any = {};
    this.mainService.getMasterFields(masterCollection).subscribe(snap => {
      this.questions = snap;
      console.log("questions  :", this.questions)
    });
  }
  getSlaveData(masterCollection) {
    this.slaveData = [];
    this.mainService.getSlaveData(masterCollection).subscribe(snap => {
      this.slaveData = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        this.slaveData.push(temp)
      })
    })
  }
  async delSlaveConfirm(slaveData) {
    const alert = await this.alertCtrl.create({
      header: 'Delete ' + slaveData.name + '? ',
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
            this.mainService.delSlave(this.masterCollection, slaveData.id).then(() => {
              this.commonService.presentToast(slaveData.name + " has been deleted");
            })
          }
        }
      ]
    });

    await alert.present();
  }



  async editSlave(slaveData) {
    console.log(slaveData)
    const modal = await this.modalCtrl.create({
      component: EditSlaveComponent,
      componentProps: {
        name: "Edit " + this.master.masterName,
        masterCollection: this.masterCollection,
        slaveData: slaveData,
      }
    });
    return await modal.present();
  }
  async addMaster() {
    const modal = await this.modalCtrl.create({
      component: AddSlaveComponent,
      componentProps: {
        name: "Add " + this.master.masterName,
        masterCollection: this.masterCollection
      }
    });
    return await modal.present();
  }
}
