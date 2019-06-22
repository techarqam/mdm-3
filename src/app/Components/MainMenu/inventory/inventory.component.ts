import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product/product.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {

  products: Observable<any>;
  cats: Observable<any>;
  showLoader: boolean = true;

  constructor(
    private prodService: ProductService,
    private navCtrl: NavController,
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



  gtAddProduct() {
    this.navCtrl.navigateForward(`/add-product`);
  }
}
