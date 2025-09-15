import { Injectable, signal, computed } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  // Angular 18 Signals - Modern reactive state management
  private readonly currentLangSignal = signal<string>('fr');
  public readonly currentLang = this.currentLangSignal.asReadonly();
  
  // Computed signals for language checks
  public readonly isEnglish = computed(() => this.currentLangSignal() === 'en');
  public readonly isFrench = computed(() => this.currentLangSignal() === 'fr');

  constructor(private translate: TranslateService, private http: HttpClient) {
    this.initializeTranslations();
  }

  private async initializeTranslations() {
    try {
      // Load French translations
      const frTranslations = await firstValueFrom(
        this.http.get<any>('/assets/i18n/fr.json')
      );
      this.translate.setTranslation('fr', frTranslations);

      // Load English translations
      const enTranslations = await firstValueFrom(
        this.http.get<any>('/assets/i18n/en.json')
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

  getCurrentLanguage(): string {
    return this.currentLangSignal();
  }

  getTranslation(key: string): string {
    return this.translate.instant(key);
  }
}
