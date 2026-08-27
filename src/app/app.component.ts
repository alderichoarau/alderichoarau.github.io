import {
  Component,
  AfterViewInit,
  OnDestroy,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NavigationComponent } from './core/components/navigation/navigation.component';
import { AboutComponent } from './features/about/about.component';
import { TechnologiesComponent } from './features/technologies/technologies.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { CertificationsComponent } from './features/certifications/certifications.component';
import { ReferencesComponent } from './features/references/references.component';
import { FaqComponent } from './features/faq/faq.component';
import { ContactComponent } from './features/contact/contact.component';
import { ScrollAnimationService } from './core/services/scroll-animation.service';
import { FooterComponent } from './core/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    NavigationComponent,
    AboutComponent,
    TechnologiesComponent,
    ExperienceComponent,
    CertificationsComponent,
    ReferencesComponent,
    FaqComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'Aldéric Hoarau - Portfolio';

  private readonly scrollAnimationService = inject(ScrollAnimationService);

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollAnimationService.observeElementsBySelector('.section');
      this.scrollAnimationService.observeElementsBySelector('mat-card');
      this.scrollAnimationService.observeElementsBySelector('.tech-badge');
      this.scrollAnimationService.observeElementsBySelector('.project-card');
    }, 100);
  }

  ngOnDestroy() {
    this.scrollAnimationService.destroy();
  }
}
