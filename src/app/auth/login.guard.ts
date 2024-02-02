import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const loginGuard: CanActivateFn = async (childRoute, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);


  let data = await authService.checkAuthUser();

  if (data) {
    await router.navigate(['/admin']);
    return false;
  }

  return true;

};
