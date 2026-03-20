import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSignal = signal<Product[]>([
    {
      id: 1,
      name: 'Laptop',
      price: 999,
      category: 'Electronics',
      rating: 4.5,
      image: 'https://via.placeholder.com/200/0000FF/FFFFFF?text=Laptop'
    },
    {
      id: 2,
      name: 'Phone',
      price: 599,
      category: 'Electronics',
      rating: 4.0,
      image: 'https://via.placeholder.com/200/FF0000/FFFFFF?text=Phone'
    },
    {
      id: 3,
      name: 'Shoes',
      price: 89,
      category: 'Fashion',
      rating: 3.5,
      image: 'https://via.placeholder.com/200/00FF00/FFFFFF?text=Shoes'
    },
    {
      id: 4,
      name: 'Watch',
      price: 199,
      category: 'Fashion',
      rating: 4.5,
      image: 'https://via.placeholder.com/200/FFFF00/000000?text=Watch'
    },
    {
      id: 5,
      name: 'Headphones',
      price: 79,
      category: 'Electronics',
      rating: 4.0,
      image: 'https://via.placeholder.com/200/FF00FF/FFFFFF?text=Headphones'
    }
  ]);

  products = this.productsSignal.asReadonly();

  getProducts() {
    return this.products();
  }

  getCategories(): string[] {
    const categories = new Set(this.products().map(p => p.category));
    return Array.from(categories);
  }

  getProductById(id: number): Product | undefined {
    return this.products().find(p => p.id === id);
  }
}
