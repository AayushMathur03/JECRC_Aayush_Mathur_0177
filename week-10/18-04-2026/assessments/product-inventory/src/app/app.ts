import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {

  // ── Raw data ──────────────────────────────────────────────
  private allProducts: Product[] = [];

  // ── Displayed data ────────────────────────────────────────
  filteredProducts: Product[] = [];

  // ── Filter state ──────────────────────────────────────────
  categories: string[] = [];
  selectedCategory: string = '';
  showInStockOnly: boolean = false;
  priceSortAsc: boolean = false;

  // ── Lifecycle ─────────────────────────────────────────────
  ngOnInit(): void {
    this.allProducts = this.getProducts();
    this.filteredProducts = [...this.allProducts];
    this.categories = [...new Set(this.allProducts.map(p => p.category))];
  }

  // ── Data source ───────────────────────────────────────────
  getProducts(): Product[] {
    return [
      { id: 1,  name: 'Laptop',        category: 'Electronics', price: 850.50, stock: 10 },
      { id: 2,  name: 'Phone',         category: 'Electronics', price: 699.99, stock: 0  },
      { id: 3,  name: 'Desk Chair',    category: 'Furniture',   price: 220.00, stock: 5  },
      { id: 4,  name: 'Headphones',    category: 'Electronics', price: 149.99, stock: 8  },
      { id: 5,  name: 'Coffee Table',  category: 'Furniture',   price: 180.00, stock: 0  },
      { id: 6,  name: 'T-Shirt',       category: 'Clothing',    price: 25.00,  stock: 50 },
      { id: 7,  name: 'Running Shoes', category: 'Clothing',    price: 95.00,  stock: 0  },
      { id: 8,  name: 'Bookshelf',     category: 'Furniture',   price: 310.00, stock: 3  },
    ];
  }

  // ── Filter by category ────────────────────────────────────
  applyFilter(): void {
    this.applyAll();
  }

  // ── Sort by price (ascending) ─────────────────────────────
  sortByPrice(): void {
    this.priceSortAsc = true;
    this.applyAll();
  }

  // ── Toggle in-stock checkbox ──────────────────────────────
  onStockToggle(): void {
    this.applyAll();
  }

  // ── Central pipeline ─────────────────────────────────────
  private applyAll(): void {
    let result = [...this.allProducts];

    // 1. Category filter
    if (this.selectedCategory) {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    // 2. In-stock filter
    if (this.showInStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    // 3. Price sort
    if (this.priceSortAsc) {
      result.sort((a, b) => a.price - b.price);
    }

    this.filteredProducts = result;
  }
}