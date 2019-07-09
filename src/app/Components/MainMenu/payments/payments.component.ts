import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../../../Services/Payments/payments.service';
import { AuthService } from '../../../Services/Auth/auth.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {

  store;
  transactions: Observable<any>;
  showLoader: boolean = true;

  constructor(
    public paymentService: PaymentsService,
    public authService: AuthService,
    public navCtrl: NavController,
  ) {
    this.getPaymentNumbers();
  }

  ngOnInit() {
    this.transactions = this.paymentService.getTransactions()
    this.transactions.subscribe(() => this.showLoader = false)
  }
  gtStore(t) {
    this.navCtrl.navigateForward(`/seller-details/${t.sellerId}`)
  }

  getPaymentNumbers() {
    this.authService.getProfile().subscribe(snap => {
      this.store = snap.payload.data();
      this.store.id = snap.payload.id;
    });
  }
}
