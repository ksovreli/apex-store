import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { Notfound } from './notfound/notfound';
import { Cart } from './cart/cart';
import { Login } from './login/login';
import { Register } from './register/register';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'product/:id', component: ProductDetailsComponent},
    { path: 'products/:category', component: ProductsComponent },
    { path: 'cart', component: Cart },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: '404', component: Notfound },
    { path: '**', component: Notfound }
];
