import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('data-binding');

  productName = 'Laptop';
  price = 50000;
  quantity = 1;
  isAvailable = true;
  imageUrl = 'https://picsum.photos/150';

  customerName = '';
  address = '';

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  toggleAvailability() {
    this.isAvailable = !this.isAvailable;
  }

  getTotal() {
    return this.price * this.quantity;
  }
}

