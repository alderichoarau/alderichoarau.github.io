import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-references',
  imports: [MatIconModule, TranslatePipe, NgOptimizedImage],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferencesComponent {
  isHovered = false;

  // width/height are the logo files' real intrinsic dimensions (required by
  // NgOptimizedImage to reserve layout space and avoid CLS); actual on-screen
  // size stays governed by the `.reference-logo` CSS (max-width/max-height).
  references = [
    {
      name: 'Airbus',
      logo: 'assets/images/references/Airbus.png',
      width: 375,
      height: 185,
    },
    {
      name: 'Air France',
      logo: 'assets/images/references/AirFrance.png',
      width: 2560,
      height: 244,
    },
    {
      name: 'Transavia',
      logo: 'assets/images/references/Transavia.png',
      width: 2560,
      height: 501,
    },
    {
      name: 'KLM',
      logo: 'assets/images/references/KLM.png',
      width: 800,
      height: 466,
    },
    {
      name: 'INETUM',
      logo: 'assets/images/references/Inetum.png',
      width: 1024,
      height: 297,
    },
    {
      name: 'GFI',
      logo: 'assets/images/references/GFI.png',
      width: 800,
      height: 577,
    },
    {
      name: 'ASTEK',
      logo: 'assets/images/references/Astek.png',
      width: 1018,
      height: 771,
    },
    {
      name: "Ministère de l'Agriculture",
      logo: 'assets/images/references/MinistereAgriculture.png',
      width: 800,
      height: 507,
    },
  ];

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }
}
