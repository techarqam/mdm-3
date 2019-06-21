import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product/product.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {

  products: Observable<any>;
  loader: boolean = true;
  showLoader: boolean = true;
  store;

  constructor(
    private prodService: ProductService,
    private authService: AuthService,
  ) {
    this.getProducts();
    this.getStore();
  }

  ngOnInit() { }


  getProducts() {
    this.products = this.prodService.getColl();
    this.products.subscribe(() => { this.showLoader = false });
  }
  getStore() {
    this.authService.getProfile().subscribe(snap => {
      this.store = snap.payload.data();
      this.store.id = snap.payload.id;
    });

  }

}
