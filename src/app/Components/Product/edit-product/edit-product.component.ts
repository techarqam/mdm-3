import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../Services/product/product.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  name: string = 'Edit Product';

  product;
  cats: Observable<any>;
  subCats: Observable<any>;
  showLoader: boolean = true;

  constructor(
    private router: ActivatedRoute,
    public prodService: ProductService,
    public navCtrl: NavController,
    public commonService: CommonService,
  ) {
    this.router.params.subscribe(params => {
      this.getProduct(params['id']);
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  getProduct(id) {
    this.prodService.getProduct(id).subscribe(snap => {
      this.product = snap.payload.data();
      this.product.id = snap.payload.id;
      this.getCategories();
      this.getSubCat(this.product.category);
      this.prodService.product.setValue(this.product);
    })
  }

  getCategories() {
    this.cats = this.prodService.getCategories();
    this.cats.subscribe(() => { this.showLoader = false });
  }
  getSubCat(cat) {
    this.showLoader = true;
    this.subCats = this.prodService.getSubCategories(cat);
    this.prodService.product.patchValue({ subCategory: this.product.subCategory });
    this.subCats.subscribe(() => { this.showLoader = false });
  }

  cancel() {
    this.prodService.product.reset();
    this.navCtrl.navigateRoot('/inventory');
  }

  updateProduct() {
    if (this.prodService.product.valid) {
      let prod = this.prodService.product.value;
      prod.status = "Pending";
      this.prodService.updateProduct(prod).then(() => {
        this.prodService.product.reset();
        this.navCtrl.navigateRoot('/inventory')
      })
    } else {
      this.commonService.presentToast("Product not Valid");
    }
  }

}
