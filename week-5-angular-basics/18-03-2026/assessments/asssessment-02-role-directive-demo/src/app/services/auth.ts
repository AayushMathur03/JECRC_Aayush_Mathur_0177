import { Injectable, signal } from '@angular/core';

export type UserRole = 'admin' | 'user' | 'guest';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Using Angular signals (or use a plain string if on older Angular)
  readonly role = signal<UserRole>('user');

  setRole(role: UserRole) {
    this.role.set(role);
  }
}