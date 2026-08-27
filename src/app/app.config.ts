import { ApplicationConfig, inject, isDevMode, provideAppInitializer } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideServiceWorker } from '@angular/service-worker';
import { TranslationService } from './core/services/translation.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // Modern HTTP client (fetch-based `FetchBackend` is the default since v20)
    provideHttpClient(),
    provideTranslateService(),

    // Load fr/en translations before the app becomes interactive
    provideAppInitializer(() => inject(TranslationService).initialize()),

    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
