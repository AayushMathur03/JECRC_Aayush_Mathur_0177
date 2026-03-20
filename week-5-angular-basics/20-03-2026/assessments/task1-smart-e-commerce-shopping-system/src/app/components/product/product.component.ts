import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  searchTerm = signal('');
  selectedCategory = signal('All');
  selectedQuantities = new Map<number, number>();

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.productService.getProducts().forEach(product => {
      this.selectedQuantities.set(product.id, 1);
    });
  }

  allProducts = computed(() => this.productService.products());
  categories = computed(() => ['All', ...this.productService.getCategories()]);

  filteredProducts = computed(() => {
    let products = this.allProducts();

    if (this.selectedCategory() !== 'All') {
      products = products.filter(p => p.category === this.selectedCategory());
    }

    const term = this.searchTerm().toLowerCase();
    if (term) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }

    return products;
  });

  onCategoryChange(category: string) {
    this.selectedCategory.set(category);
  }

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  getQuantity(productId: number): number {
    return this.selectedQuantities.get(productId) || 1;
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity >= 1) {
      this.selectedQuantities.set(productId, quantity);
    }
  }

  addToCart(product: Product) {
    const quantity = this.getQuantity(product.id);
    this.cartService.addToCart(product, quantity);
    this.selectedQuantities.set(product.id, 1);
  }
}
