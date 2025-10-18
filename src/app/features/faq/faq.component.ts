import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';
import { DataService, FAQItem } from '../../core/services/data.service';
import {
  fadeInUpAnimation,
  listItemAnimation,
  slideInUpAnimation,
} from '../../shared/animations/animations';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatExpansionModule, TranslateModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  animations: [fadeInUpAnimation, listItemAnimation, slideInUpAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  // Modern Angular inject pattern
  public readonly dataService = inject(DataService);

  // Angular 19 signals for reactive state
  public readonly expandedIndexSignal = signal<number | null>(null);
  public readonly expandedIndex = this.expandedIndexSignal.asReadonly();

  private readonly selectedCategorySignal = signal<string>('all');
  public readonly selectedCategory = this.selectedCategorySignal.asReadonly();

  // FAQ categories with icons and translation keys
  public readonly categories = [
    { id: 'all', translationKey: 'faq.categories.all', icon: 'help' },
    { id: 'services', translationKey: 'faq.categories.services', icon: 'work' },
    { id: 'process', translationKey: 'faq.categories.process', icon: 'timeline' },
    { id: 'security', translationKey: 'faq.categories.security', icon: 'security' },
    { id: 'pricing', translationKey: 'faq.categories.pricing', icon: 'euro_symbol' },
  ] as const;

  // Angular 19 computed signals for better performance
  public readonly faqs = this.dataService.faq;

  public readonly filteredFAQs = computed(() => {
    const category = this.selectedCategory();
    if (category === 'all') {
      return this.faqs();
    }
    return this.faqs().filter(faq => faq.category === category);
  });

  // Set category filter
  selectCategory(categoryId: string): void {
    this.selectedCategorySignal.set(categoryId);
    this.expandedIndexSignal.set(null); // Close all panels when switching categories
  }

  // Track by function for performance
  trackByFAQ(index: number, faq: FAQItem) {
    return faq.id;
  }
}
