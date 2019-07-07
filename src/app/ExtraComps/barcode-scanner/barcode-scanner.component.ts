import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { ProductService } from '../../Services/product/product.service';
import { CommonService } from '../../Services/Common/common.service';


@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss'],
})
export class BarcodeScannerComponent implements OnInit {

  scannedCode = null;


  constructor(
    private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController,
    public prodService: ProductService,
    public commonService: CommonService,
  ) {
    this.scanCode();
  }

  ngOnInit() { }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    }, (err) => {
      this.commonService.presentToast(err);
    }).then(() => {
      if (this.scannedCode) {

        this.prodService.getProduct(this.scannedCode).subscribe(snap => {
          this.updateInventory(snap.payload.id, snap.payload.data()).then(() => {
            this.scannedCode = null;
          });
        })

      } else {
        this.commonService.presentToast("Not a valid Code");
      }
    });
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
            this.scannedCode = null;
          }
        }, {
          text: 'Update',
          handler: data => {
            if (data.quantity) {
              this.prodService.updateInventory(product, data.quantity);
            } else {
              this.commonService.presentToast("Enter Quantity");
            }
            this.alertCtrl.dismiss();
          }
        }
      ]
    });
    return await alert.present();
  }



}
