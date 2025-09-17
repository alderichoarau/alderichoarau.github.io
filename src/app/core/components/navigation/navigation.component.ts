import { Component, signal, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation.service';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
    selector: 'app-navigation',
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        TranslateModule
    ],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  // Modern Angular inject pattern - must be declared first
  private readonly translationService = inject(TranslationService);
  private readonly scrollAnimationService = inject(ScrollAnimationService);
  
  // Angular Signals for state management
  private readonly mobileMenuOpenSignal = signal(false);
  public readonly mobileMenuOpen = this.mobileMenuOpenSignal.asReadonly();
  
  private readonly scrolledSignal = signal(false);
  public readonly isScrolled = this.scrolledSignal.asReadonly();
  
  // Get language signal from service
  public readonly currentLang = this.translationService.currentLang;
  public readonly isEnglish = this.translationService.isEnglish;
  public readonly isFrench = this.translationService.isFrench;

  ngOnInit() {
    // Initial scroll position check
    this.updateScrollState();
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.updateScrollState();
  }

  private updateScrollState() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.scrolledSignal.set(scrollY > 50);
  }

  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  toggleMobileMenu() {
    this.mobileMenuOpenSignal.update(current => !current);
  }

  closeMobileMenu() {
    this.mobileMenuOpenSignal.set(false);
  }
  
  /**
   * Navigate to section with smooth scroll and close mobile menu
   */
  navigateToSection(sectionId: string) {
    this.scrollAnimationService.scrollToElement(`#${sectionId}`);
    this.closeMobileMenu();
  }
  
  /**
   * Handle click outside mobile menu
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.mobileMenuOpen()) {
      const target = event.target as Element;
      const mobileMenu = document.querySelector('.mobile-menu');
      const menuToggle = document.querySelector('.mobile-menu-toggle');
      
      // Close menu if clicking outside of it (but not on the toggle button)
      if (mobileMenu && !mobileMenu.contains(target) && !menuToggle?.contains(target)) {
        this.closeMobileMenu();
      }
    }
  }
  
  /**
   * Handle escape key to close mobile menu
   */
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey() {
    if (this.mobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }
}
