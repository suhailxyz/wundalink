import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MockAuthService } from '../services/mock-auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(MockAuthService);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirect to home since login is temporarily disabled
  router.navigate(['/home']);
  return false;
}; 