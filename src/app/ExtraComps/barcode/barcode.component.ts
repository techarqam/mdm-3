import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product/product.service';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss'],
})
export class BarcodeComponent implements OnInit {

  product;
  createdCode = null;

  constructor(
    private router: ActivatedRoute,
    public prodService: ProductService,
  ) {
    this.router.params.subscribe(params => {
      this.getProduct(params['id']);
    });

  }

  ngOnInit() { }

  getProduct(id) {
    this.prodService.getProduct(id).subscribe(snap => {
      this.product = snap.payload.data();
      this.product.id = snap.payload.id;
      this.createdCode = snap.payload.id;

    })
  }
  pBar() {
    window.print();
  }

}
