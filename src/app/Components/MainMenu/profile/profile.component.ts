import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  store;
  showLoader: boolean = true;

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.getStore()
  }

  getStore() {
    this.authService.getProfile().subscribe(snap => {
      this.store = snap.payload.data();
      this.store.id = snap.payload.id;
    });
    // this.products.subscribe(() => { this.showLoader = false });
  }

}
