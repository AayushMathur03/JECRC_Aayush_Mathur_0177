import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { PriceHighlightDirective } from './directives/price-highlight';

interface Product {
  name: string;
  category: string;
  price: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, CurrencyPipe, PriceHighlightDirective],
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    :host {
      font-family: 'Inter', sans-serif;
      display: block;
      min-height: 100vh;
      background: #f5f6fa;
      color: #1a1a2e;
    }

    .page {
      max-width: 680px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    /* ── Header ── */
    .header {
      margin-bottom: 32px;
    }
    .header h1 {
      font-size: 26px;
      font-weight: 700;
      color: #1a1a2e;
    }
    .header p {
      margin-top: 6px;
      font-size: 14px;
      color: #6b7280;
    }

    /* ── Legend ── */
    .legend {
      display: flex;
      gap: 20px;
      margin-bottom: 24px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #6b7280;
    }
    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .legend-dot.red   { background: #ef4444; }
    .legend-dot.green { background: #22c55e; }

    /* ── Product list ── */
    .product-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* ── Product card (base style) ── */
    .product-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 22px;
      background: #fff;
      border-radius: 12px;
      border: 1.5px solid #e5e7eb;
      transition: transform .15s ease, box-shadow .15s ease;
    }
    .product-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,.07);
    }

    .product-info { display: flex; flex-direction: column; gap: 3px; }
    .product-name {
      font-size: 15px;
      font-weight: 600;
      color: #111827;
    }
    .product-category {
      font-size: 12px;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: .05em;
    }

    /* ── Price badge ── */
    .price-badge {
      font-size: 15px;
      font-weight: 700;
      padding: 7px 16px;
      border-radius: 8px;
      min-width: 110px;
      text-align: center;
    }

    /* ── Directive applies these two classes ── */
    .high-value {
      background: #fef2f2;
      color: #dc2626;
      border: 1.5px solid #fecaca;
    }
    .normal-value {
      background: #f0fdf4;
      color: #16a34a;
      border: 1.5px solid #bbf7d0;
    }

    /* ── Summary strip ── */
    .summary {
      margin-top: 28px;
      padding: 16px 22px;
      background: #fff;
      border-radius: 12px;
      border: 1.5px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .summary-label { font-size: 13px; color: #6b7280; }
    .summary-counts { display: flex; gap: 20px; }
    .count-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 600;
    }
    .count-item.red   { color: #dc2626; }
    .count-item.green { color: #16a34a; }
  `],
  template: `
    <div class="page">

      <!-- Header -->
      <div class="header">
        <h1>Price Highlight Directive</h1>
        <p>Items above ₹50,000 are highlighted in red. Others in green.</p>
      </div>

      <!-- Legend -->
      <div class="legend">
        <div class="legend-item">
          <div class="legend-dot red"></div>
          High Value — price &gt; ₹50,000
        </div>
        <div class="legend-item">
          <div class="legend-dot green"></div>
          Normal — price ≤ ₹50,000
        </div>
      </div>

      <!-- Product list -->
      <div class="product-list">
        <div
          class="product-card"
          *ngFor="let product of products"
        >
          <div class="product-info">
            <span class="product-name">{{ product.name }}</span>
            <span class="product-category">{{ product.category }}</span>
          </div>

          <!--
            appPriceHighlight directive is applied here.
            It receives the price value and adds either
            'high-value' (red) or 'normal-value' (green) class.
          -->
          <span
            class="price-badge"
            [appPriceHighlight]="product.price"
          >
            {{ product.price | currency:'INR':'symbol':'1.0-0' }}
          </span>
        </div>
      </div>

      <!-- Summary -->
      <div class="summary">
        <span class="summary-label">Total {{ products.length }} items</span>
        <div class="summary-counts">
          <div class="count-item red">
            🔴 {{ highCount }} High Value
          </div>
          <div class="count-item green">
            🟢 {{ normalCount }} Normal
          </div>
        </div>
      </div>

    </div>
  `
})
export class AppComponent {

  products: Product[] = [
    { name: 'MacBook Pro 14"',     category: 'Laptop',      price: 189900 },
    { name: 'iPhone 15 Pro',       category: 'Mobile',      price: 134900 },
    { name: 'Samsung 4K TV 55"',   category: 'Television',  price: 72000  },
    { name: 'Sony WH-1000XM5',     category: 'Headphones',  price: 26990  },
    { name: 'iPad Air',            category: 'Tablet',      price: 59900  },
    { name: 'Mechanical Keyboard', category: 'Accessory',   price: 8500   },
    { name: 'Dell Monitor 27"',    category: 'Monitor',     price: 32000  },
    { name: 'Canon DSLR R50',      category: 'Camera',      price: 68000  },
  ];

  get highCount()   { return this.products.filter(p => p.price > 50000).length; }
  get normalCount() { return this.products.filter(p => p.price <= 50000).length; }
}