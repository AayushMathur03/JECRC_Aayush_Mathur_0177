import { Component, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  proceedToCheckout = output<void>();

  constructor(public cartService: CartService) {}

  cartItems = computed(() => this.cartService.cartItems());
  cartTotal = computed(() => this.cartService.cartTotal());
  cartCount = computed(() => this.cartService.cartCount());

  increaseQuantity(productId: number) {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  removeItem(productId: number) {
    this.cartService.removeItem(productId);
  }

  clearCart() {
    if (confirm('Are you sure you want to clear the entire cart?')) {
      this.cartService.clearCart();
    }
  }

  checkout() {
    if (this.cartItems().length > 0) {
      this.proceedToCheckout.emit();
    }
  }
}
