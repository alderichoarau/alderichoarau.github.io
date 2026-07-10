import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';
import { vi } from 'vitest';

import { NavigationComponent } from './navigation.component';
import { TranslationService } from '../../services/translation.service';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let mockTranslationService: {
    setLanguage: ReturnType<typeof vi.fn>;
    currentLang: ReturnType<typeof signal<string>>;
    isEnglish: ReturnType<typeof signal<boolean>>;
    isFrench: ReturnType<typeof signal<boolean>>;
  };
  let mockScrollAnimationService: { scrollToElement: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockTranslationService = {
      setLanguage: vi.fn(),
      currentLang: signal('fr'),
      isEnglish: signal(false),
      isFrench: signal(true),
    };
    mockScrollAnimationService = { scrollToElement: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [NavigationComponent, HttpClientTestingModule, NoopAnimationsModule],
      providers: [
        provideTranslateService(),
        { provide: TranslationService, useValue: mockTranslationService },
        { provide: ScrollAnimationService, useValue: mockScrollAnimationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.mobileMenuOpen()).toBe(false);
    expect(component.isScrolled()).toBe(false);
    expect(component.currentLang()).toBe('fr');
    expect(component.isFrench()).toBe(true);
    expect(component.isEnglish()).toBe(false);
  });

  it('should inject services correctly', () => {
    expect(component['translationService']).toBe(mockTranslationService);
    expect(component['scrollAnimationService']).toBe(mockScrollAnimationService);
  });

  it('should toggle mobile menu', () => {
    expect(component.mobileMenuOpen()).toBe(false);
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen()).toBe(true);
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('should close mobile menu', () => {
    component.toggleMobileMenu();
    component.closeMobileMenu();
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('should change language', () => {
    component.changeLanguage('en');
    expect(mockTranslationService.setLanguage).toHaveBeenCalledWith('en');
    component.changeLanguage('fr');
    expect(mockTranslationService.setLanguage).toHaveBeenCalledWith('fr');
  });

  it('should navigate to section and close mobile menu', () => {
    component.toggleMobileMenu();
    component.navigateToSection('about');
    expect(mockScrollAnimationService.scrollToElement).toHaveBeenCalledWith('#about');
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('should update scroll state based on window scroll position', () => {
    expect(component.isScrolled()).toBe(false);
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    component['updateScrollState']();
    expect(component.isScrolled()).toBe(true);
    Object.defineProperty(window, 'scrollY', { value: 30, writable: true });
    component['updateScrollState']();
    expect(component.isScrolled()).toBe(false);
  });

  it('should call updateScrollState on window scroll', () => {
    const spy = vi.spyOn(
      component as NavigationComponent & { updateScrollState(): void },
      'updateScrollState'
    );
    component.onWindowScroll();
    expect(spy).toHaveBeenCalled();
  });

  it('should handle escape key to close mobile menu', () => {
    component.toggleMobileMenu();
    component.onEscapeKey();
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('should not close mobile menu on escape when already closed', () => {
    const spy = vi.spyOn(component, 'closeMobileMenu');
    component.onEscapeKey();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should close menu on outside document click', () => {
    const mockMobileMenu = document.createElement('div');
    const mockMenuToggle = document.createElement('button');
    document.body.appendChild(mockMobileMenu);
    document.body.appendChild(mockMenuToggle);

    vi.spyOn(document, 'querySelector').mockImplementation((selector: string) => {
      if (selector === '.mobile-menu') return mockMobileMenu;
      if (selector === '.mobile-menu-toggle') return mockMenuToggle;
      return null;
    });

    component.toggleMobileMenu();
    const event = new Event('click');
    Object.defineProperty(event, 'target', { value: document.createElement('div') });
    component.onDocumentClick(event);
    expect(component.mobileMenuOpen()).toBe(false);

    vi.restoreAllMocks();
    document.body.removeChild(mockMobileMenu);
    document.body.removeChild(mockMenuToggle);
  });

  it('should not close menu when clicking the toggle button', () => {
    const mockMobileMenu = document.createElement('div');
    const mockMenuToggle = document.createElement('button');
    document.body.appendChild(mockMobileMenu);
    document.body.appendChild(mockMenuToggle);

    vi.spyOn(document, 'querySelector').mockImplementation((selector: string) => {
      if (selector === '.mobile-menu') return mockMobileMenu;
      if (selector === '.mobile-menu-toggle') return mockMenuToggle;
      return null;
    });

    component.toggleMobileMenu();
    const spy = vi.spyOn(component, 'closeMobileMenu');
    const event = new Event('click');
    Object.defineProperty(event, 'target', { value: mockMenuToggle });
    component.onDocumentClick(event);
    expect(spy).not.toHaveBeenCalled();

    vi.restoreAllMocks();
    document.body.removeChild(mockMobileMenu);
    document.body.removeChild(mockMenuToggle);
  });

  it('should not handle document click when menu is closed', () => {
    const spy = vi.spyOn(component, 'closeMobileMenu');
    component.onDocumentClick(new Event('click'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call updateScrollState on ngOnInit', () => {
    const spy = vi.spyOn(
      component as NavigationComponent & { updateScrollState(): void },
      'updateScrollState'
    );
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should render the mat-toolbar', () => {
    const toolbar = fixture.nativeElement.querySelector('mat-toolbar');
    expect(toolbar).toBeTruthy();
    expect(toolbar.classList.contains('portfolio-navbar')).toBe(true);
  });

  it('should render mobile menu toggle with menu icon', () => {
    const icon = fixture.nativeElement.querySelector('.mobile-menu-toggle mat-icon');
    expect(icon?.textContent?.trim()).toBe('menu');
  });

  it('should show close icon when mobile menu is open', () => {
    component.toggleMobileMenu();
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.mobile-menu-toggle mat-icon');
    expect(icon?.textContent?.trim()).toBe('close');
  });

  it('should add open class to mobile menu when open', () => {
    component.toggleMobileMenu();
    fixture.detectChanges();
    const mobileMenu = fixture.nativeElement.querySelector('.mobile-menu');
    expect(mobileMenu?.classList.contains('open')).toBe(true);
  });

  it('should render CTA button with correct email href', () => {
    const cta = fixture.nativeElement.querySelector('.cta-button') as HTMLAnchorElement;
    expect(cta).toBeTruthy();
    expect(cta.href).toBe('mailto:alderic.hoarau@gmail.com');
  });

  it('should apply scrolled class to toolbar when scrolled', () => {
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    component['updateScrollState']();
    fixture.detectChanges();
    const toolbar = fixture.nativeElement.querySelector('mat-toolbar');
    expect(toolbar?.classList.contains('scrolled')).toBe(true);
  });

  it('should close menu when overlay is clicked', () => {
    component.toggleMobileMenu();
    fixture.detectChanges();
    const overlay = fixture.nativeElement.querySelector('.mobile-menu-overlay') as HTMLElement;
    overlay.click();
    fixture.detectChanges();
    expect(component.mobileMenuOpen()).toBe(false);
  });
});
