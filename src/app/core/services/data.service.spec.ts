import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── Technologies ──────────────────────────────────────────────────────────

  it('should expose all technologies as a signal', () => {
    const techs = service.technologies();
    expect(Array.isArray(techs)).toBe(true);
    expect(techs.length).toBeGreaterThan(0);
  });

  it('should contain Azure in technologies', () => {
    const techs = service.technologies();
    const azure = techs.find(t => t.name === 'Azure');
    expect(azure).toBeDefined();
    expect(azure?.category).toBe('cloud');
    expect(azure?.level).toBe('expert');
  });

  it('should filter technologies by frontend category', () => {
    const frontendTechs = service.getTechnologiesByCategory('frontend');
    expect(frontendTechs.length).toBeGreaterThan(0);
    frontendTechs.forEach(t => expect(t.category).toBe('frontend'));
  });

  it('should filter technologies by backend category', () => {
    const backendTechs = service.getTechnologiesByCategory('backend');
    expect(backendTechs.length).toBeGreaterThan(0);
    backendTechs.forEach(t => expect(t.category).toBe('backend'));
  });

  it('should filter technologies by cloud category', () => {
    const cloudTechs = service.getTechnologiesByCategory('cloud');
    expect(cloudTechs.length).toBeGreaterThan(0);
    cloudTechs.forEach(t => expect(t.category).toBe('cloud'));
  });

  it('should filter technologies by databases category', () => {
    const dbTechs = service.getTechnologiesByCategory('databases');
    expect(dbTechs.length).toBeGreaterThan(0);
    dbTechs.forEach(t => expect(t.category).toBe('databases'));
  });

  it('should filter technologies by tools category', () => {
    const toolsTechs = service.getTechnologiesByCategory('tools');
    expect(toolsTechs.length).toBeGreaterThan(0);
    toolsTechs.forEach(t => expect(t.category).toBe('tools'));
  });

  it('should find technology by name', () => {
    const java = service.getTechnologyByName('Java');
    expect(java).toBeDefined();
    expect(java?.name).toBe('Java');
    expect(java?.category).toBe('backend');
  });

  it('should return undefined for unknown technology name', () => {
    const result = service.getTechnologyByName('UnknownTech99');
    expect(result).toBeUndefined();
  });

  it('should have Angular in frontend technologies', () => {
    const frontendTechs = service.getTechnologiesByCategory('frontend');
    const angular = frontendTechs.find(t => t.name === 'Angular');
    expect(angular).toBeDefined();
    expect(angular?.level).toBe('expert');
  });

  // ── Projects ──────────────────────────────────────────────────────────────

  it('should expose projects as a signal', () => {
    const projects = service.projects();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it('should return only featured projects', () => {
    const featured = service.getFeaturedProjects();
    expect(featured.length).toBeGreaterThan(0);
    featured.forEach(p => expect(p.featured).toBe(true));
  });

  it('should not include non-featured projects in getFeaturedProjects', () => {
    const all = service.projects();
    const featured = service.getFeaturedProjects();
    const nonFeatured = all.filter(p => !p.featured);
    nonFeatured.forEach(p => {
      expect(featured.find(f => f.id === p.id)).toBeUndefined();
    });
  });

  // ── FAQ ───────────────────────────────────────────────────────────────────

  it('should expose faq as a signal', () => {
    const faqs = service.faq();
    expect(Array.isArray(faqs)).toBe(true);
    expect(faqs.length).toBe(7);
  });

  it('should have correct faq ids', () => {
    const faqs = service.faq();
    const ids = faqs.map(f => f.id);
    expect(ids).toContain('services');
    expect(ids).toContain('training');
    expect(ids).toContain('billing');
    expect(ids).toContain('remote');
  });

  it('should have question and answer keys for each faq', () => {
    service.faq().forEach(faq => {
      expect(faq.question).toMatch(/^faq\./);
      expect(faq.answer).toMatch(/^faq\./);
    });
  });
});
