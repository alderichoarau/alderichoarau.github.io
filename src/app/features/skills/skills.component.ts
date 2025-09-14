import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    TranslateModule
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  // Angular 18 Signals for reactive skills data
  skills = signal([
    {
      icon: 'cloud',
      title: 'skills.cloudDevSecOps',
      description: 'skills.cloudDevSecOpsDesc'
    },
    {
      icon: 'trending_up',
      title: 'skills.finOps',
      description: 'skills.finOpsDesc'
    },
    {
      icon: 'security',
      title: 'skills.architecture',
      description: 'skills.architectureDesc'
    },
    {
      icon: 'groups',
      title: 'skills.agility',
      description: 'skills.agilityDesc'
    }
  ]);
}
