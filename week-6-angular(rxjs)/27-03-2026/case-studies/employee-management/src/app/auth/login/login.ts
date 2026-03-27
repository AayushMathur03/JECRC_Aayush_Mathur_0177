import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `
  <h2> Login</h2>
  <input [(ngModel)] = "username" name="username" placeholder="Username" >
  <input [(ngModel)] = "password" name="password" placeholder="Password" type="password" >
  <button (click) = "login()">Login</button>
  `
})
export class Login {
  username = '';
  password = ''

  constructor(private authService: AuthService, private router: Router) {}
  
  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/employees']);
      alert('Login successful!');
    } else {
      alert('Invalid credentials');
    }
  }
}
