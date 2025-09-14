import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { fadeInUpAnimation, fadeInLeftAnimation, fadeInRightAnimation, bounceInAnimation } from '../../shared/animations/animations';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        TranslateModule
    ],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss',
    animations: [fadeInUpAnimation, fadeInLeftAnimation, fadeInRightAnimation, bounceInAnimation]
})
export class AboutComponent {

}
