import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [SharedModule],
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
