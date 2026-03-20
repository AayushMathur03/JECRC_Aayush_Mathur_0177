import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSignal = signal<CartItem[]>([]);

  cartItems = this.cartItemsSignal.asReadonly();

  cartCount = computed(() => {
    return this.cartItemsSignal().reduce((sum, item) => sum + item.quantity, 0);
  });

  cartTotal = computed(() => {
    return this.cartItemsSignal().reduce((sum, item) => sum + item.totalPrice, 0);
  });

  addToCart(product: Product, quantity: number = 1) {
    const currentCart = this.cartItemsSignal();
    const existingItemIndex = currentCart.findIndex(item => item.product.id === product.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...currentCart];
      updatedCart[existingItemIndex].quantity += quantity;
      updatedCart[existingItemIndex].totalPrice =
        updatedCart[existingItemIndex].quantity * product.price;
      this.cartItemsSignal.set(updatedCart);
    } else {
      const newItem: CartItem = {
        product,
        quantity,
        totalPrice: product.price * quantity
      };
      this.cartItemsSignal.set([...currentCart, newItem]);
    }
  }

  updateQuantity(productId: number, quantity: number) {
    const currentCart = this.cartItemsSignal();
    const updatedCart = currentCart.map(item => {
      if (item.product.id === productId) {
        return {
          ...item,
          quantity,
          totalPrice: item.product.price * quantity
        };
      }
      return item;
    }).filter(item => item.quantity > 0);

    this.cartItemsSignal.set(updatedCart);
  }

  increaseQuantity(productId: number) {
    const currentCart = this.cartItemsSignal();
    const item = currentCart.find(i => i.product.id === productId);
    if (item) {
      this.updateQuantity(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: number) {
    const currentCart = this.cartItemsSignal();
    const item = currentCart.find(i => i.product.id === productId);
    if (item && item.quantity > 1) {
      this.updateQuantity(productId, item.quantity - 1);
    }
  }

  removeItem(productId: number) {
    const currentCart = this.cartItemsSignal();
    const updatedCart = currentCart.filter(item => item.product.id !== productId);
    this.cartItemsSignal.set(updatedCart);
  }

  clearCart() {
    this.cartItemsSignal.set([]);
  }

  getCartItems(): CartItem[] {
    return this.cartItems();
  }
}
