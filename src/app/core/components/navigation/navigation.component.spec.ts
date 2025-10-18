import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';

import { NavigationComponent } from './navigation.component';
import { TranslationService } from '../../services/translation.service';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let mockTranslationService: jasmine.SpyObj<TranslationService>;
  let mockScrollAnimationService: jasmine.SpyObj<ScrollAnimationService>;

  beforeEach(async () => {
    // Create spies for services
    mockTranslationService = jasmine.createSpyObj('TranslationService', ['setLanguage'], {
      currentLang: signal('fr'),
      isEnglish: signal(false),
      isFrench: signal(true),
    });

    mockScrollAnimationService = jasmine.createSpyObj('ScrollAnimationService', [
      'scrollToElement',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        NavigationComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
      ],
      providers: [
        { provide: TranslationService, useValue: mockTranslationService },
        { provide: ScrollAnimationService, useValue: mockScrollAnimationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;

    // Mock window.scrollY and document.documentElement.scrollTop
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 0, writable: true });

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
    component.toggleMobileMenu(); // Open menu
    expect(component.mobileMenuOpen()).toBe(true);

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
    component.toggleMobileMenu(); // Open menu first
    expect(component.mobileMenuOpen()).toBe(true);

    component.navigateToSection('about');

    expect(mockScrollAnimationService.scrollToElement).toHaveBeenCalledWith('#about');
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('should update scroll state based on window scroll position', () => {
    // Test initial state (not scrolled)
    expect(component.isScrolled()).toBe(false);

    // Mock scrolled position
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    component['updateScrollState']();
    expect(component.isScrolled()).toBe(true);

    // Mock scroll back to top
    Object.defineProperty(window, 'scrollY', { value: 30, writable: true });
    component['updateScrollState']();
    expect(component.isScrolled()).toBe(false);
  });

  it('should handle window scroll event', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const spy = spyOn<any>(component, 'updateScrollState');

    component.onWindowScroll();
    expect(spy).toHaveBeenCalled();
  });

  it('should handle escape key to close mobile menu', () => {
    component.toggleMobileMenu(); // Open menu
    expect(component.mobileMenuOpen()).toBe(true);

    component.onEscapeKey();
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('should not close mobile menu on escape when menu is closed', () => {
    expect(component.mobileMenuOpen()).toBe(false);

    spyOn(component, 'closeMobileMenu');
    component.onEscapeKey();

    expect(component.closeMobileMenu).not.toHaveBeenCalled();
  });

  it('should handle document click to close mobile menu', () => {
    // Create mock elements
    const mockMobileMenu = document.createElement('div');
    mockMobileMenu.className = 'mobile-menu';
    const mockMenuToggle = document.createElement('button');
    mockMenuToggle.className = 'mobile-menu-toggle';

    document.body.appendChild(mockMobileMenu);
    document.body.appendChild(mockMenuToggle);

    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === '.mobile-menu') return mockMobileMenu;
      if (selector === '.mobile-menu-toggle') return mockMenuToggle;
      return null;
    });

    // Open mobile menu
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen()).toBe(true);

    // Click outside menu
    const outsideElement = document.createElement('div');
    const clickEvent = new Event('click');
    Object.defineProperty(clickEvent, 'target', { value: outsideElement });

    component.onDocumentClick(clickEvent);
    expect(component.mobileMenuOpen()).toBe(false);

    // Cleanup
    document.body.removeChild(mockMobileMenu);
    document.body.removeChild(mockMenuToggle);
  });

  it('should not close mobile menu when clicking on menu toggle', () => {
    const mockMobileMenu = document.createElement('div');
    mockMobileMenu.className = 'mobile-menu';
    const mockMenuToggle = document.createElement('button');
    mockMenuToggle.className = 'mobile-menu-toggle';

    document.body.appendChild(mockMobileMenu);
    document.body.appendChild(mockMenuToggle);

    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === '.mobile-menu') return mockMobileMenu;
      if (selector === '.mobile-menu-toggle') return mockMenuToggle;
      return null;
    });

    component.toggleMobileMenu(); // Open menu

    // Click on toggle button
    const clickEvent = new Event('click');
    Object.defineProperty(clickEvent, 'target', { value: mockMenuToggle });

    spyOn(component, 'closeMobileMenu');
    component.onDocumentClick(clickEvent);

    expect(component.closeMobileMenu).not.toHaveBeenCalled();

    // Cleanup
    document.body.removeChild(mockMobileMenu);
    document.body.removeChild(mockMenuToggle);
  });

  it('should not handle document click when mobile menu is closed', () => {
    expect(component.mobileMenuOpen()).toBe(false);

    spyOn(component, 'closeMobileMenu');
    const clickEvent = new Event('click');
    component.onDocumentClick(clickEvent);

    expect(component.closeMobileMenu).not.toHaveBeenCalled();
  });

  it('should call ngOnInit and update scroll state', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const spy = spyOn<any>(component, 'updateScrollState');

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should render navigation toolbar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const toolbar = compiled.querySelector('mat-toolbar');

    expect(toolbar).toBeTruthy();
    expect(toolbar?.classList.contains('portfolio-navbar')).toBe(true);
  });

  it('should render desktop navigation menu', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navMenu = compiled.querySelector('.nav-menu');

    expect(navMenu).toBeTruthy();

    const navLinks = navMenu?.querySelectorAll('.nav-link');
    expect(navLinks?.length).toBeGreaterThan(5); // About, Technologies, Portfolio, Certifications, FAQ, Contact
  });

  it('should render mobile menu toggle button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const toggleButton = compiled.querySelector('.mobile-menu-toggle');

    expect(toggleButton).toBeTruthy();

    const icon = toggleButton?.querySelector('mat-icon');
    expect(icon?.textContent?.trim()).toBe('menu'); // Should show 'menu' when closed
  });

  it('should update mobile menu toggle icon when menu is open', () => {
    component.toggleMobileMenu();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toggleButton = compiled.querySelector('.mobile-menu-toggle');
    const icon = toggleButton?.querySelector('mat-icon');

    expect(icon?.textContent?.trim()).toBe('close');
  });

  it('should render mobile menu', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const mobileMenu = compiled.querySelector('.mobile-menu');

    expect(mobileMenu).toBeTruthy();
    expect(mobileMenu?.classList.contains('open')).toBe(false);
  });

  it('should show mobile menu when open', () => {
    component.toggleMobileMenu();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const mobileMenu = compiled.querySelector('.mobile-menu');

    expect(mobileMenu?.classList.contains('open')).toBe(true);
  });

  it('should render language switcher', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const langSwitcher = compiled.querySelector('.language-switcher');

    expect(langSwitcher).toBeTruthy();

    const langTrigger = langSwitcher?.querySelector('.lang-trigger');
    expect(langTrigger).toBeTruthy();
  });

  it('should render CTA button with email link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const ctaButton = compiled.querySelector('.cta-button') as HTMLAnchorElement;

    expect(ctaButton).toBeTruthy();
    expect(ctaButton.href).toBe('mailto:alderic.hoarau@gmail.com');
  });

  it('should handle navigation button clicks', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Find and click the about button
    const buttons = compiled.querySelectorAll('.nav-link');
    const aboutButton = Array.from(buttons).find(
      btn => btn.textContent?.includes('person') // mat-icon content
    ) as HTMLButtonElement;

    if (aboutButton) {
      aboutButton.click();
      fixture.detectChanges();

      expect(mockScrollAnimationService.scrollToElement).toHaveBeenCalledWith('#about');
    }
  });

  it('should handle mobile navigation clicks', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Open mobile menu first
    component.toggleMobileMenu();
    fixture.detectChanges();

    // Find mobile nav links
    const mobileNavLinks = compiled.querySelectorAll('.mobile-nav-link');
    expect(mobileNavLinks.length).toBeGreaterThan(0);

    // Click first mobile nav link (should be about)
    const firstMobileLink = mobileNavLinks[0] as HTMLButtonElement;
    firstMobileLink.click();
    fixture.detectChanges();

    expect(mockScrollAnimationService.scrollToElement).toHaveBeenCalled();
    expect(component.mobileMenuOpen()).toBe(false); // Should close menu
  });

  it('should handle mobile language change', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Open mobile menu
    component.toggleMobileMenu();
    fixture.detectChanges();

    // Find mobile language buttons
    const mobileLangButtons = compiled.querySelectorAll('.mobile-lang-button');
    expect(mobileLangButtons.length).toBe(2);

    // Click English button
    const englishButton = Array.from(mobileLangButtons).find(
      btn => btn.textContent?.includes('EN') || btn.textContent?.includes('English')
    ) as HTMLButtonElement;

    if (englishButton) {
      englishButton.click();
      fixture.detectChanges();

      expect(mockTranslationService.setLanguage).toHaveBeenCalledWith('en');
      expect(component.mobileMenuOpen()).toBe(false); // Should close menu
    }
  });

  it('should apply scrolled class when scrolled', () => {
    // Mock scrolled state
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    component['updateScrollState']();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toolbar = compiled.querySelector('mat-toolbar');

    expect(toolbar?.classList.contains('scrolled')).toBe(true);
  });

  it('should handle mobile menu overlay click', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Open mobile menu
    component.toggleMobileMenu();
    fixture.detectChanges();

    // Find and click overlay
    const overlay = compiled.querySelector('.mobile-menu-overlay') as HTMLElement;
    expect(overlay).toBeTruthy();

    overlay.click();
    fixture.detectChanges();

    expect(component.mobileMenuOpen()).toBe(false);
  });
});
