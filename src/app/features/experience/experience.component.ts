import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-experience',
  imports: [MatIconModule, TranslateModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  experiences = [
    {
      icon: 'laptop_mac',
      title: 'experience.freelance',
      period: 'experience.freelancePeriod',
      description: 'experience.freelanceDesc',
    },
    {
      icon: 'business',
      title: 'experience.inetum',
      period: 'experience.inetumPeriod',
      description: 'experience.inetumDesc',
    },
    {
      icon: 'code',
      title: 'experience.gfi',
      period: 'experience.gfiPeriod',
      description: 'experience.gfiDesc',
    },
    {
      icon: 'laptop_mac',
      title: 'experience.astek',
      period: 'experience.astekPeriod',
      description: 'experience.astekDesc',
    },
    {
      icon: 'groups',
      title: 'experience.agileToulouse',
      period: 'experience.agileToulousePeriod',
      description: 'experience.agileToulouseDesc',
    },
  ];
}
