import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { ProductService } from '../../../Services/product/product.service';
import { OrdersService } from '../../../Services/Orders/orders.service';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';
import { AuthService } from '../../../Services/Auth/auth.service';
import { SetLocationComponent } from 'src/app/ExtraComps/set-location/set-location.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  name: string = 'Dashboard';
  @ViewChild('doughnutCanvas') doughnutCanvas;

  products: Number = 0;
  orders: Number = 0;
  limitedProd: Observable<any>;

  //Cart Variables
  doughnutChart: any;
  dataArray: Array<any> = [];
  labelsArray: Array<any> = [];

  //profits
  saleProfit: number = 0;
  constructor(
    public menuCtrl: MenuController,
    public prodService: ProductService,
    public modalCtrl: ModalController,
    public orderService: OrdersService,
    public authService: AuthService,
  ) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.getStore();
    this.getProducts();
    this.getFiveProducts();
    this.LoadCharts();
    this.getPendingOrders();
  }

  LoadCharts() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.labelsArray,
        datasets: [{
          data: this.dataArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });
  }

  getStore() {
    this.authService.getProfile().subscribe(snap => {
      let temp: any = snap.payload.data();
      this.saleProfit = temp.profits;
    });
  }

  getProducts() {
    this.prodService.getColl().subscribe(snap => {
      this.products = snap.length;
    })
  }
  getPendingOrders() {
    this.orderService.getStatusAOrders("Pending").subscribe(snap => {
      this.orders = snap.length;
    })
  }
  getFiveProducts() {
    this.limitedProd = this.prodService.getLimitedProducts(5)
    this.dataArray = []; this.labelsArray = []
    this.prodService.getLimitedProducts(5).subscribe(snap => {
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        this.labelsArray.push(temp.name);
        this.dataArray.push(temp.sales);
      });
      this.LoadCharts();
    })
  }


  async launchLocationPage() {


    const modal = await this.modalCtrl.create({
      component: SetLocationComponent,
    });




    return await modal.present();

  }

  //   let modal = this.modalCtrl.create(SetLocationComponent);

  //   modal.onDidDismiss((location) => {
  //     console.log(location);
  //   });

  //   modal.present();

  // }


}
