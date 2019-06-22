import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../../Services/product/product.service';

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

}
