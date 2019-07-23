import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainServiceService } from '../../../Services/mainService/main-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mdm-options',
  templateUrl: './mdm-options.component.html',
  styleUrls: ['./mdm-options.component.scss'],
})
export class MdmOptionsComponent implements OnInit {

  masterCollection: string;
  master;

  constructor(
    public router: ActivatedRoute,
    public mainService: MainServiceService,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.masterCollection = params['mastername'];
      this.getMaster(params['mastername']);
    })
  }
  getMaster(masterCollection) {
    this.mainService.getSingleMaster(masterCollection).subscribe(snap => {
      this.master = snap.payload.data();
      this.master.id = snap.payload.id;
    })
  }

  gtSlaveFields(collectionName) {
    this.navCtrl.navigateForward(`/slave-fields/${this.masterCollection}`);
  }

  gtSlaveData(collectionName) {
    this.navCtrl.navigateForward(`/slave-data/${this.masterCollection}`);
  }


}
