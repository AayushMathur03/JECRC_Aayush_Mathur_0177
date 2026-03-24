import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
  <h1> Angualr Routing Demo</h1>
  <nav>
    <a routerLink="/home">Home</a>
    <a routerLink="/contact">Contact</a>
    <a routerLink="/products">Products</a>
  </nav>
  <br> 
  <router-outlet></router-outlet>
  `,
})
export class App {
  protected readonly title = signal('routing-demo');
}
