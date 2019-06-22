import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ProductService } from '../../../Services/product/product.service';
import { OrdersService } from '../../../Services/Orders/orders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  products: Number = 0;
  orders: Number = 0;
  constructor(
    public menuCtrl: MenuController,
    public prodService: ProductService,
    public orderService: OrdersService,
  ) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.getProducts();
  }


  getProducts() {
    this.prodService.getColl().subscribe(snap => {
      this.products = snap.length;
    })
  }
  getPendingOrders() {
    // this.orderService.getColl().subscribe(snap => {
    //   this.orders = snap.length;
    // })
  }

}
