import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AboutComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render about section with correct structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const aboutSection = compiled.querySelector('#about');
    expect(aboutSection).toBeTruthy();
    expect(aboutSection?.classList.contains('section')).toBe(true);
    expect(aboutSection?.classList.contains('fade-in-up')).toBe(true);
  });

  it('should render values section with correct structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const valuesSection = compiled.querySelector('#values');
    expect(valuesSection).toBeTruthy();
    expect(valuesSection?.classList.contains('section')).toBe(true);
    expect(valuesSection?.classList.contains('fade-in-up')).toBe(true);
  });

  it('should display section badge with person icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const sectionBadge = compiled.querySelector('.section-badge');
    expect(sectionBadge).toBeTruthy();

    const badgeIcon = sectionBadge?.querySelector('.badge-icon');
    expect(badgeIcon?.textContent?.trim()).toBe('person');
  });

  it('should render profile section with avatar and info', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const profileSection = compiled.querySelector('.profile-section');
    expect(profileSection).toBeTruthy();

    const avatar = profileSection?.querySelector('.avatar-image') as HTMLImageElement;
    expect(avatar).toBeTruthy();
    expect(avatar?.src).toContain('assets/images/about/Avatar.png');
    expect(avatar?.alt).toBe('Aldéric Hoarau - Photo de profil');
    expect(avatar?.loading).toBe('eager');

    const profileName = profileSection?.querySelector('.profile-name');
    expect(profileName?.textContent?.trim()).toBe('Aldéric Hoarau');
  });

  it('should render about description section', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const aboutDescription = compiled.querySelector('.about-description');
    expect(aboutDescription).toBeTruthy();

    const aboutText = aboutDescription?.querySelector('.about-text');
    expect(aboutText).toBeTruthy();
  });

  it('should render all highlight items with correct structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const highlightItems = compiled.querySelectorAll('.highlight-item');
    expect(highlightItems.length).toBe(3);

    // Test first highlight item (10+ years)
    const firstHighlight = highlightItems[0];
    const firstIcon = firstHighlight.querySelector('mat-icon');
    expect(firstIcon?.textContent?.trim()).toBe('trending_up');
    const firstNumber = firstHighlight.querySelector('.highlight-number');
    expect(firstNumber?.textContent?.trim()).toBe('10+');

    // Test second highlight item (20+ projects)
    const secondHighlight = highlightItems[1];
    const secondIcon = secondHighlight.querySelector('mat-icon');
    expect(secondIcon?.textContent?.trim()).toBe('cloud_done');
    const secondNumber = secondHighlight.querySelector('.highlight-number');
    expect(secondNumber?.textContent?.trim()).toBe('20+');

    // Test third highlight item (10x cost reduction)
    const thirdHighlight = highlightItems[2];
    const thirdIcon = thirdHighlight.querySelector('mat-icon');
    expect(thirdIcon?.textContent?.trim()).toBe('savings');
    const thirdNumber = thirdHighlight.querySelector('.highlight-number');
    expect(thirdNumber?.textContent?.trim()).toBe('10x');
  });

  it('should render skills preview section', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const skillsCard = compiled.querySelector('.skills-card');
    expect(skillsCard).toBeTruthy();

    const skillsTitle = skillsCard?.querySelector('.skills-title');
    expect(skillsTitle).toBeTruthy();
  });

  it('should render all skill items with correct icons and text', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const skillItems = compiled.querySelectorAll('.skill-item');
    expect(skillItems.length).toBe(4);

    // Test Cloud & DevSecOps
    const cloudSkill = skillItems[0];
    const cloudIcon = cloudSkill.querySelector('mat-icon');
    expect(cloudIcon?.textContent?.trim()).toBe('cloud');
    const cloudText = cloudSkill.querySelector('.skill-text');
    expect(cloudText?.textContent?.trim()).toBe('Cloud & DevSecOps');

    // Test FinOps & Optimization
    const finopsSkill = skillItems[1];
    const finopsIcon = finopsSkill.querySelector('mat-icon');
    expect(finopsIcon?.textContent?.trim()).toBe('analytics');
    const finopsText = finopsSkill.querySelector('.skill-text');
    expect(finopsText?.textContent?.trim()).toBe('FinOps & Optimization');

    // Test Architecture & Security
    const archSkill = skillItems[2];
    const archIcon = archSkill.querySelector('mat-icon');
    expect(archIcon?.textContent?.trim()).toBe('security');
    const archText = archSkill.querySelector('.skill-text');
    expect(archText?.textContent?.trim()).toBe('Architecture & Security');

    // Test Agility & Coaching
    const agilitySkill = skillItems[3];
    const agilityIcon = agilitySkill.querySelector('mat-icon');
    expect(agilityIcon?.textContent?.trim()).toBe('groups');
    const agilityText = agilitySkill.querySelector('.skill-text');
    expect(agilityText?.textContent?.trim()).toBe('Agility & Coaching');
  });

  it('should render all value cards in values section', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const valueCards = compiled.querySelectorAll('.value-card');
    expect(valueCards.length).toBe(5);

    // Each value card should have an icon wrapper and content
    valueCards.forEach(card => {
      const iconWrapper = card.querySelector('.value-icon-wrapper');
      expect(iconWrapper).toBeTruthy();
      const valueIcon = iconWrapper?.querySelector('.value-icon');
      expect(valueIcon).toBeTruthy();

      const valueContent = card.querySelector('.value-content');
      expect(valueContent).toBeTruthy();
      const valueTitle = valueContent?.querySelector('.value-title');
      expect(valueTitle).toBeTruthy();
      const valueDescription = valueContent?.querySelector('.value-description');
      expect(valueDescription).toBeTruthy();
    });
  });

  it('should render value cards with correct icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const valueIcons = compiled.querySelectorAll('.value-icon');
    expect(valueIcons.length).toBe(5);

    const expectedIcons = ['favorite', 'work', 'rocket_launch', 'psychology', 'autorenew'];
    valueIcons.forEach((icon, index) => {
      expect(icon.textContent?.trim()).toBe(expectedIcons[index]);
    });
  });

  it('should render mat-cards with correct classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const modernCards = compiled.querySelectorAll('mat-card.modern-card');
    expect(modernCards.length).toBe(2); // One for profile, one for skills

    const skillsCard = compiled.querySelector('mat-card.skills-card');
    expect(skillsCard).toBeTruthy();
    expect(skillsCard?.classList.contains('modern-card')).toBe(true);
  });

  it('should have proper mat-card-content structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const matCardContents = compiled.querySelectorAll('mat-card-content');
    expect(matCardContents.length).toBe(2); // Profile card and skills card

    matCardContents.forEach(cardContent => {
      expect(cardContent).toBeTruthy();
    });
  });

  it('should render about grid with correct layout', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const aboutGrid = compiled.querySelector('.about-grid');
    expect(aboutGrid).toBeTruthy();

    const textCard = aboutGrid?.querySelector('.about-text-card');
    expect(textCard).toBeTruthy();

    const skillsPreview = aboutGrid?.querySelector('.about-skills-preview');
    expect(skillsPreview).toBeTruthy();
  });

  it('should render values horizontal grid', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const valuesGrid = compiled.querySelector('.values-horizontal-grid');
    expect(valuesGrid).toBeTruthy();

    const valueCards = valuesGrid?.querySelectorAll('.value-card');
    expect(valueCards?.length).toBe(5);
  });

  it('should render all required containers', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const containers = compiled.querySelectorAll('.container');
    expect(containers.length).toBe(2); // One for about section, one for values section

    const aboutContent = compiled.querySelector('.about-content');
    expect(aboutContent).toBeTruthy();

    const aboutHeader = compiled.querySelector('.about-header');
    expect(aboutHeader).toBeTruthy();
  });
});
