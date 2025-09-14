import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'Aldéric Hoarau - Portfolio';
}
