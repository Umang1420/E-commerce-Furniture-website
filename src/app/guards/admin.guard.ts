import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);

  const userData = localStorage.getItem('user');

  if (!userData) {
    router.navigate(['/login']);
    return false;
  }

  const user = JSON.parse(userData);

  if (user.role !== 'admin') {
    router.navigate(['/']);
    return false;
  }

  return true;
};