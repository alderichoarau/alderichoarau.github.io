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

  // Logos are pre-resized to ~3x their max on-screen box (see .reference-logo
  // CSS: max-width 110px / max-height 46px) and shipped as WebP; width/height
  // are each file's real intrinsic dimensions, required by NgOptimizedImage
  // to reserve layout space and avoid CLS.
  references = [
    {
      name: 'Airbus',
      logo: 'assets/images/references/Airbus.webp',
      width: 330,
      height: 163,
    },
    {
      name: 'Air France',
      logo: 'assets/images/references/AirFrance.webp',
      width: 330,
      height: 31,
    },
    {
      name: 'Transavia',
      logo: 'assets/images/references/Transavia.webp',
      width: 330,
      height: 64,
    },
    {
      name: 'KLM',
      logo: 'assets/images/references/KLM.webp',
      width: 330,
      height: 192,
    },
    {
      name: 'INETUM',
      logo: 'assets/images/references/Inetum.webp',
      width: 330,
      height: 95,
    },
    {
      name: 'GFI',
      logo: 'assets/images/references/GFI.webp',
      width: 330,
      height: 238,
    },
    {
      name: 'ASTEK',
      logo: 'assets/images/references/Astek.webp',
      width: 330,
      height: 250,
    },
    {
      name: "Ministère de l'Agriculture",
      logo: 'assets/images/references/MinistereAgriculture.webp',
      width: 330,
      height: 209,
    },
  ];

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }
}
