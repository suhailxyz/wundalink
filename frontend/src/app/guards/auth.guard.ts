import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { MockAuthService } from '../services/mock-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(MockAuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirect to home page if not logged in
  router.navigate(['/']);
  return false;
}; 