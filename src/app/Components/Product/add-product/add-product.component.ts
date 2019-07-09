import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product/product.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../Services/Auth/auth.service';
import { CommonService } from '../../../Services/Common/common.service';
import { NavController, ModalController } from '@ionic/angular';
import { UploadMultipleImagesComponent } from '../../../ExtraComps/upload-multiple-images/upload-multiple-images.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  img1: any;
  img2: any;
  images: Array<any> = [];

  name: string = 'Add Product';

  cats: Observable<any>;
  subCats: Observable<any>;
  showLoader: boolean = true;

  constructor(
    private prodService: ProductService,
    public commonService: CommonService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
  ) {
    this.getCategories();
  }

  ngOnInit() {
    this.getCategories();
  }

  async openUploadImages() {
    const modal = await this.modalCtrl.create({
      component: UploadMultipleImagesComponent,
    });
    return await modal.present();
  }

  addProduct() {
    let data = this.prodService.product.value;
    if (this.prodService.product.valid) {
      if (this.img2) {

        this.prodService.addDoc(data, this.img2).then(ress => {
          // this.openUploadImages();
          this.prodService.product.reset();
          this.removeImage();
        });
      } else {
        this.commonService.presentToast("Select an Image");
      }
    } else {
      this.commonService.presentToast("Product not Valid")
    }
  }

  async getCategories() {
    this.cats = this.prodService.getCategories();
    this.cats.subscribe(() => { this.showLoader = false });
  }

  async getSubCat(cat) {
    this.showLoader = true;
    this.subCats = this.prodService.getSubCategories(cat);
    this.subCats.subscribe(() => { this.showLoader = false });
  }

  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    this.img2 = file;
  }
  removeImage() {
    this.img1 = null;
  }

}
