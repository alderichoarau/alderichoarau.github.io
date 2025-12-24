import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
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
        entries => {
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
          threshold: 0.1,
        }
      );
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
      if (src.trim().startsWith('javascript:') || src.trim().startsWith('data:')) {
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
