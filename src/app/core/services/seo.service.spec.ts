import { TestBed } from '@angular/core/testing';
import { BrowserModule, Meta, Title } from '@angular/platform-browser';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let metaService: Meta;
  let titleService: Title;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [BrowserModule] });
    service = TestBed.inject(SeoService);
    metaService = TestBed.inject(Meta);
    titleService = TestBed.inject(Title);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── updateTitle ────────────────────────────────────────────────────────────

  it('should set the page title with suffix', () => {
    service.updateTitle('Accueil');
    expect(titleService.getTitle()).toBe('Accueil | Aldéric Hoarau - Portfolio');
  });

  it('should update the page title with a new value', () => {
    service.updateTitle('Contact');
    expect(titleService.getTitle()).toBe('Contact | Aldéric Hoarau - Portfolio');
  });

  // ── updateMetaDescription ─────────────────────────────────────────────────

  it('should update the meta description tag', () => {
    service.updateMetaDescription('Mon portfolio freelance cloud');
    const tag = metaService.getTag('name="description"');
    expect(tag?.content).toBe('Mon portfolio freelance cloud');
  });

  // ── updateOpenGraph ───────────────────────────────────────────────────────

  it('should update og:title and og:description', () => {
    service.updateOpenGraph({ title: 'OG Title', description: 'OG Desc' });
    expect(metaService.getTag('property="og:title"')?.content).toBe('OG Title');
    expect(metaService.getTag('property="og:description"')?.content).toBe('OG Desc');
  });

  it('should update og:image when image is provided', () => {
    service.updateOpenGraph({
      title: 'T',
      description: 'D',
      image: 'https://example.com/img.png',
    });
    expect(metaService.getTag('property="og:image"')?.content).toBe('https://example.com/img.png');
  });

  it('should not set og:image when image is not provided', () => {
    // Clear any existing og:image tag first
    metaService.removeTag('property="og:image"');
    service.updateOpenGraph({ title: 'T', description: 'D' });
    const imageTag = metaService.getTag('property="og:image"');
    expect(imageTag).toBeNull();
  });

  // ── addFAQStructuredData ───────────────────────────────────────────────────

  it('should inject a JSON-LD script tag for FAQ', () => {
    const faqs = [
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' },
    ];
    service.addFAQStructuredData(faqs);

    const script = document.getElementById('faq-structured-data') as HTMLScriptElement;
    expect(script).toBeTruthy();
    expect(script.type).toBe('application/ld+json');

    const data = JSON.parse(script.textContent || '{}');
    expect(data['@type']).toBe('FAQPage');
    expect(data.mainEntity.length).toBe(2);
    expect(data.mainEntity[0].name).toBe('Q1');
  });

  it('should replace existing FAQ structured data on second call', () => {
    service.addFAQStructuredData([{ question: 'Q1', answer: 'A1' }]);
    service.addFAQStructuredData([{ question: 'Q2', answer: 'A2' }]);

    const scripts = document.querySelectorAll('#faq-structured-data');
    expect(scripts.length).toBe(1);

    const data = JSON.parse((scripts[0] as HTMLScriptElement).textContent || '{}');
    expect(data.mainEntity[0].name).toBe('Q2');
  });

  // ── addBreadcrumbStructuredData ────────────────────────────────────────────

  it('should inject a JSON-LD script tag for breadcrumbs', () => {
    service.addBreadcrumbStructuredData([
      { name: 'Home', url: 'https://alderichoarau.github.io' },
      { name: 'Contact', url: 'https://alderichoarau.github.io/#contact' },
    ]);

    const script = document.getElementById('breadcrumb-structured-data') as HTMLScriptElement;
    expect(script).toBeTruthy();
    const data = JSON.parse(script.textContent || '{}');
    expect(data['@type']).toBe('BreadcrumbList');
    expect(data.itemListElement.length).toBe(2);
    expect(data.itemListElement[0].position).toBe(1);
  });

  it('should replace existing breadcrumb data on second call', () => {
    service.addBreadcrumbStructuredData([{ name: 'A', url: '/a' }]);
    service.addBreadcrumbStructuredData([{ name: 'B', url: '/b' }]);

    const scripts = document.querySelectorAll('#breadcrumb-structured-data');
    expect(scripts.length).toBe(1);
    const data = JSON.parse((scripts[0] as HTMLScriptElement).textContent || '{}');
    expect(data.itemListElement[0].name).toBe('B');
  });
});
