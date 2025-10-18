import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, HttpClientTestingModule, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render contact section with correct id', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const contactSection = compiled.querySelector('#contact');
    expect(contactSection).toBeTruthy();
    expect(contactSection?.classList.contains('section')).toBe(true);
  });

  it('should render email link with correct href', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const emailLink = compiled.querySelector('a[href="mailto:alderic.hoarau@gmail.com"]');
    expect(emailLink).toBeTruthy();
    expect(emailLink?.classList.contains('cta-button')).toBe(true);
  });

  it('should render all social media links with correct attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const linkedinLink = compiled.querySelector(
      'a[href="https://www.linkedin.com/in/alderichoarau"]'
    );
    expect(linkedinLink).toBeTruthy();
    expect(linkedinLink?.getAttribute('target')).toBe('_blank');
    expect(linkedinLink?.getAttribute('rel')).toBe('noopener');

    const githubLink = compiled.querySelector('a[href="https://github.com/alderichoarau"]');
    expect(githubLink).toBeTruthy();
    expect(githubLink?.getAttribute('target')).toBe('_blank');

    const maltLink = compiled.querySelector('a[href="https://www.malt.fr/profile/alderichoarau"]');
    expect(maltLink).toBeTruthy();
    expect(maltLink?.getAttribute('target')).toBe('_blank');

    const collectiveLink = compiled.querySelector(
      'a[href="https://www.collective.work/profile/alderic-hoarau"]'
    );
    expect(collectiveLink).toBeTruthy();
    expect(collectiveLink?.getAttribute('target')).toBe('_blank');
  });

  it('should render all required mat-icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const matIcons = compiled.querySelectorAll('mat-icon');

    expect(matIcons.length).toBeGreaterThanOrEqual(6); // contact_mail, send, person, code, work, business

    const iconTexts = Array.from(matIcons).map(icon => icon.textContent?.trim());
    expect(iconTexts).toContain('contact_mail');
    expect(iconTexts).toContain('send');
    expect(iconTexts).toContain('person');
    expect(iconTexts).toContain('code');
    expect(iconTexts).toContain('work');
    expect(iconTexts).toContain('business');
  });

  it('should render mat-card with contact methods', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const matCard = compiled.querySelector('mat-card');
    expect(matCard).toBeTruthy();
    expect(matCard?.classList.contains('contact-card')).toBe(true);

    const cardContent = matCard?.querySelector('mat-card-content');
    expect(cardContent).toBeTruthy();
  });

  it('should render contact buttons with correct CSS classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const linkedinBtn = compiled.querySelector('.linkedin-btn');
    expect(linkedinBtn).toBeTruthy();
    expect(linkedinBtn?.classList.contains('contact-btn')).toBe(true);

    const githubBtn = compiled.querySelector('.github-btn');
    expect(githubBtn).toBeTruthy();
    expect(githubBtn?.classList.contains('contact-btn')).toBe(true);

    const maltBtn = compiled.querySelector('.malt-btn');
    expect(maltBtn).toBeTruthy();
    expect(maltBtn?.classList.contains('contact-btn')).toBe(true);

    const collectiveBtn = compiled.querySelector('.collective-btn');
    expect(collectiveBtn).toBeTruthy();
    expect(collectiveBtn?.classList.contains('contact-btn')).toBe(true);
  });
});
