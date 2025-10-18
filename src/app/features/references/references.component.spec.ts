import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ReferencesComponent } from './references.component';

describe('ReferencesComponent', () => {
  let component: ReferencesComponent;
  let fixture: ComponentFixture<ReferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferencesComponent, HttpClientTestingModule, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isHovered to false', () => {
    expect(component.isHovered).toBe(false);
  });

  it('should have 8 references', () => {
    expect(component.references.length).toBe(8);
  });

  it('should contain expected reference names', () => {
    const referenceNames = component.references.map(ref => ref.name);
    expect(referenceNames).toContain('Airbus');
    expect(referenceNames).toContain('Air France');
    expect(referenceNames).toContain('KLM');
    expect(referenceNames).toContain('INETUM');
  });

  describe('Mouse interactions', () => {
    it('should set isHovered to true when onMouseEnter is called', () => {
      component.isHovered = false;
      component.onMouseEnter();
      expect(component.isHovered).toBe(true);
    });

    it('should set isHovered to false when onMouseLeave is called', () => {
      component.isHovered = true;
      component.onMouseLeave();
      expect(component.isHovered).toBe(false);
    });

    it('should toggle isHovered correctly with multiple calls', () => {
      expect(component.isHovered).toBe(false);

      component.onMouseEnter();
      expect(component.isHovered).toBe(true);

      component.onMouseLeave();
      expect(component.isHovered).toBe(false);

      component.onMouseEnter();
      expect(component.isHovered).toBe(true);
    });
  });
});
