import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product/product.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  cats: Observable<any>;
  subCats: Observable<any>;
  showLoader: boolean = true;

  constructor(
    private prodService: ProductService,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.getCategories();
    this.authService.getProfile();
  }



  addProduct() {
    let data = this.prodService.product.value;
    console.log(data);

    this.prodService.addDoc(data).then(res => {
      console.log(res);
    });
  }

  getCategories() {
    this.cats = this.prodService.getCategories();
    this.cats.subscribe(() => { this.showLoader = false });
  }

  getSubCat(cat) {
    this.showLoader = true;
    this.subCats = this.prodService.getSubCategories(cat);
    this.subCats.subscribe(() => { this.showLoader = false });
  }


}
