import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ScrollAnimationService } from './scroll-animation.service';

// Capture the IntersectionObserver callback so tests can trigger it manually
let capturedCallback: IntersectionObserverCallback | null = null;
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

class ControllableIntersectionObserver {
  constructor(cb: IntersectionObserverCallback) {
    capturedCallback = cb;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  observe = mockObserve;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unobserve = mockUnobserve;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect = mockDisconnect;
}

describe('ScrollAnimationService', () => {
  let service: ScrollAnimationService;

  beforeEach(() => {
    capturedCallback = null;
    mockObserve.mockReset();
    mockUnobserve.mockReset();
    mockDisconnect.mockReset();
    globalThis.IntersectionObserver =
      ControllableIntersectionObserver as unknown as typeof IntersectionObserver;

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

  it('should not re-observe an element already in animatedElements set after callback', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    service.observeElement(el);

    // Trigger the callback — adds element to animatedElements Set
    capturedCallback!(
      [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );

    const callsBefore = mockObserve.mock.calls.length;
    service.observeElement(el); // element already in animatedElements — should skip
    expect(mockObserve.mock.calls.length).toBe(callsBefore);
    document.body.removeChild(el);
  });

  // ── IntersectionObserver callback ─────────────────────────────────────────

  it('should add in-view class when element is intersecting', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    service.observeElement(el);

    expect(capturedCallback).not.toBeNull();
    capturedCallback!(
      [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );

    expect(el.classList.contains('in-view')).toBe(true);
    document.body.removeChild(el);
  });

  it('should unobserve element after adding in-view class', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    service.observeElement(el);

    capturedCallback!(
      [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );

    expect(mockUnobserve).toHaveBeenCalledWith(el);
    document.body.removeChild(el);
  });

  it('should not add in-view class when element is not intersecting', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    service.observeElement(el);

    capturedCallback!(
      [{ isIntersecting: false, target: el } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );

    expect(el.classList.contains('in-view')).toBe(false);
    document.body.removeChild(el);
  });

  it('should not add in-view class twice for the same element', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    service.observeElement(el);

    // First intersection
    capturedCallback!(
      [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
    // Second intersection (element already in animatedElements Set)
    capturedCallback!(
      [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );

    expect(mockUnobserve.mock.calls.length).toBe(1); // unobserved only once
    document.body.removeChild(el);
  });

  // ── observeElementsBySelector ─────────────────────────────────────────────

  it('should observe multiple elements matching selector', () => {
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');
    el1.className = 'test-obs-section';
    el2.className = 'test-obs-section';
    document.body.appendChild(el1);
    document.body.appendChild(el2);

    service.observeElementsBySelector('.test-obs-section');

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
    el.id = 'scroll-target-obs';
    document.body.appendChild(el);

    const spy = vi.spyOn(window, 'scrollTo').mockImplementation((): void => undefined);
    service.scrollToElement('#scroll-target-obs');
    expect(spy).toHaveBeenCalled();
    vi.restoreAllMocks();

    document.body.removeChild(el);
  });

  // ── destroy ───────────────────────────────────────────────────────────────

  it('should disconnect observer on destroy', () => {
    service.destroy();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should allow observing after destroy', () => {
    service.destroy();
    const el = document.createElement('div');
    document.body.appendChild(el);
    expect(() => service.observeElement(el)).not.toThrow();
    document.body.removeChild(el);
  });
});
