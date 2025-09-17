import { NgModule } from '@angular/core';

// Feature Components
import { AboutComponent } from './about/about.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { ProjectsComponent } from './projects/projects.component';
import { ExperienceComponent } from './experience/experience.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { SkillsComponent } from './skills/skills.component';
import { ReferencesComponent } from './references/references.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';

// Shared Module
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    // All feature components are standalone
    AboutComponent,
    TechnologiesComponent,
    ProjectsComponent,
    ExperienceComponent,
    CertificationsComponent,
    SkillsComponent,
    ReferencesComponent,
    FaqComponent,
    ContactComponent
  ],
  exports: [
    AboutComponent,
    TechnologiesComponent,
    ProjectsComponent,
    ExperienceComponent,
    CertificationsComponent,
    SkillsComponent,
    ReferencesComponent,
    FaqComponent,
    ContactComponent
  ]
})
export class FeaturesModule {}