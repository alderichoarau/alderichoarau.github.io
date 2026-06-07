import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ExperienceComponent } from './experience.component';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent, HttpClientTestingModule, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 5 experience entries', () => {
    expect(component.experiences.length).toBe(5);
  });

  it('should have freelance as first entry', () => {
    expect(component.experiences[0].title).toBe('experience.freelance');
    expect(component.experiences[0].icon).toBe('laptop_mac');
  });

  it('should have agile toulouse as last entry', () => {
    const last = component.experiences[component.experiences.length - 1];
    expect(last.title).toBe('experience.agileToulouse');
    expect(last.icon).toBe('groups');
  });

  it('should have period and description for every entry', () => {
    component.experiences.forEach(exp => {
      expect(exp.period).toBeTruthy();
      expect(exp.description).toBeTruthy();
    });
  });

  it('should render the experience section', () => {
    const section = fixture.nativeElement.querySelector('#experience');
    expect(section).toBeTruthy();
    expect(section.classList.contains('experience-section')).toBe(true);
  });

  it('should render one timeline entry per experience', () => {
    const entries = fixture.nativeElement.querySelectorAll('.timeline-entry');
    expect(entries.length).toBe(component.experiences.length);
  });

  it('should mark only the last entry with .last class', () => {
    const entries = Array.from(fixture.nativeElement.querySelectorAll('.timeline-entry'));
    entries.forEach((entry: unknown, i: number) => {
      const el = entry as Element;
      if (i === entries.length - 1) {
        expect(el.classList.contains('last')).toBe(true);
      } else {
        expect(el.classList.contains('last')).toBe(false);
      }
    });
  });

  it('should render a timeline dot for each entry', () => {
    const dots = fixture.nativeElement.querySelectorAll('.timeline-dot');
    expect(dots.length).toBe(component.experiences.length);
  });
});
