import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.scss'
})
export class CertificationsComponent {
  certifications = [
    {
      icon: 'military_tech',
      title: 'certifications.psm1'
    },
    {
      icon: 'cloud',
      title: 'certifications.az204'
    },
    {
      icon: 'admin_panel_settings',
      title: 'certifications.az104',
      status: 'certifications.planned'
    },
    {
      icon: 'analytics',
      title: 'certifications.pl300',
      status: 'certifications.planned'
    }
  ];

  languages = [
    {
      name: 'languages.french',
      level: 'languages.native'
    },
    {
      name: 'languages.english',
      level: 'languages.professional'
    },
    {
      name: 'languages.spanish',
      level: 'languages.elementary'
    }
  ];
}
