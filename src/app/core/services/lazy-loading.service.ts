import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LazyLoadingService {
  private observer!: IntersectionObserver;

  /**
   * Ensures the image source (src) is not vulnerable to XSS.
   * Allows only:
   *  - https:// and http:// URLs
   *  - data:image/* URIs
   */
  private isSafeImageSrc(src: string | null): boolean {
    if (!src) return false;
    // Accept only http(s) URLs or data:image URIs
    // Disallow other protocols: javascript:, vbscript:, file:, blob:, data:text/html, etc.
    return (
      /^https?:\/\/[\w\-]+(\.[\w\-]+)+([\/#?]?.*)$/i.test(src) ||
      /^data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/=]+$/i.test(src)
    );
  }

  constructor() {
    this.createObserver();
  }

  private createObserver(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              const src = element.getAttribute('data-src');
              
              if (src && this.isSafeImageSrc(src)) {
                // For images
                if (element.tagName === 'IMG') {
                  const imgElement = element as HTMLImageElement;
                  imgElement.src = src;
                  imgElement.classList.add('loaded');
                  imgElement.removeAttribute('data-src');
                }
                
                // For background images
                if (element.hasAttribute('data-bg-src')) {
                  element.style.backgroundImage = `url(${src})`;
                  element.classList.add('loaded');
                  element.removeAttribute('data-bg-src');
                }
              }
              
              // Add animation classes
              if (element.classList.contains('animate-on-scroll')) {
                element.classList.add('in-view');
              }
              
              // Stop observing once loaded
              this.observer.unobserve(element);
            }
          });
        },
        {
          root: null,
          rootMargin: '50px',
          threshold: 0.1
        }
      );
    }
  }

  /**
   * Start observing an element for lazy loading
   */
  observe(element: HTMLElement): void {
    if (this.observer) {
      this.observer.observe(element);
    }
  }

  /**
   * Stop observing an element
   */
  unobserve(element: HTMLElement): void {
    if (this.observer) {
      this.observer.unobserve(element);
    }
  }

  /**
   * Lazy load images within a container
   */
  lazyLoadImages(container: HTMLElement): void {
    const images = container.querySelectorAll('img[data-src]');
    images.forEach(img => this.observe(img as HTMLElement));
  }

  /**
   * Setup scroll animations for elements
   */
  setupScrollAnimations(container: HTMLElement): void {
    const animatedElements = container.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => this.observe(element as HTMLElement));
  }

  /**
   * Preload critical images
   */
  preloadCriticalImages(imageSrcs: string[]): void {
    imageSrcs.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      document.head.appendChild(link);
    });
  }

  /**
   * Optimize image loading with WebP support detection
   */
  getOptimizedImageSrc(basePath: string, format: 'webp' | 'jpg' | 'png' = 'jpg'): string {
    if (this.supportsWebP() && format !== 'png') {
      return `${basePath}.webp`;
    }
    return `${basePath}.${format}`;
  }

  /**
   * Check if browser supports WebP format
   */
  private supportsWebP(): boolean {
    if (typeof window === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    return canvas.toDataURL('image/webp').startsWith('data:image/webp');
  }

  /**
   * Cleanup observer when service is destroyed
   */
  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  /**
   * Checks if the image src is a safe and allowed URL.
   * Only allows http(s), protocol-relative or root-relative paths.
   */
  private isSafeImageSrc(src: string): boolean {
    // Allow absolute HTTP(S) URLs and root-relative/relative paths, disallow data:, javascript:
    try {
      // Disallow dangerous protocols
      if (
        src.trim().startsWith('javascript:') ||
        src.trim().startsWith('data:')
      ) {
        return false;
      }

      // Allow only http, https, protocol-relative, or relative (starts with / or .)
      if (
        src.trim().startsWith('http://') ||
        src.trim().startsWith('https://') ||
        src.trim().startsWith('//') ||
        src.trim().startsWith('/') ||
        src.trim().startsWith('./') ||
        src.trim().startsWith('../')
      ) {
        return true;
      }

      // optionally restrict more, e.g. block all ? and % encoded protocols
      return false;
    } catch {
      return false;
    }
  }
}