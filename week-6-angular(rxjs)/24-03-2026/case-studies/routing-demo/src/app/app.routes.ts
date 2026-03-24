import { Routes } from '@angular/router';
import {Home } from './home/home';
import { Contact } from './contact/contact';
import { ProductComponent } from './product/product';
import { Error } from './error/error';
import { ProductGuardService } from './product-guard-service';
import { ProductDetail } from './product-detail/product-detail';

export const routes: Routes = [

    { path: 'home', component: Home },
    { path: 'contact', component: Contact },
    { path: 'products', component: ProductComponent },
    { path: 'product', component: ProductComponent },
    { path: 'product/:id', component: ProductDetail, canActivate: [ProductGuardService] },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: Error },
    

];
