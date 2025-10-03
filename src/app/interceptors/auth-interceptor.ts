import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // PEGAR O TOKEN do AuthService
  const token = authService.getToken();
  let authReq = req;

  // SE EXISTIR TOKEN, adicionar ao cabeçalho
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // ENVIAR REQUISIÇÃO e tratar erros
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // SE ERRO 401 (Não Autorizado), fazer logout
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }

      // TRATAR DIFERENTES TIPOS DE ERRO
      switch (error.status) {
        case 400:
          console.error('Erro 400: Requisição inválida');
          break;
        case 404:
          console.error('Erro 404: Recurso não encontrado');
          break;
        case 500:
          console.error('Erro 500: Erro interno do servidor');
          break;
        default:
          console.error(`Erro ${error.status}: ${error.message}`);
      }

      return throwError(() => error);
    })
  );
};
