import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedModule } from '../../shared/shared.module';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit, OnDestroy {
  currentLang = 'en';
  mobileMenuOpen = false;
  private destroy$ = new Subject<void>();

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.translationService.currentLang$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.currentLang = lang;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
