import { Injectable, signal, computed, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface TranslationData {
  [key: string]: string | TranslationData;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  // Modern Angular inject pattern
  private readonly translate = inject(TranslateService);
  private readonly http = inject(HttpClient);

  // Angular 18 Signals - Modern reactive state management
  private readonly currentLangSignal = signal<string>('fr');
  public readonly currentLang = this.currentLangSignal.asReadonly();

  // Computed signals for language checks
  public readonly isEnglish = computed(() => this.currentLangSignal() === 'en');
  public readonly isFrench = computed(() => this.currentLangSignal() === 'fr');

  constructor() {
    this.initializeTranslations();
  }

  private async initializeTranslations() {
    try {
      // Load French translations
      const frTranslations = await firstValueFrom(
        this.http.get<TranslationData>('/assets/i18n/fr.json')
      );
      this.translate.setTranslation('fr', frTranslations);

      // Load English translations
      const enTranslations = await firstValueFrom(
        this.http.get<TranslationData>('/assets/i18n/en.json')
      );
      this.translate.setTranslation('en', enTranslations);

      // Set default language
      this.translate.setDefaultLang('fr');

      // Get saved language from localStorage or default to 'fr'
      if (typeof localStorage !== 'undefined') {
        const savedLang = localStorage.getItem('language') || 'fr';
        this.setLanguage(savedLang);
      } else {
        this.setLanguage('fr');
      }
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to French
      this.translate.setDefaultLang('fr');
      this.setLanguage('fr');
    }
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLangSignal.set(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('language', lang);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }
}
