import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ScrollAnimationService } from './core/services/scroll-animation.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule, NoopAnimationsModule],
      providers: [provideTranslateService()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Aldéric Hoarau - Portfolio' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Aldéric Hoarau - Portfolio');
  });

  it('should observe scroll-animated selectors after the view is initialized', () => {
    vi.useFakeTimers();

    const fixture = TestBed.createComponent(AppComponent);
    const scrollAnimationService = TestBed.inject(ScrollAnimationService);
    const observeSpy = vi.spyOn(scrollAnimationService, 'observeElementsBySelector');

    fixture.componentInstance.ngAfterViewInit();
    vi.advanceTimersByTime(100);

    expect(observeSpy).toHaveBeenCalledWith('.section');
    expect(observeSpy).toHaveBeenCalledWith('mat-card');
    expect(observeSpy).toHaveBeenCalledWith('.tech-badge');
    expect(observeSpy).toHaveBeenCalledWith('.project-card');

    vi.useRealTimers();
  });

  it('should destroy the scroll animation service on ngOnDestroy', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const scrollAnimationService = TestBed.inject(ScrollAnimationService);
    const destroySpy = vi.spyOn(scrollAnimationService, 'destroy');

    fixture.componentInstance.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
  });
});
