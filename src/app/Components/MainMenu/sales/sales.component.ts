import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../../Services/product/product.service';
import { AlertController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {

  products: Observable<any>;
  cats: Observable<any>;
  showLoader: boolean = true;

  constructor(
    private prodService: ProductService,
    public alertCtrl: AlertController,
    public commonService: CommonService,
  ) {
    this.getProducts();
  }

  ngOnInit() {
    this.getCategories();
  }


  getProducts() {
    this.showLoader = true;
    this.products = this.prodService.getColl();
    this.products.subscribe(() => { this.showLoader = false });
  }
  getCategories() {
    this.showLoader = true;
    this.cats = this.prodService.getCategories();
    this.cats.subscribe(() => { this.showLoader = false });
  }

  filterProd(catId) {
    if (catId) {
      this.getProductsbyCat(catId);
    } else {
      this.getProducts();
    }
  }


  getProductsbyCat(catId) {
    this.showLoader = true;
    this.products = this.prodService.getCollbyCat(catId);
    this.products.subscribe(() => { this.showLoader = false });
  }


  checkProduct(prodId, prod) {
    if (prod.status == "Verified") {
      this.sellProduct(prodId, prod)
    } else {
      this.commonService.presentToast("Product is not Verified")
    }
  }

  async sellProduct(prodId, prod) {
    let product = prod;
    product.id = prodId;
    const alert = await this.alertCtrl.create({
      header: product.name,
      message: "How many units are sold ?",
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity',
          min: '0'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Sell',
          handler: data => {
            if (data.quantity) {
              this.prodService.sellProduct(product, data.quantity);
            } else {
              this.commonService.presentToast("Quantity not Valid");
            }
          }
        }
      ]
    });
    return await alert.present();
  }

}
