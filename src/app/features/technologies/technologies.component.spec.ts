import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TechnologiesComponent } from './technologies.component';

describe('TechnologiesComponent', () => {
  let component: TechnologiesComponent;
  let fixture: ComponentFixture<TechnologiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologiesComponent, HttpClientTestingModule, NoopAnimationsModule],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the technologies section', () => {
    const section = fixture.nativeElement.querySelector('#technologies');
    expect(section).toBeTruthy();
    expect(section.classList.contains('tech-section')).toBe(true);
  });

  it('should have 6 categories (all + 5 real)', () => {
    expect(component.categories.length).toBe(6);
    expect(component.categories[0].key).toBe('all');
  });

  it('should expose technologies from dataService', () => {
    expect(component.technologies().length).toBeGreaterThan(0);
  });

  it('should return frontend technologies via getCategoryTechnologies', () => {
    const fn = component.getCategoryTechnologies();
    const frontendTechs = fn('frontend');
    expect(frontendTechs.length).toBeGreaterThan(0);
    frontendTechs.forEach(t => expect(t.category).toBe('frontend'));
  });

  it('should return cloud technologies via getCategoryTechnologies', () => {
    const fn = component.getCategoryTechnologies();
    const cloudTechs = fn('cloud');
    expect(cloudTechs.length).toBeGreaterThan(0);
    cloudTechs.forEach(t => expect(t.category).toBe('cloud'));
  });

  it('should return all technologies when key is all', () => {
    const fn = component.getCategoryTechnologies();
    const all = fn('all');
    expect(all.length).toBe(component.technologies().length);
  });

  it('should render category blocks', () => {
    const blocks = fixture.nativeElement.querySelectorAll('.category-block');
    expect(blocks.length).toBe(5); // slice(1) — sans "all"
  });

  it('should render tech pills inside blocks', () => {
    const pills = fixture.nativeElement.querySelectorAll('.tech-pill');
    expect(pills.length).toBeGreaterThan(0);
  });
});
