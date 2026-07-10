import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';
import { FaqComponent } from './faq.component';
import { DataService, FAQItem } from '../../core/services/data.service';
import { beforeEach, describe, expect, it } from 'vitest';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;
  let mockDataService: { faq: ReturnType<typeof signal<FAQItem[]>> };

  const mockFAQs: FAQItem[] = [
    { id: '1', question: 'faq.q1', answer: 'faq.a1' },
    { id: '2', question: 'faq.q2', answer: 'faq.a2' },
    { id: '3', question: 'faq.q3', answer: 'faq.a3' },
  ];

  beforeEach(async () => {
    mockDataService = { faq: signal(mockFAQs) };

    await TestBed.configureTestingModule({
      imports: [FaqComponent, HttpClientTestingModule, NoopAnimationsModule],
      providers: [provideTranslateService(), { provide: DataService, useValue: mockDataService }],
    }).compileComponents();

    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with no panel expanded', () => {
    expect(component.expandedIndex()).toBeNull();
  });

  it('should expose faqs from dataService', () => {
    expect(component.faqs()).toEqual(mockFAQs);
    expect(component.faqs).toBe(mockDataService.faq);
  });

  it('should track FAQ items by id', () => {
    mockFAQs.forEach(faq => {
      expect(component.trackByFAQ(0, faq)).toBe(faq.id);
    });
  });

  it('should set expanded index when a panel is opened', () => {
    component.expandedIndexSignal.set(0);
    expect(component.expandedIndex()).toBe(0);

    component.expandedIndexSignal.set(1);
    expect(component.expandedIndex()).toBe(1);
  });

  it('should reset expanded index to null when a panel is closed', () => {
    component.expandedIndexSignal.set(2);
    expect(component.expandedIndex()).toBe(2);

    component.expandedIndexSignal.set(null);
    expect(component.expandedIndex()).toBeNull();
  });

  it('should render the faq section', () => {
    const section = fixture.nativeElement.querySelector('#faq');
    expect(section).toBeTruthy();
  });

  it('should render one expansion panel per FAQ item', () => {
    const panels = fixture.nativeElement.querySelectorAll('mat-expansion-panel');
    expect(panels.length).toBe(mockFAQs.length);
  });

  it('should render an accordion', () => {
    const accordion = fixture.nativeElement.querySelector('mat-accordion');
    expect(accordion).toBeTruthy();
  });

  it('should inject dataService correctly', () => {
    expect(component.dataService).toBe(mockDataService);
  });

  it('should expose expandedIndex as a readonly signal', () => {
    expect(typeof component.expandedIndex).toBe('function');
  });

  it('should expose faqs as a signal', () => {
    expect(typeof component.faqs).toBe('function');
  });
});
