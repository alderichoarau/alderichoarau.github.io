import { TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslationService } from './translation.service';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Lets pending microtasks (e.g. the awaited firstValueFrom chain) settle
// before the next assertion or HTTP flush runs.
const flushMicrotasks = () => new Promise(resolve => setTimeout(resolve, 0));

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TranslationService, provideTranslateService()],
    });
    service = TestBed.inject(TranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose currentLang as a readonly signal', () => {
    expect(typeof service.currentLang).toBe('function');
  });

  it('should expose isEnglish as a computed signal', () => {
    expect(typeof service.isEnglish).toBe('function');
  });

  it('should expose isFrench as a computed signal', () => {
    expect(typeof service.isFrench).toBe('function');
  });

  it('should update currentLang signal when setLanguage is called', () => {
    service.setLanguage('en');
    expect(service.currentLang()).toBe('en');

    service.setLanguage('fr');
    expect(service.currentLang()).toBe('fr');
  });

  it('should set isEnglish to true when language is en', () => {
    service.setLanguage('en');
    expect(service.isEnglish()).toBe(true);
    expect(service.isFrench()).toBe(false);
  });

  it('should set isFrench to true when language is fr', () => {
    service.setLanguage('fr');
    expect(service.isFrench()).toBe(true);
    expect(service.isEnglish()).toBe(false);
  });

  it('should persist language to localStorage', () => {
    service.setLanguage('en');
    expect(localStorage.getItem('language')).toBe('en');

    service.setLanguage('fr');
    expect(localStorage.getItem('language')).toBe('fr');
  });

  it('should update document.documentElement.lang', () => {
    service.setLanguage('en');
    expect(document.documentElement.lang).toBe('en');

    service.setLanguage('fr');
    expect(document.documentElement.lang).toBe('fr');
  });
});

describe('TranslationService - initialization', () => {
  let httpMock: HttpTestingController;
  let translate: TranslateService;

  function createService(): TranslationService {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TranslationService, provideTranslateService()],
    });
    httpMock = TestBed.inject(HttpTestingController);
    translate = TestBed.inject(TranslateService);
    return TestBed.inject(TranslationService);
  }

  afterEach(() => {
    localStorage.removeItem('language');
    httpMock.verify();
  });

  it('should load fr and en translations and set fr as fallback language', async () => {
    createService();
    const setTranslationSpy = vi.spyOn(translate, 'setTranslation');
    const setFallbackLangSpy = vi.spyOn(translate, 'setFallbackLang');

    httpMock.expectOne('/assets/i18n/fr.json').flush({ hello: 'bonjour' });
    await flushMicrotasks();
    httpMock.expectOne('/assets/i18n/en.json').flush({ hello: 'hello' });
    await flushMicrotasks();

    expect(setTranslationSpy).toHaveBeenCalledWith('fr', { hello: 'bonjour' });
    expect(setTranslationSpy).toHaveBeenCalledWith('en', { hello: 'hello' });
    expect(setFallbackLangSpy).toHaveBeenCalledWith('fr');
  });

  it('should use the language saved in localStorage once translations are loaded', async () => {
    localStorage.setItem('language', 'en');
    const service = createService();

    httpMock.expectOne('/assets/i18n/fr.json').flush({});
    await flushMicrotasks();
    httpMock.expectOne('/assets/i18n/en.json').flush({});
    await flushMicrotasks();

    expect(service.currentLang()).toBe('en');
  });

  it('should default to French when no language is saved', async () => {
    const service = createService();

    httpMock.expectOne('/assets/i18n/fr.json').flush({});
    await flushMicrotasks();
    httpMock.expectOne('/assets/i18n/en.json').flush({});
    await flushMicrotasks();

    expect(service.currentLang()).toBe('fr');
  });

  it('should fall back to French and log an error when loading translations fails', async () => {
    const service = createService();
    const setFallbackLangSpy = vi.spyOn(translate, 'setFallbackLang');
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    httpMock.expectOne('/assets/i18n/fr.json').error(new ProgressEvent('error'));
    await flushMicrotasks();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error loading translations:', expect.anything());
    expect(setFallbackLangSpy).toHaveBeenCalledWith('fr');
    expect(service.currentLang()).toBe('fr');

    consoleErrorSpy.mockRestore();
  });
});
