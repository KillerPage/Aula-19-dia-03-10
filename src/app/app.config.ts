import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth-interceptor';
import { withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
   providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),// INJETAR rotas
      provideHttpClient(withInterceptors([authInterceptor])) // CONFIGURAR HttpClient COM Interceptor

  ]
};
