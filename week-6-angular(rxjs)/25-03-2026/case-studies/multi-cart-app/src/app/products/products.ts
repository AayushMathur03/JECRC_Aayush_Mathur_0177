import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
  providers: [CartService]
})
export class Products {
  products = [
    {id: 1, name: 'Laptop', price: 999},
    {id: 2, name: 'SmartPhone', price: 699},
    {id: 3, name: 'Tablet', price: 299}
  ];

  constructor(private cartService: CartService) {}

  addToCart(product: any) {
    this.cartService.addToCart(product.name);
    window.alert('Your product has been added to the cart!');
  }

  getCartItems() {
    return this.cartService.getItems();
  }


}
