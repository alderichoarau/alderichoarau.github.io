import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslatePipe } from '@ngx-translate/core';
import { DataService, FAQItem } from '../../core/services/data.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MatIconModule, MatExpansionModule, TranslatePipe],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  public readonly dataService = inject(DataService);
  public readonly faqs = this.dataService.faq;

  public readonly expandedIndexSignal = signal<number | null>(null);
  public readonly expandedIndex = this.expandedIndexSignal.asReadonly();

  trackByFAQ(_index: number, faq: FAQItem) {
    return faq.id;
  }
}
