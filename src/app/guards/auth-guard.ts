import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('🔐 AuthGuard verificando autenticação...');

  if (authService.isAuthenticated()) {
    console.log('✅ Usuário autenticado - acesso permitido');
    return true;
  } else {
    console.log('❌ Usuário NÃO autenticado - redirecionando para login');
    router.navigate(['/login']);
    return false;
  }
};
