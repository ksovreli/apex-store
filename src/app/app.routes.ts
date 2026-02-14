import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { Notfound } from './notfound/notfound';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'product/:id', component: ProductDetailsComponent},
    { path: 'products/:category', component: ProductsComponent },
    { path: '404', component: Notfound },
    { path: '**', component: Notfound }
];
