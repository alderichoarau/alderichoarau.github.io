import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';
import { DataService, FAQItem } from '../../core/services/data.service';
import { fadeInUpAnimation, listItemAnimation, slideInUpAnimation } from '../../shared/animations/animations';

@Component({
    selector: 'app-faq',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatExpansionModule, TranslateModule],
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.scss',
    animations: [fadeInUpAnimation, listItemAnimation, slideInUpAnimation]
})
export class FaqComponent {
  // Modern Angular inject pattern
  public readonly dataService = inject(DataService);
  
  expandedIndex: number | null = null;
  selectedCategory = 'all';

  // FAQ categories with icons and translation keys
  categories = [
    { id: 'all', translationKey: 'faq.categories.all', icon: 'help' },
    { id: 'services', translationKey: 'faq.categories.services', icon: 'work' },
    { id: 'process', translationKey: 'faq.categories.process', icon: 'timeline' },
    { id: 'security', translationKey: 'faq.categories.security', icon: 'security' },
    { id: 'pricing', translationKey: 'faq.categories.pricing', icon: 'euro_symbol' }
  ];

  // Get FAQ data from service
  get faqs() {
    return this.dataService.faq();
  }

  // Get filtered FAQs based on selected category
  getFilteredFAQs() {
    if (this.selectedCategory === 'all') {
      return this.faqs;
    }
    return this.faqs.filter(faq => faq.category === this.selectedCategory);
  }

  // Set category filter
  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.expandedIndex = null; // Close all panels when switching categories
  }

  // Track by function for performance
  trackByFAQ(index: number, faq: FAQItem) {
    return faq.id;
  }
}
