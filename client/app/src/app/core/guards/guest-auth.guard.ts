import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const guestAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService)
  const isLogged = userService.isLogged()

  if(!isLogged) {
    return true;
  }
  else {
    return router.createUrlTree(['/watches'])
  }
};
