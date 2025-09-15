import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    // Angular 18 Modern Router with optimizations
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(), // Better initial loading
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),
    
    // Angular 18 Client Hydration for SSR support
    provideClientHydration(),
    
    // Modern HTTP client with fetch API
    provideHttpClient(withFetch()),
    
    // Async animations for better performance
    provideAnimationsAsync(),
    
    // Translation module
    importProvidersFrom(
      TranslateModule.forRoot()
    ),
    
    // Service Worker
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
