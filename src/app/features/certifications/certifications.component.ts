import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-certifications',
  imports: [MatIconModule, TranslateModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.scss',
})
export class CertificationsComponent {
  certifications = [
    { icon: 'military_tech', title: 'certifications.psm1' },
    { icon: 'cloud_queue', title: 'certifications.az900' },
    { icon: 'cloud', title: 'certifications.az204' },
    { icon: 'admin_panel_settings', title: 'certifications.az104' },
    { icon: 'analytics', title: 'certifications.pl300' },
  ];

  languages = [
    { name: 'languages.french', level: 'languages.native', dots: 3 },
    { name: 'languages.english', level: 'languages.professional', dots: 2 },
    { name: 'languages.spanish', level: 'languages.elementary', dots: 1 },
  ];
}
