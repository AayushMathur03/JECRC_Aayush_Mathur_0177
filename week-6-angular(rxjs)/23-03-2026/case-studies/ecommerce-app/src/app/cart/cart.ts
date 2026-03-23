import { Component } from '@angular/core';
import { CartService } from '../CartService';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  constructor(public cartService: CartService) {}
    get total(){
      return this.cartService.getTotal();
    }

}
