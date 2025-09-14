import { Component, signal, computed, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';

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
export class NavigationComponent implements OnInit, OnDestroy {
  // Angular Signals for state management
  private readonly mobileMenuOpenSignal = signal(false);
  public readonly mobileMenuOpen = this.mobileMenuOpenSignal.asReadonly();
  
  private readonly scrolledSignal = signal(false);
  public readonly isScrolled = this.scrolledSignal.asReadonly();
  
  // Get language signal from service
  public readonly currentLang = this.translationService.currentLang;
  public readonly isEnglish = this.translationService.isEnglish;
  public readonly isFrench = this.translationService.isFrench;

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    // Initial scroll position check
    this.updateScrollState();
  }

  ngOnDestroy() {
    // Cleanup handled by Angular 19 automatically for signals
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
}
