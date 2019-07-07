import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../Services/Orders/orders.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  name: string = 'Orders';
  orders: Observable<any>;
  showLoader: boolean = true;

  constructor(
    public orderService: OrdersService,
    public alertCtrl: AlertController,
    public commonService: CommonService,
  ) {
    this.getOrders();
  }

  ngOnInit() { }


  filterOrder(catId) {
    if (catId) {
      this.getOrderBySatus(catId);
    } else {
      this.getOrders();
    }
  }

  getOrderBySatus(catId) {
    this.showLoader = true;
    this.orders = this.orderService.getStatusAOrders(catId);
    this.orders.subscribe(() => { this.showLoader = false });
  }

  getOrders() {
    this.showLoader = true;
    this.orders = this.orderService.getAllAOrders();
    this.orders.subscribe(() => { this.showLoader = false });
  }

  async deliver(id) {
    const alert = await this.alertCtrl.create({
      header: 'Deliver the order ?',
      subHeader: 'Is the order completed ? ',
      buttons: [
        {
          text: 'Not Delivered',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Delivered',
          handler: () => {
            this.orderService.deliverOrder(id).then(() => {
              this.commonService.presentToast("Order Delivered");
            })
            this.alertCtrl.dismiss();
          }
        }
      ]
    });

    await alert.present();

  }
}
