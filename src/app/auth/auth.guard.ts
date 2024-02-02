import {CanActivateChildFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateChildFn = async (childRoute, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  let data = await authService.checkAuthUser();

  if (data) {
    return true;
  }

  await router.navigate(['/login']);
  return false;
};
