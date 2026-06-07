import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-references',
  imports: [MatIconModule, TranslateModule],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss',
})
export class ReferencesComponent {
  isHovered = false;

  references = [
    {
      name: 'Airbus',
      logo: 'assets/images/references/Airbus.png',
    },
    {
      name: 'Air France',
      logo: 'assets/images/references/AirFrance.png',
    },
    {
      name: 'Transavia',
      logo: 'assets/images/references/Transavia.png',
    },
    {
      name: 'KLM',
      logo: 'assets/images/references/KLM.png',
    },
    {
      name: 'INETUM',
      logo: 'assets/images/references/Inetum.png',
    },
    {
      name: 'GFI',
      logo: 'assets/images/references/GFI.png',
    },
    {
      name: 'ASTEK',
      logo: 'assets/images/references/Astek.png',
    },
    {
      name: "Ministère de l'Agriculture",
      logo: 'assets/images/references/MinistereAgriculture.png',
    },
  ];

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }
}
