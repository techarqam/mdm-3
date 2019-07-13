import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product/product.service';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
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
    public alertCtrl: AlertController,
  ) {
    this.prodId = this.navParams.get('prodId');
    this.getProduct();
    this.getImages();
  }

  ngOnInit() { }


  uploadImage() {
    this.prodService.uploadProductImage(this.product, this.img2)
  }

  async deleteImage(imgId) {
    const alert = await this.alertCtrl.create({
      header: "Delete Image  ?",
      message: "This cannot be recovered !!",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Delete`',
          handler: data => {
            this.prodService.deleteImage(imgId, this.product.id);
            this.alertCtrl.dismiss();
          }
        }
      ]
    });
    return await alert.present();
  }
  async makePrimary(imgId, imageUrl) {
    const alert = await this.alertCtrl.create({
      header: "Make this image as primary ?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Set Primary`',
          handler: data => {
            this.prodService.makeImagePrimary(imgId, this.product.id, imageUrl);
            this.alertCtrl.dismiss();
          }
        }
      ]
    });
    return await alert.present();

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
