import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/MainMenu/dashboard/dashboard.component';
import { HelpComponent } from './Components/MainMenu/help/help.component';
import { InventoryComponent } from './Components/MainMenu/inventory/inventory.component';
import { OrdersComponent } from './Components/MainMenu/orders/orders.component';
import { ProfileComponent } from './Components/MainMenu/profile/profile.component';
import { SalesComponent } from './Components/MainMenu/sales/sales.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { SignUpComponent } from './Components/Auth/sign-up/sign-up.component';
import { AddProductComponent } from './Components/Product/add-product/add-product.component';
import { AuthGuard } from './Guards/Auth/auth.guard';
import { NegAuthGuard } from './Guards/Auth/neg-auth.guard';
import { NotificationComponent } from './Components/notifications/notification/notification.component';
import { SettingsComponent } from './ExtraComps/settings/settings.component';
import { EditBannerComponent } from './Components/Profile/edit-banner/edit-banner.component';
import { EditProductComponent } from './Components/Product/edit-product/edit-product.component';
import { BarcodeComponent } from './ExtraComps/barcode/barcode.component';
import { BarcodeScannerComponent } from './ExtraComps/barcode-scanner/barcode-scanner.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'help',
    component: HelpComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sales',
    component: SalesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NegAuthGuard]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [NegAuthGuard]
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product/barcode/:id',
    component: BarcodeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    component: NotificationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'barcode-scan',
    component: BarcodeScannerComponent,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
