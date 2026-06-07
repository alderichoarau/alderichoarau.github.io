import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, HttpClientTestingModule, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a footer element', () => {
    const footer = fixture.nativeElement.querySelector('footer');
    expect(footer).toBeTruthy();
    expect(footer.classList.contains('footer')).toBe(true);
  });

  it('should have a version property', () => {
    expect(component.version).toBeDefined();
    expect(typeof component.version).toBe('string');
  });

  it('should render the version span', () => {
    const version = fixture.nativeElement.querySelector('.version');
    expect(version).toBeTruthy();
  });

  it('should render a container inside footer', () => {
    const container = fixture.nativeElement.querySelector('.container');
    expect(container).toBeTruthy();
  });
});
