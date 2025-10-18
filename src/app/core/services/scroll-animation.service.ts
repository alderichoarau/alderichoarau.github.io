import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollAnimationService {
  private observer?: IntersectionObserver;
  private animatedElements = new Set<Element>();

  // Signal to track if service is initialized
  private initialized: WritableSignal<boolean> = signal(false);

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObserver();
    }
  }

  private initializeObserver() {
    if (!this.observer) {
      this.observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
              // Add animation class
              entry.target.classList.add('in-view');
              this.animatedElements.add(entry.target);

              // Optional: unobserve after animation to improve performance
              this.observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );
      this.initialized.set(true);
    }
  }

  /**
   * Observe an element for scroll animations
   */
  observeElement(element: Element) {
    if (this.observer && !this.animatedElements.has(element)) {
      element.classList.add('animate-on-scroll');
      this.observer.observe(element);
    }
  }

  /**
   * Observe all elements with a specific selector
   */
  observeElementsBySelector(selector: string) {
    if (typeof document !== 'undefined') {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => this.observeElement(element));
    }
  }

  /**
   * Clean up observer
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.animatedElements.clear();
      this.initialized.set(false);
    }
  }

  /**
   * Smooth scroll to element
   */
  scrollToElement(selector: string, offset = 80) {
    if (typeof document !== 'undefined') {
      const element = document.querySelector(selector);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  }
}
