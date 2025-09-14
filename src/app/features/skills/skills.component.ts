import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  skills = [
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
  ];
}
