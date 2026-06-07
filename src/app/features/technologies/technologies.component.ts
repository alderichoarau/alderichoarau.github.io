import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { DataService, Technology } from '../../core/services/data.service';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [MatIconModule, TranslateModule],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologiesComponent {
  public readonly dataService = inject(DataService);
  public readonly technologies = this.dataService.technologies;

  public readonly categories: {
    key: Technology['category'] | 'all';
    translationKey: string;
    icon: string;
  }[] = [
    { key: 'all', translationKey: 'technologies.all', icon: 'apps' },
    { key: 'frontend', translationKey: 'technologies.frontend', icon: 'web' },
    { key: 'backend', translationKey: 'technologies.backend', icon: 'storage' },
    { key: 'cloud', translationKey: 'technologies.cloud', icon: 'cloud' },
    { key: 'databases', translationKey: 'technologies.databases', icon: 'database' },
    { key: 'tools', translationKey: 'technologies.tools', icon: 'build' },
  ];

  getCategoryTechnologies = computed(() => {
    return (categoryKey: Technology['category'] | 'all'): Technology[] => {
      if (categoryKey === 'all') {
        return this.technologies();
      }
      return this.dataService.getTechnologiesByCategory(categoryKey);
    };
  });
}
