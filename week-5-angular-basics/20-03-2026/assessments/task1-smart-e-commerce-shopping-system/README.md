# Smart E-Commerce Shopping System

A minimal single-page E-Commerce web application built with **Angular 21** demonstrating all required input types, data binding, and real-time cart operations.

## Features

### Product Component
- Display 5 products with name, price, category, and rating
- Search products by name/category
- Filter by category dropdown
- Select quantity and add to cart

### Cart Component
- View cart items with quantities and prices
- Increase/decrease quantities
- Remove items
- Clear cart
- Real-time total calculation
- Proceed to checkout

### Checkout Component
Complete form with ALL input types:

**Text Inputs:** Full Name, Address Line  
**Email Input:** With validation  
**Number Inputs:** Phone, ZIP Code  
**Radio Buttons:** Gender, Delivery Type, Payment Type  
**Checkboxes:** Accept Terms, Subscribe  
**Dropdowns:** City, State, Country  
**Date Picker:** Delivery Date  
**Textarea:** Additional Instructions  
**File Upload:** ID Proof  
**Password Input:** CVV  
**Month Picker:** Card Expiry  

**Dynamic Arrays:** Add/remove multiple addresses and payment methods  
**Conditional Rendering:** Show card fields or UPI field based on payment selection

## Data Binding
- Interpolation: `{{ value }}`
- Property binding: `[property]="value"`
- Event binding: `(event)="handler()"`
- Two-way binding: `[(ngModel)]="value"`
- Signals: Reactive state management
- Computed: Auto-calculated totals

## Installation

```bash
npm install
ng serve
```

Open http://localhost:4200

## Build

```bash
ng build
```

## Technologies
- Angular 21.2.0
- TypeScript 5.9.2
- Angular Signals
- FormsModule (ngModel)

---
Built with Angular 21
