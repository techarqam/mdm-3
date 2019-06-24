import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product/product.service';
import { Observable } from 'rxjs';
import { NavController, AlertController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  name: string = 'Inventory';

  products: Observable<any>;
  cats: Observable<any>;
  showLoader: boolean = true;

  constructor(
    private prodService: ProductService,
    private navCtrl: NavController,
    public alertCtrl: AlertController,
    public commonService: CommonService,
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



  gtAddProduct() {
    this.navCtrl.navigateForward(`/add-product`);
  }

  async updateInventory(prodId, prod) {
    let product = prod;
    product.id = prodId;
    const alert = await this.alertCtrl.create({
      header: product.name,
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity',
          min: '0'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Update',
          handler: data => {
            if (data.quantity) {
              this.prodService.updateInventory(product, data.quantity);
            } else {
              this.commonService.presentToast("Enter Quantity");
            }
          }
        }
      ]
    });
    return await alert.present();
  }


  async deleteProduct(prodId, prod) {
    let product = prod;
    product.id = prodId;
    const alert = await this.alertCtrl.create({
      header: "Delete" + " " + product.name,
      message: 'This action cannot be reversed',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Product Name',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Delete',
          handler: data => {
            if (data.name == product.name) {
              this.prodService.deleteProduct(product);
            } else {
              this.commonService.presentToast("Product Name not Valid");
            }
          }
        }
      ]
    });
    return await alert.present();
  }

  viewImage(id) {
    this.prodService.getProductSingleImage(id).subscribe(snap => {
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        if (temp.imageUrl) {
          window.open(temp.imageUrl, "_blank")
        } else {
          this.commonService.presentToast("No Image")
        }
      })
    })
  }
  editProduct(id) {
    this.navCtrl.navigateForward(`/edit-product/${id}`)
  }
  viewBarcode(id) {
    this.navCtrl.navigateForward(`/product/barcode/${id}`)
  }
}
