import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-references',
    imports: [CommonModule, MatCardModule, MatIconModule, TranslateModule],
    templateUrl: './references.component.html',
    styleUrl: './references.component.scss'
})
export class ReferencesComponent {
  isHovered = false;

  references = [
    {
      name: 'Airbus',
      logo: 'assets/Airbus.png'
    },
    {
      name: 'Air France',
      logo: 'assets/AirFrance.jpg'
    },
    {
      name: 'Transavia',
      logo: 'assets/Transavia.svg'
    },
    {
      name: 'KLM',
      logo: 'assets/KLM.png'
    },
    {
      name: 'INETUM',
      logo: 'assets/INETUM.png'
    },
    {
      name: 'GFI',
      logo: 'assets/GFI.jpg'
    },
    {
      name: 'Ministère de l\'Agriculture',
      logo: 'assets/Ministere.png'
    }
  ];

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }
}
