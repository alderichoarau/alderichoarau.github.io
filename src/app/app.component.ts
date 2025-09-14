import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './features/about/about.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { CertificationsComponent } from './features/certifications/certifications.component';
import { ReferencesComponent } from './features/references/references.component';
import { FaqComponent } from './features/faq/faq.component';
import { ContactComponent } from './features/contact/contact.component';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        NavigationComponent,
        HeaderComponent,
        AboutComponent,
        SkillsComponent,
        ExperienceComponent,
        CertificationsComponent,
        ReferencesComponent,
        FaqComponent,
        ContactComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Aldéric Hoarau - Portfolio';
}
