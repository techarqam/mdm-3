import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { firebaseConfig } from './firebaseConfig';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from './Components/MainMenu/dashboard/dashboard.component';
import { HelpComponent } from './Components/MainMenu/help/help.component';
import { InventoryComponent } from './Components/MainMenu/inventory/inventory.component';
import { OrdersComponent } from './Components/MainMenu/orders/orders.component';
import { ProfileComponent } from './Components/MainMenu/profile/profile.component';
import { SalesComponent } from './Components/MainMenu/sales/sales.component';
import { AuthService } from './Services/Auth/auth.service';
import { CommonService } from './Services/Common/common.service';
import { LoginComponent } from './Components/Auth/login/login.component';
import { SignUpComponent } from './Components/Auth/sign-up/sign-up.component';
import { MenuHeaderComponent } from './ExtraComps/menu-header/menu-header.component';
import { BackHeaderComponent } from './ExtraComps/back-header/back-header.component';
import { LoaderComponent } from './ExtraComps/loader/loader.component';
import { AddProductComponent } from './Components/Product/add-product/add-product.component';
import { ProductService } from './Services/product/product.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HelpComponent,
    InventoryComponent,
    OrdersComponent,
    ProfileComponent,
    SalesComponent,
    LoginComponent,
    SignUpComponent,
    MenuHeaderComponent,
    BackHeaderComponent,
    LoaderComponent,
    AddProductComponent,
  ],
  entryComponents: [
    MenuHeaderComponent,
    BackHeaderComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    CommonService,
    ProductService,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
