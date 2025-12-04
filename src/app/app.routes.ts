import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutSuccessComponent } from './pages/checkout-success/checkout-success.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
      { path: '', component: HomeComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'products/new', component: ProductFormComponent },
    { path: 'products/edit/:id', component: ProductFormComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout/success', component: CheckoutSuccessComponent },
    { path: '**', redirectTo: '' }
];
