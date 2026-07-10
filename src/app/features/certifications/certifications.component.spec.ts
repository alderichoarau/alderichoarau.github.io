import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CertificationsComponent } from './certifications.component';

describe('CertificationsComponent', () => {
  let component: CertificationsComponent;
  let fixture: ComponentFixture<CertificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationsComponent, HttpClientTestingModule],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 5 certifications', () => {
    expect(component.certifications.length).toBe(5);
  });

  it('should include AZ-900 certification', () => {
    const az900 = component.certifications.find(c => c.title === 'certifications.az900');
    expect(az900).toBeDefined();
    expect(az900?.icon).toBe('cloud_queue');
  });

  it('should include PSM1 as first certification', () => {
    expect(component.certifications[0].title).toBe('certifications.psm1');
  });

  it('should have no status field on any certification', () => {
    component.certifications.forEach(cert => {
      expect((cert as { status?: string }).status).toBeUndefined();
    });
  });

  it('should have 3 languages', () => {
    expect(component.languages.length).toBe(3);
  });

  it('should have French with 3 dots', () => {
    const french = component.languages.find(l => l.name === 'languages.french');
    expect(french?.dots).toBe(3);
  });

  it('should have English with 2 dots', () => {
    const english = component.languages.find(l => l.name === 'languages.english');
    expect(english?.dots).toBe(2);
  });

  it('should have Spanish with 1 dot', () => {
    const spanish = component.languages.find(l => l.name === 'languages.spanish');
    expect(spanish?.dots).toBe(1);
  });

  it('should render the credentials section', () => {
    const section = fixture.nativeElement.querySelector('#certifications');
    expect(section).toBeTruthy();
    expect(section.classList.contains('credentials-section')).toBe(true);
  });

  it('should render one cert-card per certification', () => {
    const cards = fixture.nativeElement.querySelectorAll('.cert-card');
    expect(cards.length).toBe(component.certifications.length);
  });

  it('should render one lang-item per language', () => {
    const items = fixture.nativeElement.querySelectorAll('.lang-item');
    expect(items.length).toBe(component.languages.length);
  });

  it('should render obtained badge on each certification', () => {
    const badges = fixture.nativeElement.querySelectorAll('.obtained-badge');
    expect(badges.length).toBe(component.certifications.length);
  });

  it('should render 9 dots total (3 per language)', () => {
    const dots = fixture.nativeElement.querySelectorAll('.dot');
    expect(dots.length).toBe(9);
  });

  it('should render correct filled dots per language', () => {
    const langItems = fixture.nativeElement.querySelectorAll('.lang-item');
    expect(langItems[0].querySelectorAll('.dot.filled').length).toBe(3); // FR
    expect(langItems[1].querySelectorAll('.dot.filled').length).toBe(2); // EN
    expect(langItems[2].querySelectorAll('.dot.filled').length).toBe(1); // ES
  });
});
