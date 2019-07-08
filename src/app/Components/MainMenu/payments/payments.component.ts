import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../../../Services/Payments/payments.service';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {

  store;

  constructor(
    public paymentService: PaymentsService,
    public authService: AuthService,
  ) {
    this.getPaymentNumbers();
  }

  ngOnInit() { }

  getPaymentNumbers() {
    this.authService.getProfile().subscribe(snap => {
      this.store = snap.payload.data();
      this.store.id = snap.payload.id;
      console.log(this.store)
    });
  }
}
