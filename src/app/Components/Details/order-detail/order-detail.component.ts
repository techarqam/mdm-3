import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../Services/Orders/orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {

  orderId: string;
  order;
  constructor(
    private router: ActivatedRoute,
    public ordersService: OrdersService,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.orderId = params['id'];
      console.log(this.orderId);
      this.getOrder(params['id']);
    });
  }



  getOrder(orderId) {
    this.ordersService.getSingleOrder(orderId).subscribe(snap => {
      this.order = snap.payload.data();
      this.order.id = snap.payload.id;
      console.log(this.order)
    })
  }
  downloadPdf() {

  }
}
