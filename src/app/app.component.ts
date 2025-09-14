import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './features/about/about.component';
import { TechnologiesComponent } from './features/technologies/technologies.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { CertificationsComponent } from './features/certifications/certifications.component';
import { ReferencesComponent } from './features/references/references.component';
import { FaqComponent } from './features/faq/faq.component';
import { ContactComponent } from './features/contact/contact.component';
import { fadeInUpAnimation, staggerAnimation } from './shared/animations/animations';
import { ScrollAnimationService } from './core/services/scroll-animation.service';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        NavigationComponent,
        HeaderComponent,
        AboutComponent,
        TechnologiesComponent,
        ProjectsComponent,
        ExperienceComponent,
        CertificationsComponent,
        ReferencesComponent,
        FaqComponent,
        ContactComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    animations: [fadeInUpAnimation, staggerAnimation]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Aldéric Hoarau - Portfolio';
  
  constructor(private scrollAnimationService: ScrollAnimationService) {}
  
  ngOnInit() {
    // Component initialization
  }
  
  ngAfterViewInit() {
    // Set up scroll animations for sections
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
