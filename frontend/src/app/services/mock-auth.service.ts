import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class MockAuthService {
  private loggedIn = false;

  constructor(private router: Router) {}

  login() {
    this.loggedIn = true;
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}