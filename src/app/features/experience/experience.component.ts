import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  experiences = [
    {
      icon: 'laptop_mac',
      title: 'experience.freelance',
      period: 'experience.freelancePeriod',
      description: 'experience.freelanceDesc'
    },
    {
      icon: 'business',
      title: 'experience.inetum',
      period: 'experience.inetumPeriod',
      description: 'experience.inetumDesc'
    },
    {
      icon: 'code',
      title: 'experience.gfi',
      period: 'experience.gfiPeriod',
      description: 'experience.gfiDesc'
    }
  ];
}
