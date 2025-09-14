import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, TranslateModule],
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
