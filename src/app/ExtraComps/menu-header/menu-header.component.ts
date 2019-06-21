import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {

  store;
  unVerified: boolean = false;

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
      if (this.store.Status == "Unverified") {
        this.unVerified = true;
      }
      console.log(this.store)
    });
  }

}
