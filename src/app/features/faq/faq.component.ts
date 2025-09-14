import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-faq',
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatExpansionModule, TranslateModule],
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.scss'
})
export class FaqComponent {
  expandedIndex: number | null = null;

  faqs = [
    {
      question: 'faq.q1',
      answer: 'faq.a1'
    },
    {
      question: 'faq.q2',
      answer: 'faq.a2'
    },
    {
      question: 'faq.q3',
      answer: 'faq.a3'
    },
    {
      question: 'faq.q4',
      answer: 'faq.a4'
    },
    {
      question: 'faq.q5',
      answer: 'faq.a5'
    },
    {
      question: 'faq.q6',
      answer: 'faq.a6'
    },
    {
      question: 'faq.q7',
      answer: 'faq.a7'
    },
    {
      question: 'faq.q8',
      answer: 'faq.a8'
    }
  ];
}
