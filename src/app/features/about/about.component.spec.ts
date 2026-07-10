import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent, HttpClientTestingModule, NoopAnimationsModule],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the hero section with correct id', () => {
    const section = fixture.nativeElement.querySelector('#about');
    expect(section).toBeTruthy();
    expect(section.classList.contains('hero-section')).toBe(true);
  });

  it('should render the avatar image', () => {
    const avatar = fixture.nativeElement.querySelector('.hero-avatar') as HTMLImageElement;
    expect(avatar).toBeTruthy();
    expect(avatar.src).toContain('assets/images/about/Avatar.png');
    expect(avatar.getAttribute('loading')).toBe('eager');
  });

  it('should render the availability badge', () => {
    const badge = fixture.nativeElement.querySelector('.availability-badge');
    expect(badge).toBeTruthy();
    const dot = badge.querySelector('.availability-dot');
    expect(dot).toBeTruthy();
  });

  it('should render the hero name', () => {
    const name = fixture.nativeElement.querySelector('.hero-name');
    expect(name).toBeTruthy();
    expect(name.textContent.trim()).toBe('Aldéric Hoarau');
  });

  it('should render the three stats', () => {
    const stats = fixture.nativeElement.querySelectorAll('.stat');
    expect(stats.length).toBe(3);

    const numbers = fixture.nativeElement.querySelectorAll('.stat-number');
    expect(numbers[0].textContent.trim()).toBe('10+');
    expect(numbers[1].textContent.trim()).toBe('20+');
    expect(numbers[2].textContent.trim()).toBe('10x');
  });

  it('should render two CTA buttons', () => {
    const ctas = fixture.nativeElement.querySelectorAll('.hero-ctas .btn');
    expect(ctas.length).toBe(2);

    const primary = fixture.nativeElement.querySelector('.btn-primary') as HTMLAnchorElement;
    expect(primary.href).toContain('mailto:alderic.hoarau@gmail.com');

    const outline = fixture.nativeElement.querySelector('.btn-outline') as HTMLAnchorElement;
    expect(outline.href).toContain('malt.fr');
  });

  it('should render three social links', () => {
    const socials = fixture.nativeElement.querySelectorAll('.social-link');
    expect(socials.length).toBe(3);
  });

  it('should render the expertise card', () => {
    const card = fixture.nativeElement.querySelector('.hero-card');
    expect(card).toBeTruthy();
    const items = card.querySelectorAll('.expertise-item');
    expect(items.length).toBe(5);
  });

  it('should render the hero container', () => {
    const container = fixture.nativeElement.querySelector('.hero-container');
    expect(container).toBeTruthy();
  });
});
