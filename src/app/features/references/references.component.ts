import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-references',
  imports: [CommonModule, MatCardModule, MatIconModule, TranslateModule],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss',
})
export class ReferencesComponent {
  isHovered = false;

  references = [
    {
      name: 'Airbus',
      logo: 'assets/images/Airbus.png',
    },
    {
      name: 'Air France',
      logo: 'assets/images/AirFrance.png',
    },
    {
      name: 'Transavia',
      logo: 'assets/images/Transavia.png',
    },
    {
      name: 'KLM',
      logo: 'assets/images/KLM.png',
    },
    {
      name: 'INETUM',
      logo: 'assets/images/INETUM.png',
    },
    {
      name: 'GFI',
      logo: 'assets/images/GFI.png',
    },
    {
      name: "Ministère de l'Agriculture",
      logo: 'assets/images/Ministere.png',
    },
  ];

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }
}
