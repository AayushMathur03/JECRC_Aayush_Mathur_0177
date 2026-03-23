import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Checkout } from './checkout/checkout';
import { ProductList } from './product-list/product-list';
import { CartService } from './CartService';
import { Cart } from './cart/cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ ProductList, Checkout, Cart, RouterOutlet],
  template: `
   <h1>E commerce -App</h1>
  <div class="container">
    <app-product-list></app-product-list>
    <app-cart></app-cart>
    <app-checkout></app-checkout>
  </div>
  `
  
})
export class App {
  protected readonly title = signal('ecommerce-app');
}
