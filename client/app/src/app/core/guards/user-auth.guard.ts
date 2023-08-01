import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService)
  const isLogged = userService.isLogged()
  const isAdmin = userService.isAdmin()

  if(isLogged && !isAdmin) {
    return true
  }
  else {
    return router.createUrlTree(['/users/login'])
  }
};
