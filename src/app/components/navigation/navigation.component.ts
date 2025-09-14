import { Component, signal, computed } from '@angular/core';
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
export class NavigationComponent {
  // Angular 18 Signals - No more OnInit/OnDestroy needed!
  private readonly mobileMenuOpenSignal = signal(false);
  public readonly mobileMenuOpen = this.mobileMenuOpenSignal.asReadonly();
  
  // Get language signal from service
  public readonly currentLang = this.translationService.currentLang;
  public readonly isEnglish = this.translationService.isEnglish;
  public readonly isFrench = this.translationService.isFrench;

  constructor(private translationService: TranslationService) {}

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
