import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const isAdmin = userService.isAdmin();
  const isLogged = userService.isLogged()

  if (isAdmin && isLogged) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
