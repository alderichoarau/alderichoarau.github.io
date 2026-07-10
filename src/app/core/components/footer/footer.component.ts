import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import packageInfo from '../../../../../package.json';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
})
export class FooterComponent {
  version: string = packageInfo.version;
}
