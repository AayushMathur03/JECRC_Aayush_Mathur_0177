import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  template: `
  @if (product) {
    <div class="card">
      <h2>{{ product.name }}</h2>
      <p>ID: {{ product.productID }}</p>
      <p>Price: ₹{{ product.price }}</p>
    </div>
  }
  `,
})
export class ProductDetail implements OnInit{
   product: Product | undefined;
    
   constructor(
    private route: ActivatedRoute,
    private service: ProductService
   ) {}
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.service.getProductById(id);
  }
}
