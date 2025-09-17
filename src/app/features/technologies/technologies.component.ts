import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DataService, Technology } from '../../core/services/data.service';
import { fadeInUpAnimation, staggerAnimation, scaleInAnimation, bounceInAnimation } from '../../shared/animations/animations';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.scss',
  animations: [fadeInUpAnimation, staggerAnimation, scaleInAnimation, bounceInAnimation]
})
export class TechnologiesComponent {
  
  // Modern Angular inject pattern
  public readonly dataService = inject(DataService);
  private readonly translate = inject(TranslateService);
  
  // Get technologies from data service using Angular Signals
  public readonly technologies = this.dataService.technologies;
  
  // Category filters with signals
  private readonly selectedCategorySignal = signal<Technology['category'] | 'all'>('all');
  public readonly selectedCategory = this.selectedCategorySignal.asReadonly();
  
  // Available categories
  public readonly categories: {key: Technology['category'] | 'all', translationKey: string, icon: string}[] = [
    { key: 'all', translationKey: 'technologies.all', icon: 'apps' },
    { key: 'frontend', translationKey: 'technologies.frontend', icon: 'web' },
    { key: 'backend', translationKey: 'technologies.backend', icon: 'storage' },
    { key: 'cloud', translationKey: 'technologies.cloud', icon: 'cloud' },
    { key: 'databases', translationKey: 'technologies.databases', icon: 'database' },
    { key: 'tools', translationKey: 'technologies.tools', icon: 'build' }
  ];

  // Filter technologies by selected category
  getFilteredTechnologies(): Technology[] {
    const category = this.selectedCategory();
    return category === 'all' 
      ? this.technologies()
      : this.dataService.getTechnologiesByCategory(category);
  }

  // Set selected category
  selectCategory(category: Technology['category'] | 'all') {
    this.selectedCategorySignal.set(category);
  }

  // Get level badge color - LinkedIn colors
  getLevelColor(level: Technology['level']): string {
    switch (level) {
      case 'expert':
        return 'var(--accent-color)'; // Jaune orangé chaud
      case 'advanced':
        return 'var(--accent-secondary)'; // Orange plus foncé
      case 'intermediate':
        return 'var(--accent-tertiary)'; // Gris chaud
      default:
        return 'var(--text-muted)';
    }
  }

  // Get level badge text
  getLevelText(level: Technology['level']): string {
    return this.translate.instant(`technologies.levels.${level}`) || level;
  }

  // TrackBy function for performance optimization
  trackByTech(index: number, tech: Technology): string {
    return tech.name;
  }

  // Get technologies for a specific category (helper for template)
  getCategoryTechnologies(categoryKey: Technology['category'] | 'all'): Technology[] {
    if (categoryKey === 'all') {
      return this.technologies();
    }
    return this.dataService.getTechnologiesByCategory(categoryKey);
  }
}
