import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  template: `
  <nav>
    <a routerLink="/">Home</a>
    <a routerLink="/employees" *ngIf="authService.isAuthenticated()">Employees</a>
    <a routerLink="/login" *ngIf="!authService.isAuthenticated()">Login</a>
    <button *ngIf="authService.isAuthenticated()" (click)="logout()">Logout</button>
  </nav>
  `
})
export class Navbar {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
      alert('Logged out successfully!');
    }
  }
}
