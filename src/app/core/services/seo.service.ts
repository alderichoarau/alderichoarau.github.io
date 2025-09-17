import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface FAQStructuredData {
  '@context': string;
  '@type': string;
  mainEntity: {
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  updateTitle(title: string): void {
    this.title.setTitle(`${title} | Aldéric Hoarau - Portfolio`);
  }

  updateMetaDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
  }

  updateOpenGraph(data: { title: string; description: string; image?: string }): void {
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    
    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
    }
  }

  addFAQStructuredData(faqs: { question: string; answer: string }[]): void {
    const faqData: FAQStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };

    // Remove existing FAQ structured data script if any
    const existingScript = document.getElementById('faq-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.id = 'faq-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqData);
    document.head.appendChild(script);
  }

  addBreadcrumbStructuredData(breadcrumbs: { name: string; url: string }[]): void {
    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    };

    // Remove existing breadcrumb structured data script if any
    const existingScript = document.getElementById('breadcrumb-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.id = 'breadcrumb-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumbData);
    document.head.appendChild(script);
  }
}