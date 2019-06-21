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
    component: HelpComponent
  },
  {
    path: 'inventory',
    component: InventoryComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'sales',
    component: SalesComponent
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
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
