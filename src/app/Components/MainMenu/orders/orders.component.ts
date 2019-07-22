import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../Services/Orders/orders.service';
import { Observable } from 'rxjs';
import { AlertController, NavController } from '@ionic/angular';
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
  totData: number = 0;

  constructor(
    public orderService: OrdersService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public commonService: CommonService,
  ) {
    this.getOrders();
  }

  ngOnInit() {
    this.orderService.orders.patchValue({ status: "" })
  }


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
    this.orders.subscribe(snap => { this.showLoader = false; this.totData = snap.length; });
  }

  getOrders() {
    this.showLoader = true;
    this.orders = this.orderService.getAllAOrders();
    this.orders.subscribe(snap => { this.showLoader = false; this.totData = snap.length; });
  }

  async deliver(id, data) {
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
            this.orderService.deliverOrder(id, data)
              .then(() => {
                this.commonService.presentToast("Order sent for Delivery");
              })
            this.alertCtrl.dismiss();
          }
        }
      ]
    });

    await alert.present();

  }
  details(orderId) {
    this.navCtrl.navigateForward(`/order-details/${orderId}`)
  }

}
