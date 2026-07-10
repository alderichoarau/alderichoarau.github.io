import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslationService } from './translation.service';

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
