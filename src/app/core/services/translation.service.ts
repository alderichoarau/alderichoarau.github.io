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
  private readonly translate = inject(TranslateService);
  private readonly http = inject(HttpClient);

  private readonly currentLangSignal = signal<string>('fr');
  public readonly currentLang = this.currentLangSignal.asReadonly();

  public readonly isEnglish = computed(() => this.currentLangSignal() === 'en');
  public readonly isFrench = computed(() => this.currentLangSignal() === 'fr');

  // Kicked off from app.config.ts via provideAppInitializer() rather than
  // the constructor — a service constructor should stay synchronous and
  // side-effect-free (Sonar S7059 / constructors shouldn't launch async work).
  async initialize(): Promise<void> {
    try {
      const frTranslations = await firstValueFrom(
        this.http.get<TranslationData>('/assets/i18n/fr.json')
      );
      this.translate.setTranslation('fr', frTranslations);

      const enTranslations = await firstValueFrom(
        this.http.get<TranslationData>('/assets/i18n/en.json')
      );
      this.translate.setTranslation('en', enTranslations);

      this.translate.setFallbackLang('fr');

      if (typeof localStorage !== 'undefined') {
        const savedLang = localStorage.getItem('language') || 'fr';
        this.setLanguage(savedLang);
      } else {
        this.setLanguage('fr');
      }
    } catch (error) {
      console.error('Error loading translations:', error);
      this.translate.setFallbackLang('fr');
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
