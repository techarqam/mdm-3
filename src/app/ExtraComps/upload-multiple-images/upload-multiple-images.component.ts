import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product/product.service';
import { NavParams, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-multiple-images',
  templateUrl: './upload-multiple-images.component.html',
  styleUrls: ['./upload-multiple-images.component.scss'],
})
export class UploadMultipleImagesComponent implements OnInit {

  prodId;

  img1: any;
  img2: any;

  images: Observable<any>;

  product;

  constructor(
    public prodService: ProductService,
    public navParams: NavParams,
    public modalCtrl: ModalController,
  ) {
    this.prodId = this.navParams.get('prodId');
    this.getProduct();
    this.getImages();
  }

  ngOnInit() { }


  uploadImage() {
    this.prodService.uploadProductImage(this.product, this.img2)
  }



  getProduct() {
    this.prodService.getProduct(this.prodId).subscribe(snap => {
      this.product = snap.payload.data();
      this.product.id = snap.payload.id;
    })
  }


  getImages() {
    this.images = this.prodService.getProductImages(this.prodId);
  }


  close() {
    this.modalCtrl.dismiss();
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
    this.uploadImage();
  }


  removeImage() {
    this.img1 = null;
  }

}
