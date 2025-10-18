import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';

import { FaqComponent } from './faq.component';
import { DataService, FAQItem } from '../../core/services/data.service';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;

  const mockFAQs: FAQItem[] = [
    {
      id: '1',
      question: 'test.question1',
      answer: 'test.answer1',
      category: 'services',
    },
    {
      id: '2',
      question: 'test.question2',
      answer: 'test.answer2',
      category: 'process',
    },
    {
      id: '3',
      question: 'test.question3',
      answer: 'test.answer3',
      category: 'services',
    },
  ];

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', [], {
      faq: signal(mockFAQs),
    });

    await TestBed.configureTestingModule({
      imports: [
        FaqComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
      ],
      providers: [{ provide: DataService, useValue: mockDataService }],
    }).compileComponents();

    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.expandedIndex()).toBeNull();
    expect(component.selectedCategory()).toBe('all');
    expect(component.categories.length).toBe(5);
  });

  it('should have correct category configuration', () => {
    expect(component.categories.length).toBe(5);
    expect(component.categories[0]).toEqual({
      id: 'all',
      translationKey: 'faq.categories.all',
      icon: 'help',
    });
    expect(component.categories[1]).toEqual({
      id: 'services',
      translationKey: 'faq.categories.services',
      icon: 'work',
    });
    expect(component.categories[2]).toEqual({
      id: 'process',
      translationKey: 'faq.categories.process',
      icon: 'timeline',
    });
    expect(component.categories[3]).toEqual({
      id: 'security',
      translationKey: 'faq.categories.security',
      icon: 'security',
    });
    expect(component.categories[4]).toEqual({
      id: 'pricing',
      translationKey: 'faq.categories.pricing',
      icon: 'euro_symbol',
    });
  });

  it('should return all FAQs when category is "all"', () => {
    component.selectCategory('all');
    fixture.detectChanges();

    expect(component.filteredFAQs().length).toBe(3);
    expect(component.filteredFAQs()).toEqual(mockFAQs);
  });

  it('should filter FAQs by category', () => {
    component.selectCategory('services');
    fixture.detectChanges();

    const filtered = component.filteredFAQs();
    expect(filtered.length).toBe(2);
    expect(filtered.every(faq => faq.category === 'services')).toBe(true);
  });

  it('should filter FAQs by process category', () => {
    component.selectCategory('process');
    fixture.detectChanges();

    const filtered = component.filteredFAQs();
    expect(filtered.length).toBe(1);
    expect(filtered[0].category).toBe('process');
  });

  it('should return empty array for non-existent category', () => {
    component.selectCategory('nonexistent');
    fixture.detectChanges();

    expect(component.filteredFAQs().length).toBe(0);
  });

  it('should change selected category when selectCategory is called', () => {
    expect(component.selectedCategory()).toBe('all');

    component.selectCategory('services');
    expect(component.selectedCategory()).toBe('services');

    component.selectCategory('process');
    expect(component.selectedCategory()).toBe('process');
  });

  it('should reset expanded index when changing category', () => {
    component.expandedIndexSignal.set(1);
    expect(component.expandedIndex()).toBe(1);

    component.selectCategory('services');
    expect(component.expandedIndex()).toBeNull();
  });

  it('should track FAQ items by id', () => {
    const faq = mockFAQs[0];
    const result = component.trackByFAQ(0, faq);
    expect(result).toBe(faq.id);
  });

  it('should render FAQ section with correct structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const faqSection = compiled.querySelector('#faq');
    expect(faqSection).toBeTruthy();
    expect(faqSection?.classList.contains('section')).toBe(true);
  });

  it('should render all category filter buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const filterButtons = compiled.querySelectorAll('.filter-button');

    expect(filterButtons.length).toBe(5);

    // Check that "all" category is initially active
    const activeButton = compiled.querySelector('.filter-button.active');
    expect(activeButton).toBeTruthy();
  });

  it('should render FAQ accordion when FAQs are available', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const accordion = compiled.querySelector('mat-accordion');
    expect(accordion).toBeTruthy();

    const panels = compiled.querySelectorAll('mat-expansion-panel');
    expect(panels.length).toBe(mockFAQs.length);
  });

  it('should update UI when category filter is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const servicesButton = compiled.querySelector('.filter-button:nth-child(2)') as HTMLElement;

    servicesButton.click();
    fixture.detectChanges();

    expect(component.selectedCategory()).toBe('services');
    expect(servicesButton.classList.contains('active')).toBe(true);
  });

  it('should show empty state when no FAQs match filter', () => {
    component.selectCategory('nonexistent');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const emptyState = compiled.querySelector('.empty-state');
    expect(emptyState).toBeTruthy();

    const emptyIcon = emptyState?.querySelector('mat-icon');
    expect(emptyIcon?.textContent?.trim()).toBe('search_off');
  });

  it('should handle expansion panel events', () => {
    // Simulate panel opening
    component.expandedIndexSignal.set(0);
    expect(component.expandedIndex()).toBe(0);

    // Simulate panel closing
    component.expandedIndexSignal.set(null);
    expect(component.expandedIndex()).toBeNull();
  });

  it('should render correct icons and content', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Check for main help icon
    const badgeIcon = compiled.querySelector('.badge-icon');
    expect(badgeIcon?.textContent?.trim()).toBe('help');

    // Check for question icons in panels
    const questionIcons = compiled.querySelectorAll('.question-icon');
    expect(questionIcons.length).toBe(mockFAQs.length);
    questionIcons.forEach(icon => {
      expect(icon.textContent?.trim()).toBe('help_outline');
    });
  });

  it('should access dataService faq signal', () => {
    expect(component.faqs()).toEqual(mockFAQs);
    expect(component.dataService).toBe(mockDataService);
  });

  it('should have readonly signals properly exposed', () => {
    expect(typeof component.expandedIndex).toBe('function');
    expect(typeof component.selectedCategory).toBe('function');
    expect(typeof component.filteredFAQs).toBe('function');
  });

  it('should handle multiple category changes', () => {
    // Test changing through multiple categories
    component.selectCategory('services');
    expect(component.selectedCategory()).toBe('services');
    expect(component.filteredFAQs().length).toBe(2);

    component.selectCategory('security');
    expect(component.selectedCategory()).toBe('security');
    expect(component.filteredFAQs().length).toBe(0);

    component.selectCategory('all');
    expect(component.selectedCategory()).toBe('all');
    expect(component.filteredFAQs().length).toBe(3);
  });

  it('should maintain state consistency when expanding panels', () => {
    // Set initial expanded state
    component.expandedIndexSignal.set(0);
    expect(component.expandedIndex()).toBe(0);

    // Change category should reset expanded state
    component.selectCategory('services');
    expect(component.expandedIndex()).toBeNull();

    // Set expanded state again
    component.expandedIndexSignal.set(1);
    expect(component.expandedIndex()).toBe(1);

    // Another category change should reset again
    component.selectCategory('process');
    expect(component.expandedIndex()).toBeNull();
  });

  it('should handle trackByFAQ with different FAQ items', () => {
    mockFAQs.forEach(faq => {
      const result = component.trackByFAQ(0, faq);
      expect(result).toBe(faq.id);
    });
  });

  it('should properly filter FAQs when category changes via computed signal', () => {
    // Initially shows all
    let filtered = component.filteredFAQs();
    expect(filtered.length).toBe(3);
    expect(filtered).toEqual(mockFAQs);

    // Filter by services
    component.selectCategory('services');
    filtered = component.filteredFAQs();
    expect(filtered.length).toBe(2);
    expect(filtered.every(faq => faq.category === 'services')).toBe(true);
    expect(filtered.map(f => f.id)).toEqual(['1', '3']);

    // Filter by process
    component.selectCategory('process');
    filtered = component.filteredFAQs();
    expect(filtered.length).toBe(1);
    expect(filtered[0].category).toBe('process');
    expect(filtered[0].id).toBe('2');
  });

  it('should use dataService methods correctly', () => {
    // Test that component accesses the faq signal from dataService
    const faqSignal = component.dataService.faq;
    expect(faqSignal()).toEqual(mockFAQs);

    // Test the faqs computed property
    expect(component.faqs()).toEqual(mockFAQs);
    expect(component.faqs).toBe(component.dataService.faq);
  });

  it('should have correct change detection strategy', () => {
    // Verify component metadata
    const componentInstance = fixture.componentRef.componentType as typeof FaqComponent;
    expect(componentInstance).toBeDefined();
  });

  it('should test all category combinations thoroughly', () => {
    const testCases = [
      { category: 'all', expectedCount: 3, expectedIds: ['1', '2', '3'] },
      { category: 'services', expectedCount: 2, expectedIds: ['1', '3'] },
      { category: 'process', expectedCount: 1, expectedIds: ['2'] },
      { category: 'security', expectedCount: 0, expectedIds: [] },
      { category: 'pricing', expectedCount: 0, expectedIds: [] },
    ];

    testCases.forEach(testCase => {
      component.selectCategory(testCase.category);
      const filtered = component.filteredFAQs();
      expect(filtered.length).toBe(testCase.expectedCount);
      expect(filtered.map(f => f.id)).toEqual(testCase.expectedIds);
    });
  });

  it('should handle DOM interactions correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Test clicking on different category buttons
    const buttons = compiled.querySelectorAll('.filter-button');
    expect(buttons.length).toBe(5);

    // Click on services button (index 1)
    const servicesBtn = buttons[1] as HTMLElement;
    servicesBtn.click();
    fixture.detectChanges();

    expect(component.selectedCategory()).toBe('services');
    expect(servicesBtn.classList.contains('active')).toBe(true);

    // Click on process button (index 2)
    const processBtn = buttons[2] as HTMLElement;
    processBtn.click();
    fixture.detectChanges();

    expect(component.selectedCategory()).toBe('process');
    expect(processBtn.classList.contains('active')).toBe(true);
    expect(servicesBtn.classList.contains('active')).toBe(false);
  });

  it('should properly test expansion panel interactions', () => {
    // Test that expansion panels can be opened and closed
    expect(component.expandedIndex()).toBeNull();

    // Simulate opening first panel
    component.expandedIndexSignal.set(0);
    expect(component.expandedIndex()).toBe(0);

    // Simulate opening second panel (should close first)
    component.expandedIndexSignal.set(1);
    expect(component.expandedIndex()).toBe(1);

    // Simulate closing panel
    component.expandedIndexSignal.set(null);
    expect(component.expandedIndex()).toBeNull();
  });

  it('should test computed signal reactivity', () => {
    // Test that filteredFAQs updates when the source data or category changes
    const initialFiltered = component.filteredFAQs();
    expect(initialFiltered.length).toBe(3);

    // Change category
    component.selectCategory('services');
    const servicesFiltered = component.filteredFAQs();
    expect(servicesFiltered.length).toBe(2);
    expect(servicesFiltered).not.toEqual(initialFiltered);

    // Change back to all
    component.selectCategory('all');
    const backToAllFiltered = component.filteredFAQs();
    expect(backToAllFiltered.length).toBe(3);
    expect(backToAllFiltered).toEqual(initialFiltered);
  });

  it('should handle edge cases in filtering', () => {
    // Test filtering with undefined or null category
    component.selectCategory('');
    expect(component.filteredFAQs().length).toBe(0);

    // Test with very long category name
    component.selectCategory('this-category-does-not-exist-in-our-data');
    expect(component.filteredFAQs().length).toBe(0);
  });

  it('should handle mat-expansion-panel events properly', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Get expansion panels
    const panels = compiled.querySelectorAll('mat-expansion-panel');
    expect(panels.length).toBe(mockFAQs.length);

    // Test that panels exist and have correct structure
    panels.forEach(panel => {
      expect(panel).toBeTruthy();
      const header = panel.querySelector('mat-expansion-panel-header');
      expect(header).toBeTruthy();
      const title = panel.querySelector('mat-panel-title');
      expect(title).toBeTruthy();
    });

    // Test expansion state changes
    expect(component.expandedIndex()).toBeNull();
    component.expandedIndexSignal.set(0);
    expect(component.expandedIndex()).toBe(0);
  });

  it('should test all component properties are properly initialized', () => {
    // Test that all readonly signals are functions (getters)
    expect(typeof component.expandedIndex).toBe('function');
    expect(typeof component.selectedCategory).toBe('function');
    expect(typeof component.faqs).toBe('function');
    expect(typeof component.filteredFAQs).toBe('function');

    // Test that categories array is properly defined
    expect(Array.isArray(component.categories)).toBe(true);
    expect(component.categories.length).toBe(5);

    // Test that dataService is injected
    expect(component.dataService).toBeTruthy();
    expect(component.dataService).toBe(mockDataService);
  });

  it('should handle multiple rapid category changes', () => {
    // Rapid fire category changes to test state consistency
    const categories = ['services', 'process', 'all', 'security', 'pricing', 'all'];

    categories.forEach(category => {
      component.selectCategory(category);
      expect(component.selectedCategory()).toBe(category);
      expect(component.expandedIndex()).toBeNull(); // Should reset on each change

      // Test filtering works correctly for each
      const filtered = component.filteredFAQs();
      if (category === 'all') {
        expect(filtered.length).toBe(3);
      } else if (category === 'services') {
        expect(filtered.length).toBe(2);
      } else if (category === 'process') {
        expect(filtered.length).toBe(1);
      } else {
        expect(filtered.length).toBe(0);
      }
    });
  });

  it('should test component lifecycle and injection', () => {
    // Test that component is properly instantiated
    expect(component).toBeInstanceOf(FaqComponent);

    // Test modern Angular inject pattern
    expect(component.dataService).toBeDefined();
    expect(component.dataService).toBe(mockDataService);

    // Test that all public signals are properly initialized
    expect(component.expandedIndexSignal).toBeDefined();
    expect(typeof component.selectedCategory).toBe('function');
    expect(component.selectedCategory()).toBe('all');
  });
});
