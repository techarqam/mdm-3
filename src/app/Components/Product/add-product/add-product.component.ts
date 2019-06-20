import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  constructor(
    private prodService: ProductService,
  ) { }

  ngOnInit() { }





  addProduct() {
    let data = this.prodService.product.value;
    console.log(data);

    this.prodService.addDoc(data).then(res => {
      console.log(res);
    });
  }
}
