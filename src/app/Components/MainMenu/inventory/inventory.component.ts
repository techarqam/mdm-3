import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {

  products;
  loader: boolean = true;
  constructor(
    private prodServ: ProductService,
  ) {
    this.getProducts();
  }

  ngOnInit() { }


  getProducts() {
    this.prodServ.getColl().subscribe(snap => { this.products = snap })
    this.products.subscribe(() => this.loader = false)
  }

}
