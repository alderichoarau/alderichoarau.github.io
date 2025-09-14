import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [SharedModule],
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
