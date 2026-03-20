import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartService } from './services/cart.service';

type AppView = 'products' | 'cart' | 'checkout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductComponent, CartComponent, CheckoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentView = signal<AppView>('products');

  constructor(public cartService: CartService) {}

  cartCount = computed(() => this.cartService.cartCount());

  navigateTo(view: AppView) {
    this.currentView.set(view);
  }

  onProceedToCheckout() {
    this.currentView.set('checkout');
  }
}
