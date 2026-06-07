import { TestBed } from '@angular/core/testing';
import { ScrollAnimationService } from './scroll-animation.service';

describe('ScrollAnimationService', () => {
  let service: ScrollAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── observeElement ────────────────────────────────────────────────────────

  it('should add animate-on-scroll class when observing an element', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    service.observeElement(el);
    expect(el.classList.contains('animate-on-scroll')).toBe(true);
    document.body.removeChild(el);
  });

  it('should not add class twice if element already animated', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    service.observeElement(el);
    service.observeElement(el); // second call — already in Set
    expect(el.classList.contains('animate-on-scroll')).toBe(true);
    document.body.removeChild(el);
  });

  // ── observeElementsBySelector ─────────────────────────────────────────────

  it('should observe multiple elements matching selector', () => {
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');
    el1.className = 'test-section';
    el2.className = 'test-section';
    document.body.appendChild(el1);
    document.body.appendChild(el2);

    service.observeElementsBySelector('.test-section');

    expect(el1.classList.contains('animate-on-scroll')).toBe(true);
    expect(el2.classList.contains('animate-on-scroll')).toBe(true);

    document.body.removeChild(el1);
    document.body.removeChild(el2);
  });

  it('should not throw when selector matches nothing', () => {
    expect(() => service.observeElementsBySelector('.no-such-element')).not.toThrow();
  });

  // ── scrollToElement ────────────────────────────────────────────────────────

  it('should not throw when target element does not exist', () => {
    expect(() => service.scrollToElement('#nonexistent-id')).not.toThrow();
  });

  it('should call window.scrollTo when element is found', () => {
    const el = document.createElement('div');
    el.id = 'scroll-target';
    document.body.appendChild(el);

    spyOn(window, 'scrollTo');
    service.scrollToElement('#scroll-target');
    expect(window.scrollTo).toHaveBeenCalled();

    document.body.removeChild(el);
  });

  // ── destroy ───────────────────────────────────────────────────────────────

  it('should not throw when destroy is called', () => {
    expect(() => service.destroy()).not.toThrow();
  });

  it('should allow observing after destroy', () => {
    service.destroy();
    const el = document.createElement('div');
    document.body.appendChild(el);
    expect(() => service.observeElement(el)).not.toThrow();
    document.body.removeChild(el);
  });
});
