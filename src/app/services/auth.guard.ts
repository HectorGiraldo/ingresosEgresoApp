import { inject } from '@angular/core';
import { CanActivateFn, CanLoadFn, Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { AuthService } from './auth.service';
export const AuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated().pipe(
    tap((estado) => {
      if (!estado) {
        router.navigate(['/login']);
      }
    })
  );
};

export const AuthLoadGuard: CanLoadFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated().pipe(
    tap((estado) => {
      if (!estado) {
        router.navigate(['/login']);
      }
    }),
    take(1)
  );
};
