import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import {
  fadeInUpAnimation,
  fadeInLeftAnimation,
  fadeInRightAnimation,
  bounceInAnimation,
} from '../../shared/animations/animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, TranslatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [fadeInUpAnimation, fadeInLeftAnimation, fadeInRightAnimation, bounceInAnimation],
})
export class AboutComponent {}
